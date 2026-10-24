/* TestStep Academy - API for the mock interview.

   A Cloudflare Worker that sits between the site and Anthropic, so visitors never need
   an API key of their own. It
   - signs people in with Google (it checks the Google ID token the page sends),
   - lets in only the emails on the ALLOWED_EMAILS list,
   - passes rating requests to Anthropic with the site's key, which is a Worker secret,
   - limits each person to a number of interviews a day and of requests per interview,
   - answers only the site's own addresses (ALLOWED_ORIGINS).

   Routes
     POST /api/session    { credential }  -> { token, user, usage }   sign in
     GET  /api/me         Bearer token    -> { user, usage }
     POST /api/messages   Bearer token, X-Interview-Id, Messages API body -> Anthropic's reply

   Bindings (see wrangler.toml and the README)
     secrets: ANTHROPIC_API_KEY, SESSION_SECRET, ALLOWED_EMAILS
     vars:    GOOGLE_CLIENT_ID, ALLOWED_ORIGINS, ALLOWED_MODELS, DAILY_INTERVIEWS,
              CALLS_PER_INTERVIEW, MAX_TOKENS, TIME_ZONE
     KV:      USAGE */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];
const SESSION_DAYS = 7;
const MAX_BODY_BYTES = 64 * 1024;
const INTERVIEW_ID = /^[A-Za-z0-9-]{8,64}$/;

const enc = new TextEncoder();
let googleKeys = { keys: null, until: 0 };

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = list(env.ALLOWED_ORIGINS);
    const cors = allowed.includes(origin) ? corsHeaders(origin) : null;

    if (request.method === 'OPTIONS') {
      return cors ? new Response(null, { status: 204, headers: cors }) : new Response(null, { status: 403 });
    }
    if (!cors) return json({ error: 'origin_not_allowed', message: 'This address may not use the API.' }, 403);

    try {
      const res = await route(request, env, new URL(request.url).pathname);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    } catch (err) {
      const res = err instanceof HttpError
        ? json({ error: err.code, message: err.message, ...err.extra }, err.status)
        : json({ error: 'server_error', message: 'Something went wrong on the server.' }, 500);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    }
  }
};

async function route(request, env, path) {
  if (path === '/api/session' && request.method === 'POST') return signIn(request, env);
  if (path === '/api/me' && request.method === 'GET') {
    const user = await requireUser(request, env);
    return json({ user: publicUser(user), usage: await usageFor(env, user.email) });
  }
  if (path === '/api/messages' && request.method === 'POST') return messages(request, env);
  throw new HttpError(404, 'not_found', 'No such route.');
}

/* ---------- signing in ---------- */

async function signIn(request, env) {
  const body = await readJson(request);
  const credential = body && typeof body.credential === 'string' ? body.credential : '';
  if (!credential) throw new HttpError(400, 'bad_request', 'The Google sign-in was missing.');

  const claims = await verifyGoogleToken(credential, env);
  const email = String(claims.email || '').toLowerCase();
  if (!isAllowed(env, email)) {
    throw new HttpError(403, 'not_allowed', 'This account is not on the list yet.', { email });
  }
  const user = { email, name: String(claims.name || email).slice(0, 80) };
  const token = await signSession(user, env);
  return json({ token, user: publicUser(user), usage: await usageFor(env, email) });
}

async function verifyGoogleToken(token, env) {
  if (!env.GOOGLE_CLIENT_ID) throw new HttpError(500, 'not_configured', 'Google sign-in is not set up on the server.');
  const parts = token.split('.');
  if (parts.length !== 3) throw badSignIn();

  let header, claims;
  try {
    header = JSON.parse(b64urlText(parts[0]));
    claims = JSON.parse(b64urlText(parts[1]));
  } catch (_) {
    throw badSignIn();
  }
  if (header.alg !== 'RS256' || !header.kid) throw badSignIn();

  const jwk = (await googleCerts()).find((k) => k.kid === header.kid);
  if (!jwk) throw badSignIn();
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlBytes(parts[2]), enc.encode(parts[0] + '.' + parts[1]));
  if (!ok) throw badSignIn();

  const now = Math.floor(Date.now() / 1000);
  if (!GOOGLE_ISSUERS.includes(claims.iss)) throw badSignIn();
  if (claims.aud !== env.GOOGLE_CLIENT_ID) throw badSignIn();
  if (typeof claims.exp !== 'number' || claims.exp < now - 60) throw badSignIn('The Google sign-in has expired. Sign in again.');
  if (claims.email_verified !== true || !claims.email) throw badSignIn('This Google account has no verified email.');
  return claims;
}

