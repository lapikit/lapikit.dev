import { test, expect } from '@playwright/test';

const pages = [
	'/',
	'/docs',
	'/docs/introduction',
	'/docs/getting-started',
	'/docs/components/application'
];

for (const path of pages) {
	test(`${path} loads without errors`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(err.message));

		const response = await page.goto(path);

		expect(response?.status()).toBeLessThan(400);
		expect(errors).toHaveLength(0);
	});
}
