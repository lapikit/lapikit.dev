import type { NpmStats } from '$lib/@types';

const CACHE_TTL = 15 * 60 * 1000;
const RETRY_DELAY = 60 * 1000;
const FETCH_TIMEOUT = 5000;

export const emptyNpmStats: NpmStats = {
	version: { latest: '', insiders: '' },
	publish: { latest: '', insiders: '' },
	downloads: ''
};

let cache: { data: NpmStats; at: number } | null = null;
let inflight: Promise<NpmStats> | null = null;
let failedAt = 0;

function formatDownloads(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

async function fetchJson(url: string) {
	const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT) });
	if (!response.ok) throw new Error(`${response.status} ${url}`);
	return response.json();
}

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
		downloads: formatDownloads(downloadStats.downloads ?? 0)
	};
}

/**
 * npm stats for lapikit, cached in memory.
 * Concurrent callers share the same request. When npm cannot be reached, the last known
 * values are returned, or null if there are none yet: stats are decorative, never fail on them.
 */
export async function getNpmStats(): Promise<NpmStats | null> {
	const now = Date.now();
	if (cache && now - cache.at < CACHE_TTL) return cache.data;
	if (now - failedAt < RETRY_DELAY) return cache?.data ?? null;

	inflight ??= collectStats().finally(() => {
		inflight = null;
	});

	try {
		cache = { data: await inflight, at: Date.now() };
	} catch (error) {
		failedAt = Date.now();
		console.warn('[npm] unable to refresh package stats', error);
	}

	return cache?.data ?? null;
}
