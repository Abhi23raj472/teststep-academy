// The mock interview from sign-in to scorecard, with typed answers. Google and the
// site's Worker (which talks to Anthropic) are answered by the test itself, so no key
// and no internet are needed and nothing is billed.
const { test, expect } = require('@playwright/test');
const { watchErrors, brokenInternalLinks } = require('./helpers');

const WORKER = 'https://teststep-api.test.workers.dev';
const CONFIG = { apiBase: WORKER, googleClientId: 'test-client.apps.googleusercontent.com' };
const USER = { name: 'Abhishek Kumar', email: 'me@example.com' };
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'Authorization, Content-Type, X-Interview-Id',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-expose-headers': 'X-Interviews-Left',
};

// Google's sign-in library: its button signs in at once with a made-up token.
const FAKE_GSI = `window.google = { accounts: { id: {
  initialize: function (o) { window.__gsi = o; },
  renderButton: function (el) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Sign in with Google';
    b.onclick = function () { window.__gsi.callback({ credential: 'google-id-token' }); };
    el.appendChild(b);
  },
  disableAutoSelect: function () {}
} } };`;

const RATING = {
  score: 6,
  headline: 'Good start. One change makes this answer strong.',
  criteria: {
    facts: { score: 7, note: 'Table control and Verify are right.' },
    approach: { score: 4, note: 'Picking row 3 breaks when rows change.' },
    structure: { score: 8, note: 'Step by step and easy to follow.' },
    terms: { score: 6, note: 'Constraint was missing.' },
  },
  did_well: ['You scanned the table as one Table control.'],
  improve: ['Find the row by its content with ActionMode Constraint.'],
  stronger_answer: 'I scan it as a single Table control and use ActionMode Constraint to find the row.',
  syntax: [{ code: '$last', label: 'The last row' }],
  follow_up: '',
  lesson_id: 'tables',
};

function message(content) {
  return { id: 'msg_test', type: 'message', role: 'assistant', model: 'test', content, stop_reason: 'end_turn', usage: { input_tokens: 1, output_tokens: 1 } };
}

// Plays the Worker: sign-in, usage, and rating requests answered like the Anthropic API.
// `rate` returns the rating for the n-th answer.
async function fakeWorker(page, { rate = () => RATING, status = 200, allowed = true, left = 5 } = {}) {
  const calls = [];
  const usage = () => ({ interviewsLimit: 5, interviewsLeft: left, callsPerInterview: 15 });
  await page.route(GSI_ROUTE, (route) => route.fulfill({ contentType: 'text/javascript', body: FAKE_GSI }));
  await page.route(WORKER + '/**', async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const path = new URL(request.url()).pathname;
    const body = request.postDataJSON();
    calls.push({ path, body, headers: request.headers() });
    if (path === '/api/session') {
      if (!allowed) return route.fulfill({ status: 403, headers: CORS, json: { error: 'not_allowed', message: 'This account is not on the list yet.', email: 'stranger@example.com' } });
      return route.fulfill({ headers: CORS, json: { token: 'session-token', user: USER, usage: usage() } });
    }
    if (path === '/api/me') return route.fulfill({ headers: CORS, json: { user: USER, usage: usage() } });
    if (status !== 200) {
      return route.fulfill({ status, headers: CORS, json: { error: 'daily_limit', message: 'You have used all 5 interviews for today. Come back tomorrow.' } });
    }
    const name = body.tools[0].name;
    const n = calls.filter((c) => c.body && c.body.tools && c.body.tools[0].name === 'rate_answer').length;
    const input = name === 'rate_answer'
      ? rate(n)
      : { headline: 'Getting there', summary: 'Solid basics; practise tables.', strengths: ['Clear answers.'], work_on: ['Constraints on tables.'] };
    return route.fulfill({ headers: { ...CORS, 'x-interviews-left': '4' }, json: message([{ type: 'tool_use', id: 'toolu_' + calls.length, name, input }]) });
  });
  return calls;
}

