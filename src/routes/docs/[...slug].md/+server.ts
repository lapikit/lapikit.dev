import { error } from '@sveltejs/kit';
import { docs } from '$lib/server/content';
import { docToMarkdown } from '$lib/server/doc-markdown';

export const prerender = true;

export function entries() {
	return Object.values(docs.pages).map(({ slug }) => ({ slug }));
}

export function GET({ params }) {
	const page = docs.pages[`/docs/${params.slug}`];

	if (!page) {
		error(404, 'Documentation page not found');
	}

	return new Response(docToMarkdown(page.summary), {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
