import { error } from '@sveltejs/kit';
import { docs } from '$lib/server/content';
import { getDocSuggestions } from '$lib/server/doc-suggestions';
import { pageMeta } from '$lib/server/page-meta';
import { renderMarkdown } from '$lib/server/renderer';

export function entries() {
	return Object.values(docs.pages).map(({ slug }) => ({ slug }));
}

export function load({ params, url }) {
	const page = docs.pages[`/docs/${params.slug}`];

	if (!page) {
		error(404, {
			message: 'Documentation page not found',
			suggestions: getDocSuggestions(url.pathname)
		});
	}

	return {
		...pageMeta(page.path),
		doc: page.summary,
		prevDoc: page.prev,
		nextDoc: page.next,
		rendered: renderMarkdown(page.source, page.file)
	};
}
