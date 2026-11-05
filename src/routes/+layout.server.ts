import type { LayoutServerLoad } from './$types';
import { emptyGithubStats, getGithubStats } from '$lib/server/github';
import { emptyNpmStats, getNpmStats } from '$lib/server/npm';

export const load: LayoutServerLoad = async () => {
	const [npm, github] = await Promise.all([getNpmStats(), getGithubStats()]);

	return { npm: npm ?? emptyNpmStats, github: github ?? emptyGithubStats };
};
