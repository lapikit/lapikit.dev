import { error } from '@sveltejs/kit';
import { docs, docsByPath, docsBySlug, loadDocComponent } from '$lib/markdown';
import { docsNavigation } from '$lib/router';

export const prerender = true;

const navPaths = docsNavigation.flatMap((section) => section.pages.map((page) => page.url));

export function entries() {
	return docs.map((doc) => ({ slug: doc.path.slug }));
}

export async function load({ params }) {
	const doc = docsBySlug.get(params.slug ?? '');

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const index = navPaths.indexOf(doc.path.pathname);
	const prevPath = index > 0 ? navPaths[index - 1] : null;
	const nextPath = index !== -1 && index < navPaths.length - 1 ? navPaths[index + 1] : null;

	const prevDoc = prevPath ? toDocLink(prevPath) : null;
	const nextDoc = nextPath ? toDocLink(nextPath) : null;

	const component = await loadDocComponent(doc);

	return { doc: { ...doc, component }, prevDoc, nextDoc };
}

function toDocLink(pathname: string) {
	const doc = docsByPath.get(pathname);
	if (!doc) return null;
	return {
		slug: doc.path.slug,
		title: doc?.head?.title || doc.title,
		path: doc.path.pathname
	};
}
