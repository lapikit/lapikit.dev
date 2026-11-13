import { docs } from '$lib/server/content';
import { renderMarkdown } from '$lib/server/renderer';

const usesSvelteMarkup = (source: string) => source.includes('<script');

export function load({ params }) {
	const page = docs.pages[`/docs/${params.slug}`];

	return {
		prev: page?.prev ?? null,
		next: page?.next ?? null,
		rendered: page && !usesSvelteMarkup(page.source) ? renderMarkdown(page.source) : null
	};
}
