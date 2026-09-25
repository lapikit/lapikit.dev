import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { NpmStats } from '$lib/@types';

export const prerender = false;

const CACHE_TTL = 15 * 60 * 1000;
const FIRST_PUBLISH_DATE = '2025-04-19';
const DOWNLOADS_WINDOW_DAYS = 365;
const DAY_MS = 24 * 60 * 60 * 1000;

let cache: { data: NpmStats; at: number } | null = null;

function formatDownloads(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

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

async function collectStats(): Promise<NpmStats> {
	const ranges = getDownloadRanges(FIRST_PUBLISH_DATE, Date.now());
	const [packument, ...downloadPoints] = await Promise.all([
		fetchJson('https://registry.npmjs.org/lapikit'),
		...ranges.map((range) => fetchJson(`https://api.npmjs.org/downloads/point/${range}/lapikit`))
	]);

	const distTagLatest = packument['dist-tags']?.latest;
	const distTagInsider = packument['dist-tags']?.insiders;

	const totalDownloads = downloadPoints.reduce(
		(total: number, point: { downloads?: number }) => total + (point.downloads ?? 0),
		0
	);

	return {
		version: {
			latest: distTagLatest ? `v${distTagLatest}` : '',
			insiders: distTagInsider ? `v${distTagInsider}` : ''
		},
		publish: {
			latest: packument.time?.[distTagLatest] ?? '',
			insiders: packument.time?.[distTagInsider] ?? ''
		},
		downloads: formatDownloads(totalDownloads)
	};
}

export const GET: RequestHandler = async ({ setHeaders }) => {
	if (!cache || Date.now() - cache.at > CACHE_TTL) {
		try {
			cache = { data: await collectStats(), at: Date.now() };
		} catch (error) {
			// npm stats are decorative: serve the last known values rather than failing the page
			console.warn('[npm] unable to refresh package stats', error);
			if (!cache) {
				return json(
					{
						version: { latest: '', insiders: '' },
						publish: { latest: '', insiders: '' },
						downloads: ''
					} satisfies NpmStats,
					{ headers: { 'cache-control': 'no-store' } }
				);
			}
		}
	}

	setHeaders({ 'cache-control': `public, max-age=${CACHE_TTL / 1000}` });
	return json(cache.data);
};
