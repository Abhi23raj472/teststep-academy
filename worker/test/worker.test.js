// Tests for the mock interview API. Google and Anthropic are faked, so the tests need
// no keys and no internet, and nothing is billed. Run with `npm test` in worker/.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { _test } from '../src/index.js';

const SITE = 'https://abhi23raj472.github.io';
const CLIENT_ID = 'test-client.apps.googleusercontent.com';
const ME = 'me@example.com';

const enc = new TextEncoder();
const b64 = (bytes) => Buffer.from(bytes).toString('base64url');

// a key pair that plays Google's part
const pair = await crypto.subtle.generateKey(
  { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
  true, ['sign', 'verify']);
const jwk = { ...(await crypto.subtle.exportKey('jwk', pair.publicKey)), kid: 'k1', alg: 'RS256', use: 'sig' };

async function googleToken(claims = {}, key = pair.privateKey) {
  const head = b64(enc.encode(JSON.stringify({ alg: 'RS256', kid: 'k1', typ: 'JWT' })));
  const body = b64(enc.encode(JSON.stringify({
    iss: 'https://accounts.google.com', aud: CLIENT_ID, email: ME, email_verified: true,
    name: 'Abhishek', exp: Math.floor(Date.now() / 1000) + 600, ...claims
  })));
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, enc.encode(head + '.' + body)));
  return head + '.' + body + '.' + b64(sig);
}

function kv() {
  const m = new Map();
  return { get: async (k) => m.get(k) ?? null, put: async (k, v) => { m.set(k, v); }, map: m };
}

let env, upstream;
beforeEach(() => {
  _test.resetGoogleKeys();
  env = {
    GOOGLE_CLIENT_ID: CLIENT_ID,
    ALLOWED_ORIGINS: SITE,
    ALLOWED_EMAILS: 'Me@Example.com, friend@example.com',
    ALLOWED_MODELS: 'claude-sonnet-5-5,claude-haiku-5-5',
    DAILY_INTERVIEWS: '2',
    CALLS_PER_INTERVIEW: '3',
    ANTHROPIC_API_KEY: 'sk-ant-test',
    SESSION_SECRET: 'x'.repeat(40),
    USAGE: kv()
  };
  upstream = { calls: [], status: 200, body: { content: [{ type: 'text', text: 'ok' }] } };
  globalThis.fetch = async (url, init) => {
    if (url === 'https://www.googleapis.com/oauth2/v3/certs') return Response.json({ keys: [jwk] });
    if (url === 'https://api.anthropic.com/v1/messages') {
      upstream.calls.push({ headers: init.headers, body: JSON.parse(init.body) });
      return new Response(JSON.stringify(upstream.body), { status: upstream.status });
    }
    throw new Error('unexpected fetch ' + url);
  };
});

function call(path, { method = 'GET', body, token, interview, origin = SITE } = {}) {
  const headers = { Origin: origin };
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (token) headers.Authorization = 'Bearer ' + token;
  if (interview) headers['X-Interview-Id'] = interview;
  return worker.fetch(new Request('https://api.test' + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }), env);
}

async function signIn(claims) {
  const res = await call('/api/session', { method: 'POST', body: { credential: await googleToken(claims) } });
  return { res, data: await res.json() };
}

const rateBody = { model: 'claude-sonnet-5-5', max_tokens: 500, system: 'Rate it.', messages: [{ role: 'user', content: 'Answer' }] };

test('signs in an allowed Google account and returns usage', async () => {
  const { res, data } = await signIn();
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('access-control-allow-origin'), SITE);
  assert.equal(data.user.email, ME);
  assert.deepEqual(data.usage, { interviewsLimit: 2, interviewsLeft: 2, callsPerInterview: 3 });
  const me = await call('/api/me', { token: data.token });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).user.name, 'Abhishek');
});

test('refuses an account that is not on the list', async () => {
  const { res, data } = await signIn({ email: 'stranger@example.com' });
  assert.equal(res.status, 403);
  assert.equal(data.error, 'not_allowed');
  assert.equal(data.email, 'stranger@example.com');
});

test('refuses forged, expired, unverified and wrong-audience Google tokens', async () => {
  const other = await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign']);
  const cases = [
    await googleToken({}, other.privateKey),
    await googleToken({ exp: Math.floor(Date.now() / 1000) - 3600 }),
    await googleToken({ email_verified: false }),
    await googleToken({ aud: 'someone-else' }),
    await googleToken({ iss: 'https://evil.example' }),
    'not.a.token'
  ];
  for (const credential of cases) {
    const res = await call('/api/session', { method: 'POST', body: { credential } });
    assert.equal(res.status, 401, credential.slice(0, 20));
  }
});

