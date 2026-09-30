import { PUBLIC_BASE_URL, PUBLIC_DEV } from '$env/static/public';

import robotsProduction from '../../content/robots/production.txt?raw';
import robotsDevelopment from '../../content/robots/development.txt?raw';

export const prerender = true;

export function GET() {
	const baseUrl = PUBLIC_BASE_URL.replace(/\/$/, '');
	const content = PUBLIC_DEV === 'false' ? robotsProduction : robotsDevelopment;

	return new Response(content.replaceAll('%BASE_URL%', baseUrl), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
