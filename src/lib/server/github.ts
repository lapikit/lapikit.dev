import { env } from '$env/dynamic/private';
import type { GithubStats } from '$lib/@types';
import { createCachedSource, fetchJson, formatCount } from './cached-source';

const REPOSITORY_API = 'https://api.github.com/repos/lapikit/lapikit';

export const emptyGithubStats: GithubStats = { stars: '' };

async function collectStats(): Promise<GithubStats> {
	const token = env.GITHUB_TOKEN?.trim();
	const repository = await fetchJson(REPOSITORY_API, {
		accept: 'application/vnd.github+json',
		'user-agent': 'lapikit.dev',
		...(token ? { authorization: `Bearer ${token}` } : {})
	});

	return { stars: formatCount(repository.stargazers_count ?? 0) };
}

export const getGithubStats = createCachedSource('github', collectStats);
