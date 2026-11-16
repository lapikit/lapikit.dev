import type { Handle, HandleServerError } from '@sveltejs/kit';
import { getDocSuggestions } from '$lib/server/doc-suggestions';

// Preload the main text font so it is ready for the first paint: without it the page
// renders with a fallback font first, then shifts when Archivo arrives (layout shift).
// Only the latin subset: the other subsets are rarely needed and would waste bandwidth.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		preload: ({ type, path }) =>
			type === 'js' || type === 'css' || (type === 'font' && path.includes('archivo-latin-wght'))
	});

export const handleError: HandleServerError = ({ error, event, status, message }) => {
	if (status === 404) {
		return { message, suggestions: getDocSuggestions(event.url.pathname) };
	}

	console.error(error);
	return { message };
};
