import { error } from '@sveltejs/kit';
import { docs, docsBySlug, loadDocContent } from '$lib/pages';

export const prerender = true;

export function entries() {
	return docs.map((doc) => ({ slug: doc.path.slug }));
}

export async function load({ params, data }) {
	const doc = docsBySlug.get(params.slug ?? '');

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const content = data.rendered ?? (await loadDocContent(doc));

	return { doc, content, prevDoc: data.prev, nextDoc: data.next };
}
