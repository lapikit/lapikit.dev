import { browser } from '$app/environment';
import type { GithubStats } from '$lib/types';

export const githubState = $state({ stars: '' });

// an empty answer (GitHub unreachable or rate limited) never erases the value rendered at build time
export function setGithubStats(stats: GithubStats) {
	if (stats.stars) githubState.stars = stats.stars;
}

async function loadGithubData() {
	try {
		const response = await fetch('/api/github');
		if (!response.ok) throw new Error(String(response.status));

		setGithubStats(await response.json());
	} catch (error) {
		console.warn('[github] unable to load repository stats', error);
	}
}

if (browser) void loadGithubData();
