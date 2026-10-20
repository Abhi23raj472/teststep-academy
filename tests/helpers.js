// Shared pieces for the site tests: the site's data, an error watcher and a
// checker for links inside the site.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const study = JSON.parse(fs.readFileSync(path.join(ROOT, 'study.json'), 'utf8'));
const questions = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));

const lessonIds = new Set(study.lessons.map((lesson) => lesson.id));
const topics = new Set(questions.map((q) => q.topic));
const VIEWS = new Set(['home', 'syllabus', 'interview', 'cheatsheet', 'glossary']);

// Every web address the site can link to: each "url" in the two data files,
// plus the Google Fonts stylesheet in index.html.
function externalUrls() {
  const urls = new Set();
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') {
      for (const [key, inner] of Object.entries(value)) {
        if (key === 'url' && typeof inner === 'string' && /^https?:\/\//.test(inner)) urls.add(inner);
        else walk(inner);
      }
    }
  };
  walk(study);
  walk(questions);
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  for (const match of html.matchAll(/href="(https:\/\/fonts\.googleapis\.com[^"]+)"/g)) {
    urls.add(match[1].replace(/&amp;/g, '&'));
  }
  return [...urls].sort();
}

// Collects every error a page shows while a test runs: script errors,
// console errors (which include Content-Security-Policy violations) and
// files of this site that fail to load.
async function watchErrors(page) {
  const errors = [];
  const ownSite = (url) => url.startsWith('http://127.0.0.1:4173/');

  // The tests check this site, not Google's servers, so the font files are
  // answered locally. tests/links.spec.js checks the real fonts address.
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) =>
    route.fulfill({ status: 200, contentType: 'text/css', body: '' }));

  page.on('pageerror', (error) => errors.push(`Script error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`Console error: ${message.text()}`);
  });
  page.on('requestfailed', (request) => {
    if (ownSite(request.url())) errors.push(`Could not load ${request.url()}: ${request.failure().errorText}`);
  });
  page.on('response', (response) => {
    if (ownSite(response.url()) && response.status() >= 400) {
      errors.push(`${response.url()} answered ${response.status()}`);
    }
  });
  return errors;
}

// Checks every link on the page that stays inside the site and returns the
// broken ones. A link to a lesson that does not exist would quietly fall back
// to the Syllabus, so lessons and interview topics are checked by name.
async function brokenInternalLinks(page) {
  const links = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 60) })));
  const ids = new Set(await page.locator('[id]').evaluateAll((nodes) => nodes.map((n) => n.id)));
  const broken = [];
  const seen = new Set();

  for (const { href, text } of links) {
    if (seen.has(href)) continue;
    seen.add(href);
    if (/^(https?:|mailto:)/.test(href)) continue; // other websites: see links.spec.js

    let problem = '';
    if (href.startsWith('#/') || href === '#') {
      const [route, query = ''] = href.slice(2).split('?');
      const parts = route.split('/').filter(Boolean);
      const view = parts[0] || 'home';
      if (view === 'learn') {
        const id = decodeURIComponent(parts[1] || '');
        if (!lessonIds.has(id)) problem = `no lesson called "${id}"`;
      } else if (!VIEWS.has(view)) {
        problem = `no page called "${view}"`;
      }
      const topic = new URLSearchParams(query).get('topic');
      if (topic !== null && !topics.has(topic)) problem = `no interview topic called "${topic}"`;
    } else if (href.startsWith('#')) {
      if (!ids.has(href.slice(1))) problem = `nothing on the page has id "${href.slice(1)}"`;
    } else {
      const response = await page.request.get(new URL(href, page.url()).href);
      if (response.status() >= 400) problem = `file answered ${response.status()}`;
    }
    if (problem) broken.push(`${href} ("${text}"): ${problem}`);
  }
  return broken;
}

module.exports = { study, questions, externalUrls, watchErrors, brokenInternalLinks };
