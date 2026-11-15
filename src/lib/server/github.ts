import { env } from '$env/dynamic/private';
import type { GitCommit, GithubStats } from '$lib/types';
import { cached } from './cache';
import { fetchJson, formatCount } from './fetch-json';

const repository_api = 'https://api.github.com/repos/lapikit/lapikit';
const commits_scanned = 30;

type ApiCommit = {
	sha: string;
	commit: { message: string };
	parents: unknown[];
};

export const emptyGithubStats: GithubStats = { stars: '' };

function githubHeaders(): HeadersInit {
	const token = env.GITHUB_TOKEN?.trim();

	return {
		accept: 'application/vnd.github+json',
		'user-agent': 'lapikit.dev',
		...(token ? { authorization: `Bearer ${token}` } : {})
	};
}

async function collectStats(): Promise<GithubStats> {
	const repository = await fetchJson(repository_api, githubHeaders());

	return { stars: formatCount(repository.stargazers_count ?? 0) };
}

export const getGithubStats = cached(async (): Promise<GithubStats | null> => {
	try {
		return await collectStats();
	} catch (error) {
		console.warn('[github] unable to load stats', error);
		return null;
	}
});

export async function getRecentCommits(count: number): Promise<GitCommit[] | null> {
	try {
		const commits: ApiCommit[] = await fetchJson(
			`${repository_api}/commits?per_page=${commits_scanned}`,
			githubHeaders()
		);

		const recent = commits
			.filter(({ parents }) => parents.length < 2)
			.slice(0, count)
			.map(({ sha, commit }) => ({
				hash: sha.slice(0, 7),
				message: commit.message.split('\n')[0].trim()
			}));

		return recent.length ? recent : null;
	} catch (error) {
		console.warn('[github] unable to load commits', error);
		return null;
	}
}
