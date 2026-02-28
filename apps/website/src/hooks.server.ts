import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const pathname = url.pathname;

	// 1) Redirect HTTP -> HTTPS (OK)
	if (request.headers.get('x-forwarded-proto') === 'http' && !pathname.startsWith('/health')) {
		return new Response(null, {
			status: 301,
			headers: {
				location: `https://${url.host}${url.pathname}${url.search}`
			}
		});
	}

	// 2) IMPORTANT: never redirect source markdown files
	// Make them 404 (or 410) so Google drops them.
	if (pathname.endsWith('.md')) {
		return new Response('Not found', { status: 404 });
		// alternative: 410 is even more explicit
		// return new Response('Gone', { status: 410 });
	}

	// 3) Redirect old URLs to /docs (good)
	const docsPatterns = [
		'/getting-started',
		'/migration-guide',
		'/introduction',
		'/breakpoints',
		'/customize'
	];
	const componentPatterns = ['/components/', '/hooks/', '/stores/', '/actions/'];

	if (docsPatterns.some((pattern) => pathname.startsWith(pattern))) {
		return new Response(null, {
			status: 301,
			headers: { location: `/docs${pathname}${url.search}` }
		});
	}

	if (
		componentPatterns.some((pattern) => pathname.startsWith(pattern)) &&
		!pathname.startsWith('/docs/')
	) {
		return new Response(null, {
			status: 301,
			headers: { location: `/docs${pathname}${url.search}` }
		});
	}

	// 4) Trailing slash normalize in /docs (OK)
	if (pathname.startsWith('/docs/') && pathname !== '/docs' && pathname !== '/docs/') {
		if (pathname.endsWith('/') && pathname !== '/docs/') {
			const newPath = pathname.slice(0, -1);
			return new Response(null, {
				status: 301,
				headers: { location: `${newPath}${url.search}` }
			});
		}
	}

	return resolve(event);
};
