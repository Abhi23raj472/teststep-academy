// The mock interview from start to scorecard, with typed answers. The Anthropic API
// is answered by the test itself, so no key and no internet are needed and nothing
// is billed. The real API is only called when someone uses the page.
const { test, expect } = require('@playwright/test');
const { watchErrors, brokenInternalLinks } = require('./helpers');

const API = 'https://api.anthropic.com/v1/messages';
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
};

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

// Answers like the Anthropic API. `rate` returns the rating for the n-th answer.
async function fakeApi(page, rate, status = 200) {
  const calls = [];
  await page.route(API, async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const body = request.postDataJSON();
    calls.push({ body, headers: request.headers() });
    if (status !== 200) {
      return route.fulfill({ status, headers: CORS, json: { type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } } });
    }
    if (!body.tools) return route.fulfill({ headers: CORS, json: message([{ type: 'text', text: 'OK' }]) });
    const name = body.tools[0].name;
    const n = calls.filter((c) => c.body.tools && c.body.tools[0].name === 'rate_answer').length;
    const input = name === 'rate_answer'
      ? rate(n)
      : { headline: 'Getting there', summary: 'Solid basics; practise tables.', strengths: ['Clear answers.'], work_on: ['Constraints on tables.'] };
    return route.fulfill({ headers: CORS, json: message([{ type: 'tool_use', id: 'toolu_' + calls.length, name, input }]) });
  });
  return calls;
}

async function setUp(page, { followUps }) {
  await page.goto('/index.html#/mock');
  await expect(page.locator('#mockTopics .chip').first()).toBeVisible();
  await page.locator('#mockTopics .chip', { hasText: 'Steering dynamic controls' }).click();
  await page.locator('#mockLevel [data-value=""]').click();
  await page.locator('#mockCount [data-value="3"]').click();
  await page.locator('#mockMode [data-value="text"]').click();
  const toggle = page.locator('#mockFollowUps');
  if ((await toggle.getAttribute('aria-checked')) !== String(followUps)) await toggle.click();
  await page.locator('#mockKey').fill('sk-ant-test-key');
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
    const calls = await fakeApi(page, (n) => (n === 1
      ? { ...RATING, follow_up: 'And how do you reach the last row, whatever the size of the table?' }
      : { ...RATING, score: 8, headline: 'Strong answer.' }));

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

    // what was sent to Anthropic
    const ratings = calls.filter((c) => c.body.tools && c.body.tools[0].name === 'rate_answer');
    expect(ratings).toHaveLength(2);
    for (const call of calls) {
      expect(call.headers['x-api-key']).toBe('sk-ant-test-key');
      expect(call.headers['anthropic-dangerous-direct-browser-access']).toBe('true');
      expect(call.body.model).toBe('claude-sonnet-5-5');
    }
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

  test('explains a rejected API key before the interview starts', async ({ page }) => {
    await fakeApi(page, () => RATING, 401);
    await page.goto('/index.html#/mock');
    await expect(page.locator('#mockTopics .chip').first()).toBeVisible();
    await page.locator('#mockKey').fill('sk-ant-wrong');
    await page.locator('#mockStart').click();
    await expect(page.locator('#mockKeyError')).toContainText('Anthropic did not accept the API key');
    await expect(page.locator('#mockSetup')).toBeVisible();
    await expect(page.locator('#mockLive')).toBeHidden();
  });

  test('asks for a key before starting', async ({ page }) => {
    await page.goto('/index.html#/mock');
    await expect(page.locator('#mockTopics .chip').first()).toBeVisible();
    await page.locator('#mockStart').click();
    await expect(page.locator('#mockKeyError')).toContainText('Add your Anthropic API key');
    await expect(page.locator('#mockKey')).toBeFocused();
  });
});
