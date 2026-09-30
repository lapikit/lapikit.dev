import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emptyNpmStats, getNpmStats } from '$lib/server/npm';

export const prerender = false;

export const GET: RequestHandler = async ({ setHeaders }) => {
	const stats = await getNpmStats();

	if (!stats) {
		setHeaders({ 'cache-control': 'no-store' });
		return json(emptyNpmStats);
	}

	setHeaders({ 'cache-control': 'public, max-age=900, stale-while-revalidate=3600' });
	return json(stats);
};
