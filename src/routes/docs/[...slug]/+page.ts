import { error } from '@sveltejs/kit';
import { docs, docsBySlug } from '$lib/registry';

export const prerender = true;

export function entries() {
	return docs.map((doc) => ({ slug: doc.slug }));
}

export function load({ params }) {
	const doc = docsBySlug.get(params.slug ?? '');

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const index = docs.findIndex((d) => d.slug === doc.slug);
	const prevDoc = index > 0 ? { slug: docs[index - 1].slug, title: docs[index - 1].metadata.title, path: docs[index - 1].path } : null;
	const nextDoc = index < docs.length - 1 ? { slug: docs[index + 1].slug, title: docs[index + 1].metadata.title, path: docs[index + 1].path } : null;

	return { doc, prevDoc, nextDoc };
}
