import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emptyGithubStats, getGithubStats } from '$lib/server/github';

export const prerender = false;

export const GET: RequestHandler = async ({ setHeaders }) => {
	const stats = await getGithubStats();

	if (!stats) {
		setHeaders({ 'cache-control': 'no-store' });
		return json(emptyGithubStats);
	}

	setHeaders({ 'cache-control': 'public, max-age=900, stale-while-revalidate=3600' });
	return json(stats);
};