test('refuses other websites, including their preflight', async () => {
  const res = await call('/api/me', { origin: 'https://evil.example' });
  assert.equal(res.status, 403);
  const pre = await worker.fetch(new Request('https://api.test/api/messages', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } }), env);
  assert.equal(pre.status, 403);
  const ok = await worker.fetch(new Request('https://api.test/api/messages', { method: 'OPTIONS', headers: { Origin: SITE } }), env);
  assert.equal(ok.status, 204);
  assert.match(ok.headers.get('access-control-allow-headers'), /X-Interview-Id/);
});

test('needs a valid session token, and a removed email loses access at once', async () => {
  assert.equal((await call('/api/me')).status, 401);
  const { data } = await signIn();
  const tampered = data.token.slice(0, -2) + (data.token.endsWith('A') ? 'BB' : 'AA');
  assert.equal((await call('/api/me', { token: tampered })).status, 401);
  env.ALLOWED_EMAILS = 'friend@example.com';
  assert.equal((await call('/api/me', { token: data.token })).status, 403);
});

test('passes a rating request to Anthropic with the server key', async () => {
  const { data } = await signIn();
  const res = await call('/api/messages', { method: 'POST', token: data.token, interview: 'iv-00000001', body: { ...rateBody, metadata: { x: 1 } } });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-interviews-left'), '1');
  assert.equal(upstream.calls.length, 1);
  assert.equal(upstream.calls[0].headers['x-api-key'], 'sk-ant-test');
  assert.deepEqual(Object.keys(upstream.calls[0].body).sort(), ['max_tokens', 'messages', 'model', 'system']);
});

test('blocks other models, big requests and server tools', async () => {
  const { data } = await signIn();
  const send = (body) => call('/api/messages', { method: 'POST', token: data.token, interview: 'iv-00000001', body });
  assert.equal((await send({ ...rateBody, model: 'claude-opus-5-5' })).status, 400);
  assert.equal((await send({ ...rateBody, max_tokens: 50000 })).status, 400);
  assert.equal((await send({ ...rateBody, tools: [{ type: 'web_search_20250305', name: 'web_search' }] })).status, 400);
  assert.equal((await send({ ...rateBody, messages: [] })).status, 400);
  const tool = { name: 'rate_answer', description: 'd', input_schema: { type: 'object', properties: {} } };
  assert.equal((await send({ ...rateBody, tools: [tool], tool_choice: { type: 'tool', name: 'rate_answer' } })).status, 200);
  assert.equal(upstream.calls.length, 1);
});

test('limits interviews per day and requests per interview', async () => {
  const { data } = await signIn();
  const send = (iv) => call('/api/messages', { method: 'POST', token: data.token, interview: iv, body: rateBody });
  for (let i = 0; i < 3; i++) assert.equal((await send('iv-aaaaaaaa')).status, 200);
  const fourth = await send('iv-aaaaaaaa');
  assert.equal(fourth.status, 429);
  assert.equal((await fourth.json()).error, 'interview_limit');
  assert.equal((await send('iv-bbbbbbbb')).status, 200);
  const third = await send('iv-cccccccc');
  assert.equal(third.status, 429);
  assert.equal((await third.json()).error, 'daily_limit');
  const me = await (await call('/api/me', { token: data.token })).json();
  assert.equal(me.usage.interviewsLeft, 0);
});

test('a failed Anthropic request is not counted, and key problems stay on the server', async () => {
  const { data } = await signIn();
  upstream.status = 401;
  upstream.body = { type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } };
  const res = await call('/api/messages', { method: 'POST', token: data.token, interview: 'iv-aaaaaaaa', body: rateBody });
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.equal(body.error, 'server_key');
  assert.doesNotMatch(JSON.stringify(body), /x-api-key/);
  const me = await (await call('/api/me', { token: data.token })).json();
  assert.equal(me.usage.interviewsLeft, 2);
});

test('needs an interview id on rating requests', async () => {
  const { data } = await signIn();
  const res = await call('/api/messages', { method: 'POST', token: data.token, body: rateBody });
  assert.equal(res.status, 400);
});
