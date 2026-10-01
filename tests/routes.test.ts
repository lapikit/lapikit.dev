import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const manifest: { path: { pathname: string } }[] = JSON.parse(
	readFileSync('src/manifest.json', 'utf8')
);

for (const { path } of manifest) {
	test(`${path.pathname} loads correctly`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(err.message));

		const response = await page.goto(path.pathname);

		expect(response?.status()).toBeLessThan(400);
		expect(errors).toEqual([]);

		// SEO basics
		await expect(page).toHaveTitle(/\S/);
		await expect(page.locator('h1')).not.toHaveCount(0);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);

		// social previews: networks ignore relative image URLs
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
			'content',
			/^https?:\/\/.+\.png$/
		);
		await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
			'content',
			'summary_large_image'
		);
	});
}

test('default social image is served', async ({ request }) => {
	const response = await request.get('/og/default.png');

	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toBe('image/png');
});

for (const pathname of ['/this-page-does-not-exist', '/docs/this-page-does-not-exist']) {
	test(`${pathname} returns a non-indexable 404 page`, async ({ page }) => {
		const response = await page.goto(pathname);

		expect(response?.status()).toBe(404);
		await expect(page.locator('h1')).toHaveText('Page not found');
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
		await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
	});
}

test('structured data is valid JSON with the expected types', async ({ page }) => {
	const typesOn = async (pathname: string) => {
		await page.goto(pathname);
		const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
		return blocks.map((block) => JSON.parse(block)['@type']);
	};

	expect(await typesOn('/')).toEqual(['WebSite']);
	expect(await typesOn('/docs/components/button')).toEqual(['BreadcrumbList', 'TechArticle']);
});
