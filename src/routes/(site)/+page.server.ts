import { getGitLog } from '$lib/server/git-log';

export async function load({ parent }) {
	const { npm } = await parent();

	return { commits: await getGitLog(npm.version.latest) };
}
