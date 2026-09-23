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
	});
}
