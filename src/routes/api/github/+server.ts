import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emptyGithubStats, getGithubStats } from '$lib/server/github';

export const prerender = false;

export const GET: RequestHandler = async () => json((await getGithubStats()) ?? emptyGithubStats);
