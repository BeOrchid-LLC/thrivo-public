import { expect, test } from '@playwright/test';

const crawlerUserAgents = [
  'Googlebot',
  'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)',
] as const;

test.describe('Google OAuth verification public surfaces', () => {
  for (const userAgent of crawlerUserAgents) {
    test(`homepage is crawlable for ${userAgent}`, async ({ request }) => {
      const response = await request.get('/', {
        headers: { 'User-Agent': userAgent },
        maxRedirects: 0,
      });

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text/html');

      const html = await response.text();
      expect(html).toContain('Thrivo is a mobile weight-loss app');
      expect(html).toContain('href="/privacy-policy"');
      expect(html).not.toContain('aria-label="Loading hero content"');
      expect(html).not.toMatch(/cf-chl-|Just a moment\.\.\.|Enable JavaScript and cookies/i);
    });
  }

  for (const userAgent of crawlerUserAgents) {
    test(`privacy policy is crawlable for ${userAgent}`, async ({ request }) => {
      const response = await request.get('/privacy-policy', {
        headers: { 'User-Agent': userAgent },
        maxRedirects: 0,
      });

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text/html');

      const html = await response.text();
      expect(html).toContain('Google Sign-In and Google user data');
      expect(html).toContain('unique provider account identifier');
      expect(html).toContain('We do not request or access Gmail, Google Drive, Google Calendar');
      expect(html).toContain('We do not sell this data, use it for advertising');
      expect(html).not.toMatch(/cf-chl-|Just a moment\.\.\.|Enable JavaScript and cookies/i);
    });
  }

  test('homepage metadata uses the verified canonical domain', async ({ request }) => {
    const response = await request.get('/', { maxRedirects: 0 });
    const html = await response.text();

    expect(response.status()).toBe(200);
    expect(html).toMatch(/<link[^>]+rel="canonical"[^>]+href="https:\/\/thrivo\.fit"/);
    expect(html).toMatch(/<meta[^>]+property="og:url"[^>]+content="https:\/\/thrivo\.fit"/);
    expect(html).toMatch(/<meta[^>]+property="og:image"[^>]+content="https:\/\/thrivo\.fit\//);
    expect(html).toContain('"url":"https://thrivo.fit"');
    expect(html).not.toContain('preview.thrivo.fit');
  });

  test('sitemap and robots point to the verified canonical domain', async ({ request }) => {
    const [sitemapResponse, robotsResponse] = await Promise.all([
      request.get('/sitemap.xml', { maxRedirects: 0 }),
      request.get('/robots.txt', { maxRedirects: 0 }),
    ]);
    const sitemap = await sitemapResponse.text();
    const robots = await robotsResponse.text();

    expect(sitemapResponse.status()).toBe(200);
    expect(sitemap).toContain('https://thrivo.fit/delete-account');
    expect(sitemap).not.toContain('https://thrivo.fit/dashboard');
    expect(sitemap).not.toContain('preview.thrivo.fit');

    expect(robotsResponse.status()).toBe(200);
    expect(robots).toContain('Sitemap: https://thrivo.fit/sitemap.xml');
    expect(robots).not.toContain('preview.thrivo.fit');
  });
});
