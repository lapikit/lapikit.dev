import { browser } from '$app/environment';
import type { NpmStats } from '$lib/@types';

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

// only known values are applied: an empty answer (npm unreachable) never erases the
// values that were rendered at build time
export function setNpmStats(stats: NpmStats) {
	if (stats.version.latest) npmState.version.latest = stats.version.latest;
	if (stats.version.insiders) npmState.version.insiders = stats.version.insiders;
	if (stats.publish.latest) npmState.publish.latest = stats.publish.latest;
	if (stats.publish.insiders) npmState.publish.insiders = stats.publish.insiders;
	if (stats.downloads) npmState.downloads = stats.downloads;
}

// the packument is fetched and cached by /api/npm: the browser only pulls the few fields it needs
export async function loadNpmData() {
	try {
		const response = await fetch('/api/npm');
		if (!response.ok) throw new Error(String(response.status));

		setNpmStats(await response.json());
	} catch (error) {
		// npm stats are decorative: keep the page working if the endpoint is unreachable
		console.warn('[npm] unable to load package stats', error);
	}
}

// kicked off at module evaluation rather than from onMount: the request then runs alongside
// hydration instead of waiting for it. `browser` keeps it out of SSR and prerendering.
if (browser) void loadNpmData();