async function googleCerts() {
  if (googleKeys.keys && Date.now() < googleKeys.until) return googleKeys.keys;
  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) throw new HttpError(502, 'google_unavailable', 'Could not reach Google to check the sign-in.');
  const body = await res.json();
  const maxAge = Number((res.headers.get('cache-control') || '').match(/max-age=(\d+)/)?.[1]) || 3600;
  googleKeys = { keys: Array.isArray(body.keys) ? body.keys : [], until: Date.now() + maxAge * 1000 };
  return googleKeys.keys;
}

function badSignIn(message) {
  return new HttpError(401, 'bad_sign_in', message || 'The Google sign-in could not be checked. Sign in again.');
}

/* ---------- sessions: a small signed token, so Google is checked only at sign-in ---------- */

async function signSession(user, env) {
  const payload = b64urlFromText(JSON.stringify({ e: user.email, n: user.name, x: Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400 }));
  return payload + '.' + (await hmac(payload, env));
}

async function requireUser(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  const [payload, sig] = token.split('.');
  if (!payload || !sig || !timingSafeEqual(sig, await hmac(payload, env))) {
    throw new HttpError(401, 'signed_out', 'Please sign in again.');
  }
  let data;
  try {
    data = JSON.parse(b64urlText(payload));
  } catch (_) {
    throw new HttpError(401, 'signed_out', 'Please sign in again.');
  }
  if (typeof data.x !== 'number' || data.x < Date.now() / 1000) throw new HttpError(401, 'signed_out', 'Your sign-in has expired. Sign in again.');
  // checked on every request, so removing an email from the list locks it out at once
  if (!isAllowed(env, data.e)) throw new HttpError(403, 'not_allowed', 'This account is not on the list yet.', { email: data.e });
  return { email: data.e, name: data.n };
}

async function hmac(text, env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    throw new HttpError(500, 'not_configured', 'The server is missing its session secret.');
  }
  const key = await crypto.subtle.importKey('raw', enc.encode(env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64urlFromBytes(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(text))));
}

function isAllowed(env, email) {
  return !!email && list(env.ALLOWED_EMAILS).map((e) => e.toLowerCase()).includes(String(email).toLowerCase());
}

function publicUser(user) {
  return { email: user.email, name: user.name };
}

/* ---------- rating requests ---------- */

async function messages(request, env) {
  const user = await requireUser(request, env);
  if (!env.ANTHROPIC_API_KEY) throw new HttpError(500, 'not_configured', 'The server has no Anthropic key yet.');

  const interviewId = request.headers.get('X-Interview-Id') || '';
  if (!INTERVIEW_ID.test(interviewId)) throw new HttpError(400, 'bad_request', 'The interview id is missing.');

  const body = cleanBody(await readJson(request), env);
  const usage = await countCall(env, user.email, interviewId);

  let res;
  try {
    res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
  } catch (_) {
    await refundCall(env, user.email, interviewId);
    throw new HttpError(502, 'upstream_unreachable', 'Could not reach Anthropic. Try again in a moment.');
  }

  const text = await res.text();
  if (!res.ok) {
    await refundCall(env, user.email, interviewId);
    // a problem with the site's own key is the owner's to fix, not the visitor's
    if (res.status === 401 || res.status === 403) throw new HttpError(502, 'server_key', 'The server could not use its Anthropic key.');
    if (res.status === 400 && /credit/i.test(text)) throw new HttpError(502, 'server_credit', 'The server is out of Anthropic credit.');
  }
  return new Response(text, {
    status: res.status,
    headers: { 'content-type': 'application/json', 'X-Interviews-Left': String(usage.interviewsLeft) }
  });
}

