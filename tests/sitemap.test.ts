import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { DocSummary } from '../src/lib/@types';

const manifest: DocSummary[] = JSON.parse(readFileSync('src/manifest.json', 'utf8'));

test('sitemap only lists live pages', async ({ request }) => {
	const response = await request.get('/sitemap.xml');
	expect(response.status()).toBe(200);

	const xml = await response.text();
	const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname);
	const deprecated = manifest.filter((doc) => doc.state === 'deprecated');

	expect(urls.length).toBe(manifest.length - deprecated.length);
	for (const doc of deprecated) expect(urls).not.toContain(doc.path.pathname);

	for (const [, date] of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
		expect(Number.isNaN(Date.parse(date))).toBe(false);
	}

	// every listed URL must answer, a 404 in the sitemap is reported by Search Console
	for (const pathname of urls) {
		const page = await request.get(pathname);
		expect(page.status(), pathname).toBe(200);
	}
});
