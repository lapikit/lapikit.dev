import type { NpmStats } from '$lib/@types';
import { fetchJson, formatCount } from './fetch-json';

export const emptyNpmStats: NpmStats = {
	version: { latest: '', insiders: '' },
	downloads: ''
};

async function collectStats(): Promise<NpmStats> {
	const [distTags, downloadStats] = await Promise.all([
		fetchJson('https://registry.npmjs.org/-/package/lapikit/dist-tags'),
		fetchJson('https://api.lapikit.dev/lapikit/nbDll')
	]);

	return {
		version: {
			latest: distTags.latest ? `v${distTags.latest}` : '',
			insiders: distTags.insiders ? `v${distTags.insiders}` : ''
		},
		downloads: formatCount(downloadStats.downloads ?? 0)
	};
}

export async function getNpmStats(): Promise<NpmStats | null> {
	try {
		return await collectStats();
	} catch (error) {
		console.warn('[npm] unable to load stats', error);
		return null;
	}
}
