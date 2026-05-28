import { SvelteDate } from 'svelte/reactivity';
import { npm_stats_storage_key } from '$lib';

const NPM_CACHE_TTL = 4 * 60 * 60 * 1000;

type NpmCache = { version: string; downloads: string; cachedAt: number };

function formatDownloads(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

export const npmState = $state({
	version: '',
	downloads: ''
});

export async function loadNpmData() {
	const raw = localStorage.getItem(npm_stats_storage_key);
	if (raw) {
		const cache: NpmCache = JSON.parse(raw);
		if (Date.now() - cache.cachedAt < NPM_CACHE_TTL) {
			npmState.version = cache.version;
			npmState.downloads = cache.downloads;
			return;
		}
	}

	const today = new SvelteDate().toISOString().slice(0, 10);
	const [dlRes, versionRes] = await Promise.all([
		fetch(`https://api.npmjs.org/downloads/point/2025-04-19:${today}/lapikit`),
		fetch('https://registry.npmjs.org/lapikit/latest')
	]);

	const [dlData, versionData] = await Promise.all([dlRes.json(), versionRes.json()]);

	const version = `v${versionData.version}`;
	const downloads = formatDownloads(dlData.downloads);

	npmState.version = version;
	npmState.downloads = downloads;

	localStorage.setItem(
		npm_stats_storage_key,
		JSON.stringify({ version, downloads, cachedAt: Date.now() })
	);
}
