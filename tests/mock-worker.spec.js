// The page and the real Worker code (worker/src/index.js) together: the browser's
// requests to the Worker are handed to the Worker in this test process, so sign-in,
// CORS, limits and rating run as they will on Cloudflare. Only Google and Anthropic
// are faked, so no key and no internet are needed and nothing is billed.
const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');
const { watchErrors } = require('./helpers');

const WORKER = 'https://teststep-api.test.workers.dev';
const SITE = 'http://127.0.0.1:4173';
const CLIENT_ID = 'test-client.apps.googleusercontent.com';

const RATING = {
  score: 7,
  headline: 'Clear and correct.',
  criteria: {
    facts: { score: 7, note: 'Right.' }, approach: { score: 7, note: 'Sound.' },
    structure: { score: 7, note: 'Clear.' }, terms: { score: 7, note: 'Good.' },
  },
  did_well: ['Clear.'], improve: ['Add an example.'], stronger_answer: 'A stronger answer.',
  syntax: [], follow_up: '', lesson_id: '',
};

test('the page signs in and gets answers rated through the real Worker', async ({ page }) => {
  const errors = await watchErrors(page);
  const { default: worker, _test } = await import(pathToFileURL(path.join(__dirname, '../worker/src/index.js')).href);
  _test.resetGoogleKeys();

  // Google's signing key, and an ID token signed with it
  const enc = new TextEncoder();
  const b64 = (bytes) => Buffer.from(bytes).toString('base64url');
  const pair = await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
  const jwk = { ...(await crypto.subtle.exportKey('jwk', pair.publicKey)), kid: 'k1', alg: 'RS256' };
  const head = b64(enc.encode(JSON.stringify({ alg: 'RS256', kid: 'k1' })));
  const claims = b64(enc.encode(JSON.stringify({
    iss: 'https://accounts.google.com', aud: CLIENT_ID, email: 'me@example.com', email_verified: true,
    name: 'Abhishek Kumar', exp: Math.floor(Date.now() / 1000) + 600,
  })));
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', pair.privateKey, enc.encode(head + '.' + claims)));
  const idToken = head + '.' + claims + '.' + b64(sig);

  // what the Worker itself fetches: Google's keys and Anthropic
  const anthropic = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (url === 'https://www.googleapis.com/oauth2/v3/certs') return Response.json({ keys: [jwk] });
    if (url === 'https://api.anthropic.com/v1/messages') {
      const body = JSON.parse(init.body);
      anthropic.push({ key: init.headers['x-api-key'], body });
      const name = body.tools[0].name;
      const input = name === 'rate_answer' ? RATING
        : { headline: 'Good', summary: 'Good.', strengths: ['Clear.'], work_on: ['Examples.'] };
      return Response.json({ content: [{ type: 'tool_use', id: 't', name, input }] });
    }
    return realFetch(url, init);
  };

  const store = new Map();
  const env = {
    GOOGLE_CLIENT_ID: CLIENT_ID,
    ALLOWED_ORIGINS: SITE,
    ALLOWED_EMAILS: 'me@example.com',
    ALLOWED_MODELS: 'claude-sonnet-5-5,claude-haiku-5-5',
    DAILY_INTERVIEWS: '5',
    CALLS_PER_INTERVIEW: '15',
    ANTHROPIC_API_KEY: 'sk-ant-server-key',
    SESSION_SECRET: 's'.repeat(48),
    USAGE: { get: async (k) => store.get(k) ?? null, put: async (k, v) => { store.set(k, v); } },
  };

  try {
    // the browser's requests to the Worker go to the Worker code here
    await page.route(WORKER + '/**', async (route) => {
      const req = route.request();
      const headers = await req.allHeaders();
      const res = await worker.fetch(new Request(req.url(), {
        method: req.method(), headers, body: ['GET', 'OPTIONS'].includes(req.method()) ? undefined : req.postData(),
      }), env);
      await route.fulfill({ status: res.status, headers: Object.fromEntries(res.headers), body: Buffer.from(await res.arrayBuffer()) });
    });
    await page.route('https://accounts.google.com/gsi/client', (route) => route.fulfill({
      contentType: 'text/javascript',
      body: `window.google = { accounts: { id: {
        initialize: function (o) { window.__gsi = o; },
        renderButton: function (el) { var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Sign in with Google';
          b.onclick = function () { window.__gsi.callback({ credential: ${JSON.stringify(idToken)} }); }; el.appendChild(b); },
        disableAutoSelect: function () {} } } };`,
    }));
    await page.addInitScript((cfg) => { window.TSA_CONFIG = cfg; }, { apiBase: WORKER, googleClientId: CLIENT_ID });

    await page.goto('/index.html#/mock');
    await page.locator('#mockGoogleButton button').click();
    await expect(page.locator('#mockAcctEmail')).toHaveText('me@example.com');
    await expect(page.locator('#mockQuotaText')).toHaveText('5 of 5 left');

    await page.locator('#mockCount [data-value="3"]').click();
    await page.locator('#mockMode [data-value="text"]').click();
    const followUps = page.locator('#mockFollowUps');
    if ((await followUps.getAttribute('aria-checked')) === 'true') await followUps.click();
    await page.locator('#mockCamOn').click();
    await page.locator('#mockStart').click();
    await expect(page.locator('#mockLive')).toBeVisible();

    await page.locator('#mockAnswer').fill('I scan the table and steer the row by its content.');
    await page.locator('#mockDone').click();
    await expect(page.locator('#mockFeedback')).toBeVisible();
    await expect(page.locator('#mockVerdict')).toHaveText(RATING.headline);

    // the server key was used by the Worker, never seen by the page, and one interview was counted
    expect(anthropic).toHaveLength(1);
    expect(anthropic[0].key).toBe('sk-ant-server-key');
    const html = await page.content();
    expect(html).not.toContain('sk-ant-server-key');
    await page.locator('#mockNext').click();
    await expect(page.locator('#mockQCount')).toHaveText('Question 2 of 3');
    await page.locator('#mockSkip').click();
    await expect(page.locator('#mockQCount')).toHaveText('Question 3 of 3');
    await page.locator('#mockSkip').click();
    await expect(page.locator('#mockSummary')).toBeVisible();
    await page.locator('#mockAnother').click();
    await expect(page.locator('#mockQuotaText')).toHaveText('4 of 5 left');
    expect(errors, 'errors on the page').toEqual([]);
  } finally {
    globalThis.fetch = realFetch;
  }
});
