const CACHE_TTL = 15 * 60 * 1000;
const RETRY_DELAY = 60 * 1000;
const FETCH_TIMEOUT = 5000;

export async function fetchJson(url: string, headers?: HeadersInit) {
	const response = await fetch(url, { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT) });
	if (!response.ok) throw new Error(`${response.status} ${url}`);
	return response.json();
}

export function formatCount(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

/**
 * Wraps a remote source in an in-memory cache.
 * Concurrent callers share the same request. When the source cannot be reached, the last known
 * value is returned, or null if there is none yet: these stats are decorative, never fail on them.
 */
export function createCachedSource<T>(label: string, load: () => Promise<T>) {
	let cache: { data: T; at: number } | null = null;
	let inflight: Promise<T> | null = null;
	let failedAt = 0;

	return async function get(): Promise<T | null> {
		const now = Date.now();
		if (cache && now - cache.at < CACHE_TTL) return cache.data;
		if (now - failedAt < RETRY_DELAY) return cache?.data ?? null;

		inflight ??= load().finally(() => {
			inflight = null;
		});

		try {
			cache = { data: await inflight, at: Date.now() };
		} catch (error) {
			failedAt = Date.now();
			console.warn(`[${label}] unable to refresh stats`, error);
		}

		return cache?.data ?? null;
	};
}
