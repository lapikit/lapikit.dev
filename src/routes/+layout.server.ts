import type { LayoutServerLoad } from './$types';
import { emptyNpmStats, getNpmStats } from '$lib/server/npm';

export const load: LayoutServerLoad = async () => {
	return { npm: (await getNpmStats()) ?? emptyNpmStats };
};
