import manifest from '../../manifest.json';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { DocSummary } from '$lib/@types';

export const prerender = true;

export async function GET() {
	const baseUrl = PUBLIC_BASE_URL.replace(/\/$/, '');
	// deprecated pages are noindex: listing them would send mixed signals to crawlers
	const entries = (manifest as DocSummary[])
		.filter((entry) => entry.state !== 'deprecated')
		.sort((left, right) => left.path.pathname.localeCompare(right.path.pathname));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${baseUrl}${entry.path.pathname}</loc>${
			entry.lastModified
				? `
    <lastmod>${entry.lastModified}</lastmod>`
				: ''
		}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
