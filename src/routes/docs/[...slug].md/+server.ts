import { error } from '@sveltejs/kit';
import { docs, docsBySlug } from '$lib/markdown';
import { docToMarkdown } from '$lib/server/doc-markdown';

export const prerender = true;

export function entries() {
	return docs.map((doc) => ({ slug: doc.path.slug }));
}

export function GET({ params }) {
	const doc = docsBySlug.get(params.slug);

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	return new Response(docToMarkdown(doc), {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
