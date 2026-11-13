import { json } from '@sveltejs/kit';
import type { SearchEntry } from '$lib/types';
import { site } from '$lib/server/content';

export const prerender = true;

export function GET() {
	const entries = site.pages.map(
		({ path, title, head, category, keywords, state }): SearchEntry => ({
			pathname: path.pathname,
			title,
			label: head?.title || title,
			...(head?.description && { description: head.description }),
			...(category && { category }),
			...(keywords?.length && { keywords }),
			...(state === 'deprecated' && { deprecated: true })
		})
	);

	return json(entries);
}
