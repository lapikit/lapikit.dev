import { error } from '@sveltejs/kit';
import { docsNavigation, docs, docsByPath, docsBySlug } from '$lib';

export const prerender = true;

const navPaths = docsNavigation.flatMap((section) => section.pages.map((page) => page.url));

export function entries() {
	return docs.map((doc) => ({ slug: doc.slug }));
}

export function load({ params }) {
	const doc = docsBySlug.get(params.slug ?? '');

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const index = navPaths.indexOf(doc.path);
	const prevPath = index > 0 ? navPaths[index - 1] : null;
	const nextPath = index !== -1 && index < navPaths.length - 1 ? navPaths[index + 1] : null;

	const prevDoc = prevPath ? toDocLink(prevPath) : null;
	const nextDoc = nextPath ? toDocLink(nextPath) : null;

	return { doc, prevDoc, nextDoc };
}

function toDocLink(path: string) {
	const doc = docsByPath.get(path);
	if (!doc) return null;
	return { slug: doc.slug, title: doc.metadata.title, path: doc.path };
}
