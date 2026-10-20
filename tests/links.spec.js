// Every link to another website (Tricentis manual pages, YouTube videos and
// the fonts) still opens. Each address is its own test, so the report names
// the exact link that broke.
// Needs the internet. To skip these, set SKIP_EXTERNAL=1.
const { test, expect } = require('@playwright/test');
const { externalUrls } = require('./helpers');

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
};

test.describe('Links to other websites', () => {
  test.skip(!!process.env.SKIP_EXTERNAL, 'SKIP_EXTERNAL is set');

  for (const url of externalUrls()) {
    test(url, async ({ request }) => {
      // YouTube answers every watch page with 200, even for a deleted video,
      // so a video is checked through YouTube's oEmbed address instead:
      // it answers 200 only when the video exists and may be shown.
      const youtube = /^https:\/\/(www\.)?(youtube\.com\/watch|youtu\.be\/)/.test(url);
      const address = youtube
        ? 'https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(url)
        : url;

      const response = await request.get(address, {
        headers: BROWSER_HEADERS,
        maxRedirects: 10,
        timeout: 30 * 1000,
        failOnStatusCode: false,
      });
      expect(response.status(), `${url} answered ${response.status()}`).toBeLessThan(400);

      // some sites answer a missing page with 200 and a "not found" page
      if ((response.headers()['content-type'] || '').includes('text/html')) {
        const title = ((await response.text()).match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || '';
        expect(title, `${url} shows a "not found" page`).not.toMatch(/page not found|404|not be found/i);
      }
    });
  }
});