// Passes on only the fields the mock interview uses, within limits, so the key
// can't be used for anything else.
function cleanBody(body, env) {
  if (!body || typeof body !== 'object') throw new HttpError(400, 'bad_request', 'The request was not valid JSON.');
  const models = list(env.ALLOWED_MODELS);
  if (!models.includes(body.model)) throw new HttpError(400, 'model_not_allowed', 'That model is not available.', { models });

  const cap = Number(env.MAX_TOKENS) || 2000;
  const maxTokens = Number(body.max_tokens);
  if (!Number.isInteger(maxTokens) || maxTokens < 1 || maxTokens > cap) throw new HttpError(400, 'bad_request', 'max_tokens must be between 1 and ' + cap + '.');

  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 4) throw new HttpError(400, 'bad_request', 'Send between 1 and 4 messages.');
  const out = { model: body.model, max_tokens: maxTokens, messages: body.messages };

  if (body.system !== undefined) {
    if (typeof body.system !== 'string') throw new HttpError(400, 'bad_request', 'system must be text.');
    out.system = body.system;
  }
  if (body.tools !== undefined) {
    // only the page's own tools; server tools such as web search cost extra
    const ok = Array.isArray(body.tools) && body.tools.length <= 2 && body.tools.every((t) =>
      t && typeof t.name === 'string' && t.input_schema && typeof t.input_schema === 'object' && (t.type === undefined || t.type === 'custom'));
    if (!ok) throw new HttpError(400, 'bad_request', 'Only the interview tools may be used.');
    out.tools = body.tools;
    if (body.tool_choice !== undefined) out.tool_choice = body.tool_choice;
  }
  return out;
}

/* ---------- daily limits, kept in KV per person and day ---------- */

function limits(env) {
  return {
    daily: Number(env.DAILY_INTERVIEWS) || 5,
    perInterview: Number(env.CALLS_PER_INTERVIEW) || 15
  };
}

function today(env) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: env.TIME_ZONE || 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function usageKey(env, email) {
  return 'u:' + email + ':' + today(env);
}

async function readUsage(env, email) {
  const raw = env.USAGE ? await env.USAGE.get(usageKey(env, email)) : null;
  try {
    const data = raw ? JSON.parse(raw) : null;
    return data && typeof data.ivs === 'object' ? data : { ivs: {} };
  } catch (_) {
    return { ivs: {} };
  }
}

async function writeUsage(env, email, data) {
  if (env.USAGE) await env.USAGE.put(usageKey(env, email), JSON.stringify(data), { expirationTtl: 3 * 86400 });
}

async function usageFor(env, email) {
  const { daily, perInterview } = limits(env);
  const used = Object.keys((await readUsage(env, email)).ivs).length;
  return { interviewsLimit: daily, interviewsLeft: Math.max(0, daily - used), callsPerInterview: perInterview };
}

async function countCall(env, email, id) {
  const { daily, perInterview } = limits(env);
  const data = await readUsage(env, email);
  const started = Object.keys(data.ivs).length;
  if (!(id in data.ivs)) {
    if (started >= daily) {
      throw new HttpError(429, 'daily_limit', 'You have used all ' + daily + ' interviews for today. Come back tomorrow.', { interviewsLeft: 0 });
    }
    data.ivs[id] = 0;
  }
  if (data.ivs[id] >= perInterview) {
    throw new HttpError(429, 'interview_limit', 'This interview has reached its limit of rated answers.');
  }
  data.ivs[id] += 1;
  await writeUsage(env, email, data);
  return { interviewsLeft: Math.max(0, daily - Object.keys(data.ivs).length) };
}

// A failed request is not counted. An interview that never got one answer through
// does not use up one of the day's interviews either.
async function refundCall(env, email, id) {
  const data = await readUsage(env, email);
  if (!(id in data.ivs)) return;
  data.ivs[id] -= 1;
  if (data.ivs[id] <= 0) delete data.ivs[id];
  await writeUsage(env, email, data);
}

/* ---------- small helpers ---------- */

class HttpError extends Error {
  constructor(status, code, message, extra) {
    super(message);
    this.status = status;
    this.code = code;
    this.extra = extra || {};
  }
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Interview-Id',
    'Access-Control-Expose-Headers': 'X-Interviews-Left',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
}

function json(data, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: { 'content-type': 'application/json' } });
}

async function readJson(request) {
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BODY_BYTES) throw new HttpError(413, 'too_large', 'The request is too large.');
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new HttpError(413, 'too_large', 'The request is too large.');
  try {
    return JSON.parse(text);
  } catch (_) {
    throw new HttpError(400, 'bad_request', 'The request was not valid JSON.');
  }
}

function list(value) {
  return String(value || '').split(',').map((s) => s.trim()).filter(Boolean);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function b64urlBytes(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function b64urlText(s) {
  return new TextDecoder().decode(b64urlBytes(s));
}

function b64urlFromBytes(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlFromText(text) {
  return b64urlFromBytes(enc.encode(text));
}

// for the tests only
export const _test = { resetGoogleKeys: () => { googleKeys = { keys: null, until: 0 }; } };