const GSI_ROUTE = 'https://accounts.google.com/gsi/client';

// Opens the page with the Worker set up, already signed in unless `signedIn` is false.
async function open(page, { signedIn = true, config = CONFIG } = {}) {
  await page.addInitScript(([cfg, user, signed]) => {
    window.TSA_CONFIG = cfg;
    if (signed && !sessionStorage.getItem('seeded')) {
      sessionStorage.setItem('seeded', '1');
      localStorage.setItem('tsh.mock.session', JSON.stringify({ token: 'session-token', user, usage: { interviewsLimit: 5, interviewsLeft: 5, callsPerInterview: 15 } }));
    }
  }, [config, USER, signedIn]);
  await page.goto('/index.html#/mock');
}

async function setUp(page, { followUps, opened = false }) {
  if (!opened) await open(page);
  await expect(page.locator('#mockTopics .chip').first()).toBeVisible();
  await page.locator('#mockTopics .chip', { hasText: 'Steering dynamic controls' }).click();
  await page.locator('#mockLevel [data-value=""]').click();
  await page.locator('#mockCount [data-value="3"]').click();
  await page.locator('#mockMode [data-value="text"]').click();
  const toggle = page.locator('#mockFollowUps');
  if ((await toggle.getAttribute('aria-checked')) !== String(followUps)) await toggle.click();
  await page.locator('#mockStart').click();
  await expect(page.locator('#mockLive')).toBeVisible();
}

async function answer(page, text) {
  await expect(page.locator('#mockQuestion')).not.toBeEmpty();
  await page.locator('#mockAnswer').fill(text);
  await page.locator('#mockDone').click();
  await expect(page.locator('#mockFeedback')).toBeVisible();
}

