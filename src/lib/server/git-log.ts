import type { GitCommit } from '$lib/types';
import { cached } from './cache';
import { getRecentCommits } from './github';

const commits_shown = 10;
const fallback_version = '0.8.4';
const release_message = /^prepare (?:to )?release v?(\d+\.\d+\.\d+)/i;

const fallback_commits: GitCommit[] = [
	{ hash: '857a637', message: 'optimize data-elevation' },
	{ hash: 'b74d1cb', message: 'bugfix position text chip' },
	{ hash: 'd3ce397', message: 'add number props to elevationType' },
	{ hash: '1d0534f', message: 'one hook for all + use:tooltip' },
	{ hash: '1ad50f2', message: 'add accessible name of clear btn for inputs' },
	{ hash: '5faac3b', message: 'bug fix component dialog, btn and modal' },
	{ hash: 'a55c553', message: 'add Field component with preprocessor' },
	{ hash: '1214a71', message: 'update all components with new structural lapikit' },
	{ hash: 'b7d6f15', message: 'add :where css for card, app and btn' }
];

const loadRecentCommits = cached(() => getRecentCommits(commits_shown));

const toVersion = (version: string) => version.replace(/^v/, '');

function fallbackLog(version: string): GitCommit[] {
	return [
		{ hash: '7e2883a', message: `prepare release ${version || fallback_version}` },
		...fallback_commits
	];
}

function tagRelease(commits: GitCommit[], version: string): GitCommit[] {
	let tagged = false;

	return commits.map((commit) => {
		const released = commit.message.match(release_message)?.[1];
		if (tagged || !released || (version && released !== version)) return commit;

		tagged = true;
		return { ...commit, tag: `v${released}` };
	});
}

export async function getGitLog(latestVersion: string): Promise<GitCommit[]> {
	const version = toVersion(latestVersion);
	const commits = (await loadRecentCommits()) ?? fallbackLog(version);

	return tagRelease(commits, version);
}
