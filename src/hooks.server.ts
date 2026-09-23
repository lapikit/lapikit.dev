import type { Handle } from '@sveltejs/kit';

// Preload the main text font so it is ready for the first paint: without it the page
// renders with a fallback font first, then shifts when Archivo arrives (layout shift).
// Only the latin subset: the other subsets are rarely needed and would waste bandwidth.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		preload: ({ type, path }) =>
			type === 'js' || type === 'css' || (type === 'font' && path.includes('archivo-latin-wght'))
	});
