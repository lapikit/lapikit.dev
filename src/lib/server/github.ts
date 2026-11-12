import { env } from '$env/dynamic/private';
import type { GithubStats } from '$lib/@types';
import { fetchJson, formatCount } from './fetch-json';

const repository_api = 'https://api.github.com/repos/lapikit/lapikit';

export const emptyGithubStats: GithubStats = { stars: '' };

async function collectStats(): Promise<GithubStats> {
	const token = env.GITHUB_TOKEN?.trim();
	const repository = await fetchJson(repository_api, {
		accept: 'application/vnd.github+json',
		'user-agent': 'lapikit.dev',
		...(token ? { authorization: `Bearer ${token}` } : {})
	});

	return { stars: formatCount(repository.stargazers_count ?? 0) };
}

export async function getGithubStats(): Promise<GithubStats | null> {
	try {
		return await collectStats();
	} catch (error) {
		console.warn('[github] unable to load stats', error);
		return null;
	}
}
