import { npm_stats_storage_key } from '$lib/constants';

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

const FIRST_PUBLISH_DATE = '2025-04-19';
// the npm API silently clamps point ranges to 18 months, so the total is summed per year
const DOWNLOADS_WINDOW_DAYS = 365;
const DAY_MS = 24 * 60 * 60 * 1000;

function toIsoDate(timestamp: number) {
	return new Date(timestamp).toISOString().slice(0, 10);
}

function getDownloadRanges(from: string, to: number) {
	const ranges: string[] = [];
	let start = Date.parse(`${from}T00:00:00Z`);

	while (start <= to) {
		const end = Math.min(start + (DOWNLOADS_WINDOW_DAYS - 1) * DAY_MS, to);
		ranges.push(`${toIsoDate(start)}:${toIsoDate(end)}`);
		start = end + DAY_MS;
	}

	return ranges;
}

async function fetchJson(url: string) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${response.status} ${url}`);
	return response.json();
}

function readCache(): NpmCache | null {
	try {
		const raw = localStorage.getItem(npm_stats_storage_key);
		if (!raw) return null;

		const cache: NpmCache = JSON.parse(raw);
		return Date.now() - cache.cachedAt < NPM_CACHE_TTL ? cache : null;
	} catch {
		return null;
	}
}

export async function loadNpmData() {
	const cache = readCache();
	if (cache) {
		npmState.version.latest = cache.version.latest;
		npmState.version.insiders = cache.version.insiders;
		npmState.publish.latest = cache.publish.latest;
		npmState.publish.insiders = cache.publish.insiders;
		npmState.downloads = cache.downloads;
		return;
	}

	try {
		const ranges = getDownloadRanges(FIRST_PUBLISH_DATE, Date.now());
		const [packument, ...downloadPoints] = await Promise.all([
			fetchJson('https://registry.npmjs.org/lapikit'),
			...ranges.map((range) => fetchJson(`https://api.npmjs.org/downloads/point/${range}/lapikit`))
		]);

		const distTagLatest = packument['dist-tags']?.latest;
		const distTagInsider = packument['dist-tags']?.insiders;

		const versionMain = distTagLatest ? `v${distTagLatest}` : '';
		const versionInsider = distTagInsider ? `v${distTagInsider}` : '';
		const totalDownloads = downloadPoints.reduce(
			(total: number, point: { downloads?: number }) => total + (point.downloads ?? 0),
			0
		);
		const downloads = formatDownloads(totalDownloads);

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
	} catch (error) {
		// npm stats are decorative: keep the page working if the registry is unreachable
		console.warn('[npm] unable to load package stats', error);
	}
}
