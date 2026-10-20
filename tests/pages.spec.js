// Every page and every lesson opens without errors, and every link inside
// the site leads to something that exists.
const { test, expect } = require('@playwright/test');
const { study, watchErrors, brokenInternalLinks } = require('./helpers');

const PAGES = [
  { name: 'Home', hash: '#/', ready: '#homeUnits .module-card' },
  { name: 'Syllabus', hash: '#/syllabus', ready: '#syllabusList .lesson-row' },
  { name: 'Interview preparation', hash: '#/interview', ready: '#cards .card' },
  { name: 'Mock interview', hash: '#/mock', ready: '#mockTopics .chip' },
  { name: 'Cheat sheet', hash: '#/cheatsheet', ready: '.cheat-group' },
  { name: 'Glossary', hash: '#/glossary', ready: '.term' },
];

test.describe('Pages', () => {
  for (const { name, hash, ready } of PAGES) {
    test(`${name} opens without errors and its links work`, async ({ page }) => {
      const errors = await watchErrors(page);

      await page.goto('/index.html' + hash);
      await expect(page.locator(ready).first()).toBeVisible();
      await expect(page.locator('h1:visible')).toHaveCount(1);

      if (name === 'Interview preparation') {
        // a question's links are only added when it is opened
        await page.locator('#expandAll').click();
        await expect(page.locator('#cards .card-body:visible')).toHaveCount(await page.locator('#cards .card').count());
      }

      expect(await brokenInternalLinks(page), 'broken links inside the site').toEqual([]);
      expect(errors, 'errors on the page').toEqual([]);
    });
  }

  test('switching to the dark theme and back shows no errors', async ({ page }) => {
    const errors = await watchErrors(page);
    await page.goto('/index.html#/');
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme');

    await page.locator('#themeToggle').click();
    await expect(html).not.toHaveAttribute('data-theme', before);
    await page.locator('#themeToggle').click();
    await expect(html).toHaveAttribute('data-theme', before);

    expect(errors, 'errors on the page').toEqual([]);
  });
});

test.describe('Lessons', () => {
  for (const lesson of study.lessons) {
    test(`${lesson.id} opens without errors and its links work`, async ({ page }) => {
      const errors = await watchErrors(page);

      await page.goto('/index.html#/learn/' + encodeURIComponent(lesson.id));
      await expect(page.locator('#lessonArticle h1')).toHaveText(lesson.title);
      await expect(page.locator('#lessonArticle figure').first()).toBeVisible();

      expect(await brokenInternalLinks(page), 'broken links inside the site').toEqual([]);
      expect(errors, 'errors on the page').toEqual([]);
    });
  }
});
