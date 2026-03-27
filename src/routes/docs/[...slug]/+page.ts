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

	return { doc };
}
