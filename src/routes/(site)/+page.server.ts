import { docs } from '$lib/server/content';
import { getGitLog } from '$lib/server/git-log';

const marqueeComponents = () =>
	(docs.navigation.find(({ label }) => label === 'Components')?.pages ?? []).flatMap(
		({ name, url, image, icon }) => (name && image ? [{ name, url, image: icon ?? image }] : [])
	);

export async function load({ parent }) {
	const { npm } = await parent();

	return {
		components: marqueeComponents(),
		commits: await getGitLog(npm.version.latest)
	};
}
