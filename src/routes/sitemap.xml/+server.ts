import { PUBLIC_BASE_URL } from '$env/static/public';
import { siteDefaultUrl } from '$lib/constants';
import { docsPaths } from '$lib/registry';

export const prerender = true;

const pageModules = import.meta.glob('/src/routes/**/+page.svelte');
const markdownModules = import.meta.glob('/src/routes/**/+page.md');

function toUrl(path: string) {
	const route = path
		.replace('/src/routes', '')
		.replace(/\/\+page\.(svelte|md)$/, '')
		.replace(/\/$/, '');

	return route || '/';
}

export async function GET() {
	const baseUrl = (PUBLIC_BASE_URL || siteDefaultUrl).replace(/\/$/, '');

	const routes = [...Object.keys(pageModules), ...Object.keys(markdownModules)]
		.map(toUrl)
		.filter((route) => !route.includes('['))
		.filter((route) => !route.includes('('))
		.concat(docsPaths);

	const uniqueRoutes = [...new Set(routes)].sort();

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route}</loc>
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
