import type { NpmStats } from '$lib/@types';
import { createCachedSource, fetchJson, formatCount } from './cached-source';

export const emptyNpmStats: NpmStats = {
	version: { latest: '', insiders: '' },
	publish: { latest: '', insiders: '' },
	downloads: ''
};

async function collectStats(): Promise<NpmStats> {
	const [packument, downloadStats] = await Promise.all([
		fetchJson('https://registry.npmjs.org/lapikit'),
		fetchJson('https://api.lapikit.dev/lapikit/nbDll')
	]);

	const distTagLatest = packument['dist-tags']?.latest;
	const distTagInsider = packument['dist-tags']?.insiders;

	return {
		version: {
			latest: distTagLatest ? `v${distTagLatest}` : '',
			insiders: distTagInsider ? `v${distTagInsider}` : ''
		},
		publish: {
			latest: packument.time?.[distTagLatest] ?? '',
			insiders: packument.time?.[distTagInsider] ?? ''
		},
		downloads: formatCount(downloadStats.downloads ?? 0)
	};
}

export const getNpmStats = createCachedSource('npm', collectStats);