test.describe('Mock interview', () => {
  test('rates each answer, asks a follow-up and ends with a scorecard', async ({ page }) => {
    const errors = await watchErrors(page);
    const calls = await fakeWorker(page, { rate: (n) => (n === 1
      ? { ...RATING, follow_up: 'And how do you reach the last row, whatever the size of the table?' }
      : { ...RATING, score: 8, headline: 'Strong answer.' }) });

    await setUp(page, { followUps: true });
    const firstQuestion = await page.locator('#mockQuestion').textContent();
    await expect(page.locator('#mockQCount')).toHaveText('Question 1 of 3');

    // 1: rated, with a follow-up next
    await answer(page, 'I scan the table as one Table control and verify row three.');
    await expect(page.locator('#mockScore')).toContainText('6');
    await expect(page.locator('#mockVerdict')).toHaveText(RATING.headline);
    await expect(page.locator('#mockCriteria li')).toHaveCount(4);
    await expect(page.locator('#mockGood li')).toHaveText([RATING.did_well[0]]);
    await expect(page.locator('#mockImprove li')).toHaveText([RATING.improve[0]]);
    await expect(page.locator('#mockSyntax code')).toHaveText(['$last']);
    await expect(page.locator('#mockRevise')).toHaveAttribute('href', '#/learn/tables');
    await expect(page.locator('#mockNextSub')).toHaveText('A follow-up on this answer');

    // 2: the follow-up, which may not lead to another follow-up
    await page.locator('#mockNext').click();
    await expect(page.locator('#mockQuestion')).toHaveText('And how do you reach the last row, whatever the size of the table?');
    await expect(page.locator('#mockLevelChip')).toHaveText('Follow-up');
    await expect(page.locator('#mockQCount')).toHaveText('Question 2 of 3');
    await answer(page, 'With $last as the row.');
    await expect(page.locator('#mockScore')).toContainText('8');

    // 3: skipped
    await page.locator('#mockNext').click();
    await expect(page.locator('#mockQCount')).toHaveText('Question 3 of 3');
    await expect(page.locator('#mockQuestion')).not.toHaveText(firstQuestion);
    await page.locator('#mockSkip').click();

    // scorecard: (6 + 8 + 0) / 3 = 47%
    await expect(page.locator('#mockSummary')).toBeVisible();
    await expect(page.locator('#mockRingValue')).toHaveText('47%');
    await expect(page.locator('#mockQList li')).toHaveCount(3);
    await expect(page.locator('#mockQList .mock-qscore')).toHaveText(['6', '8', 'Skip']);
    await expect(page.locator('#mockResultTitle')).toHaveText('Getting there');
    await expect(page.locator('#mockReviseList a').first()).toHaveAttribute('href', '#/learn/tables');
    expect(await brokenInternalLinks(page), 'broken links on the scorecard').toEqual([]);

    // what was sent to the Worker: the session token, one interview id, and never a key
    const sent = calls.filter((c) => c.path === '/api/messages');
    const ratings = sent.filter((c) => c.body.tools[0].name === 'rate_answer');
    expect(ratings).toHaveLength(2);
    expect(sent).toHaveLength(3); // two ratings and the scorecard summary
    const ids = new Set(sent.map((c) => c.headers['x-interview-id']));
    expect(ids.size).toBe(1);
    expect([...ids][0]).toMatch(/^[A-Za-z0-9-]{8,64}$/);
    for (const call of calls) {
      expect(call.headers.authorization).toBe('Bearer session-token');
      expect(call.headers['x-api-key']).toBeUndefined();
    }
    for (const call of sent) expect(call.body.model).toBe('claude-sonnet-5-5');
    const first = ratings[0].body.messages[0].content;
    expect(first).toContain(firstQuestion);
    expect(first).toContain('I scan the table as one Table control and verify row three.');
    expect(first).toContain('Reference answer:');
    expect(first).toContain('Follow-ups allowed: yes');
    expect(ratings[1].body.messages[0].content).toContain('Follow-ups allowed: no');

    // the past interview is listed on the setup page
    await page.locator('#mockAnother').click();
    await expect(page.locator('#mockHistory li')).toHaveCount(1);
    await expect(page.locator('#mockHistory li')).toContainText('47%');

    expect(errors, 'errors on the page').toEqual([]);
  });

  test('signs in with Google, shows the account, and signs out', async ({ page }) => {
    const errors = await watchErrors(page);
    const calls = await fakeWorker(page);
    await open(page, { signedIn: false });
    await expect(page.locator('#mockGate')).toBeVisible();
    await expect(page.locator('#mockGateTitle')).toHaveText('Sign in to start');
    await expect(page.locator('#mockSetupBody')).toBeHidden();
    await expect(page.locator('#mockKey')).toHaveCount(0);

    await page.locator('#mockGoogleButton button').click();
    await expect(page.locator('#mockSetupBody')).toBeVisible();
    await expect(page.locator('#mockGate')).toBeHidden();
    await expect(page.locator('#mockAcctName')).toHaveText(USER.name);
    await expect(page.locator('#mockAcctEmail')).toHaveText(USER.email);
    await expect(page.locator('#mockAcctAvatar')).toHaveText('AK');
    await expect(page.locator('#mockQuotaText')).toHaveText('5 of 5 left');
    await expect(page.locator('#mockQuotaPips span.is-on')).toHaveCount(5);
    expect(calls.find((c) => c.path === '/api/session').body).toEqual({ credential: 'google-id-token' });

    // stays signed in after a reload
    await page.reload();
    await expect(page.locator('#mockSetupBody')).toBeVisible();

    await page.locator('#mockSignOut').click();
    await expect(page.locator('#mockGate')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('tsh.mock.session'))).toBeNull();
    expect(errors, 'errors on the page').toEqual([]);
  });

  test('tells an account that is not on the list', async ({ page }) => {
    await fakeWorker(page, { allowed: false });
    await open(page, { signedIn: false });
    await page.locator('#mockGoogleButton button').click();
    await expect(page.locator('#mockGateTitle')).toHaveText('Not open yet');
    await expect(page.locator('#mockGateText')).toContainText('stranger@example.com');
    await expect(page.locator('#mockOtherAccount')).toBeVisible();
    await expect(page.locator('#mockSetupBody')).toBeHidden();
    await page.locator('#mockOtherAccount').click();
    await expect(page.locator('#mockGateTitle')).toHaveText('Sign in to start');
  });

  test('says it is not open yet while config.js is empty', async ({ page }) => {
    const errors = await watchErrors(page);
    await open(page, { signedIn: true, config: { apiBase: '', googleClientId: '' } });
    await expect(page.locator('#mockGateTitle')).toHaveText('Not open yet');
    await expect(page.locator('#mockGoogleButton')).toBeHidden();
    await expect(page.locator('#mockSetupBody')).toBeHidden();
    expect(errors, 'errors on the page').toEqual([]);
  });

  test('stops at the daily limit before the interview starts', async ({ page }) => {
    await fakeWorker(page, { left: 0 });
    await open(page);
    await expect(page.locator('#mockTopics .chip').first()).toBeVisible();
    await page.locator('#mockStart').click();
    await expect(page.locator('#mockStartError')).toContainText("used all of today's interviews");
    await expect(page.locator('#mockLive')).toBeHidden();
    await expect(page.locator('#mockQuotaText')).toHaveText('0 of 5 left');
  });

  test('shows the camera as a video-call tile, and turns it off and on', async ({ page }) => {
    const errors = await watchErrors(page);
    await fakeWorker(page);
    const video = page.locator('#mockVideo');
    const playing = () => video.evaluate((v) => !!v.srcObject && v.videoWidth > 0);

    // the camera check on the setup page (the browser's fake camera is used in tests)
    await open(page);
    await page.locator('#mockCamTest').click();
    await expect(page.locator('#mockCamStatus')).toHaveText('Your camera works');
    await expect(page.locator('#mockCamPreview')).toBeVisible();
    await expect(page.locator('#mockCamOn')).toHaveAttribute('aria-checked', 'true');

    await setUp(page, { followUps: false, opened: true });
    const tile = page.locator('#mockCamTile');
    await expect(tile).toHaveAttribute('data-cam', 'on');
    await expect.poll(playing).toBe(true);
    await expect(tile).toContainText('Not recorded');

    // off and on again during the interview
    const toggle = page.locator('#mockCamToggle');
    await expect(toggle).toHaveText('Turn camera off');
    await toggle.click();
    await expect(tile).toHaveAttribute('data-cam', 'off');
    await expect(page.locator('#mockCamOffText')).toHaveText('Camera off');
    expect(await video.evaluate((v) => v.srcObject)).toBeNull();
    await expect(toggle).toHaveText('Turn camera on');
    await toggle.click();
    await expect(tile).toHaveAttribute('data-cam', 'on');
    await expect.poll(playing).toBe(true);

    // leaving the page releases the camera; coming back turns it on again
    await page.goto('/index.html#/');
    expect(await video.evaluate((v) => v.srcObject)).toBeNull();
    await page.goto('/index.html#/mock');
    await expect(tile).toHaveAttribute('data-cam', 'on');

    // ending the interview releases it
    await page.locator('#mockEnd').click();
    await expect(page.locator('#mockSetup')).toBeVisible();
    expect(await video.evaluate((v) => v.srcObject)).toBeNull();
    expect(errors, 'errors on the page').toEqual([]);
  });

  test('keeps the camera off when it is switched off on the setup page', async ({ page }) => {
    await fakeWorker(page);
    await open(page);
    await page.locator('#mockCamOn').click();
    await expect(page.locator('#mockCamOn')).toHaveAttribute('aria-checked', 'false');
    await setUp(page, { followUps: false, opened: true });
    await expect(page.locator('#mockCamTile')).toHaveAttribute('data-cam', 'off');
    await expect(page.locator('#mockCamOffText')).toHaveText('Camera off');
    expect(await page.locator('#mockVideo').evaluate((v) => v.srcObject)).toBeNull();
  });
});
