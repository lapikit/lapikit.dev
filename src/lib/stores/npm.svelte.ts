import { SvelteDate } from 'svelte/reactivity';
import { npm_stats_storage_key } from '$lib';

const NPM_CACHE_TTL = 4 * 60 * 60 * 1000;

type NpmCache = {
	version: { latest: string; insiders: string };
	publish: { latest: string; insiders: string };
	downloads: string;
	cachedAt: number;
};

function formatDownloads(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

export const npmState = $state({
	version: {
		latest: '',
		insiders: ''
	},
	publish: {
		latest: '',
		insiders: ''
	},
	downloads: ''
});

export async function loadNpmData() {
	const raw = localStorage.getItem(npm_stats_storage_key);
	if (raw) {
		const cache: NpmCache = JSON.parse(raw);
		if (Date.now() - cache.cachedAt < NPM_CACHE_TTL) {
			npmState.version.latest = cache.version.latest;
			npmState.version.insiders = cache.version.insiders;
			npmState.publish.latest = cache.publish.latest;
			npmState.publish.insiders = cache.publish.insiders;
			npmState.downloads = cache.downloads;
			return;
		}
	}

	const today = new SvelteDate().toISOString().slice(0, 10);
	const [dlRes, packumentRes] = await Promise.all([
		fetch(`https://api.npmjs.org/downloads/point/2025-04-19:${today}/lapikit`),
		fetch('https://registry.npmjs.org/lapikit')
	]);

	const [dlData, packument] = await Promise.all([dlRes.json(), packumentRes.json()]);

	const distTagLatest = packument['dist-tags']?.latest;
	const distTagInsider = packument['dist-tags']?.insiders;

	const versionMain = distTagLatest ? `v${distTagLatest}` : '';
	const versionInsider = distTagInsider ? `v${distTagInsider}` : '';
	const downloads = formatDownloads(dlData.downloads);

	const publishMain = packument.time?.[distTagLatest] ?? '';
	const publishInsider = packument.time?.[distTagInsider] ?? '';

	npmState.version.latest = versionMain;
	npmState.version.insiders = versionInsider;
	npmState.publish.latest = publishMain;
	npmState.publish.insiders = publishInsider;
	npmState.downloads = downloads;

	localStorage.setItem(
		npm_stats_storage_key,
		JSON.stringify({
			version: {
				latest: versionMain,
				insiders: versionInsider
			},
			publish: {
				latest: publishMain,
				insiders: publishInsider
			},
			downloads,
			cachedAt: Date.now()
		})
	);
}
