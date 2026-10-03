import { test, expect } from '@playwright/test';

// robots.txt and the robots meta tag both come from PUBLIC_DEV: they must never disagree,
// otherwise a production build could end up blocked by robots.txt (or a dev build indexed).
test('robots.txt matches the robots meta tag', async ({ page, request }) => {
	const response = await request.get('/robots.txt');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('text/plain');

	const robots = await response.text();
	const blocksEverything = /^Disallow:\s*\/\s*$/m.test(robots);

	await page.goto('/');
	const meta = await page.locator('meta[name="robots"]').getAttribute('content');
	const noindex = meta?.includes('noindex') ?? false;

	expect(blocksEverything).toBe(noindex);

	if (!noindex) {
		expect(robots).toMatch(/^Sitemap: https:\/\/\S+\/sitemap\.xml$/m);
	}
});
