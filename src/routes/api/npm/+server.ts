import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emptyNpmStats, getNpmStats } from '$lib/server/npm';

export const prerender = false;

export const GET: RequestHandler = async () => json((await getNpmStats()) ?? emptyNpmStats);
