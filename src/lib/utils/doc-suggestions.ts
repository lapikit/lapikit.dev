import type { Pathname } from '$app/types';
import { pages } from '$lib/pages';

export type DocSuggestion = { title: string; path: Pathname };

const max_suggestions = 3;

export function getDocSuggestions(pathname: string): DocSuggestion[] {
	const wanted = lastSegment(pathname);
	if (!wanted) return [];

	return pages
		.filter((doc) => doc.state !== 'deprecated' && doc.path.pathname !== '/')
		.map((doc) => ({ doc, distance: distance(wanted, lastSegment(doc.path.pathname)) }))
		.filter(({ distance }) => distance <= Math.max(2, Math.floor(wanted.length / 3)))
		.sort((a, b) => a.distance - b.distance)
		.slice(0, max_suggestions)
		.map(({ doc }) => ({
			title: doc.head?.title || doc.title,
			path: doc.path.pathname as Pathname
		}));
}

function lastSegment(pathname: string) {
	return pathname.replace(/\/$/, '').split('/').pop()?.toLowerCase() ?? '';
}

function distance(a: string, b: string) {
	let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

	for (let i = 1; i <= a.length; i++) {
		const current = [i];
		for (let j = 1; j <= b.length; j++) {
			current[j] = Math.min(
				previous[j] + 1,
				current[j - 1] + 1,
				previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
			);
		}
		previous = current;
	}

	return previous[b.length];
}
