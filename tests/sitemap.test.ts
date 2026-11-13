import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { SearchEntry } from '../src/lib/types';

const pages: SearchEntry[] = JSON.parse(readFileSync('build/prerendered/content.json', 'utf8'));

test('sitemap only lists live pages', async ({ request }) => {
	const response = await request.get('/sitemap.xml');
	expect(response.status()).toBe(200);

	const xml = await response.text();
	const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname);
	const deprecated = pages.filter((page) => page.deprecated);

	expect(urls.length).toBe(pages.length - deprecated.length);
	for (const page of deprecated) expect(urls).not.toContain(page.pathname);

	for (const [, date] of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
		expect(Number.isNaN(Date.parse(date))).toBe(false);
	}

	// every listed URL must answer, a 404 in the sitemap is reported by Search Console
	for (const pathname of urls) {
		const page = await request.get(pathname);
		expect(page.status(), pathname).toBe(200);
	}
});
