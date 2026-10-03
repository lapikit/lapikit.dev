import { building } from '$app/environment';
import { PUBLIC_BASE_URL, PUBLIC_DEV } from '$env/static/public';

export const prerender = true;

if (
	building &&
	PUBLIC_DEV === 'false' &&
	!/^https:\/\/(?!localhost)[^/]+\/?$/.test(PUBLIC_BASE_URL)
) {
	throw new Error(
		`PUBLIC_BASE_URL must be the public https origin in production (got "${PUBLIC_BASE_URL}")`
	);
}
