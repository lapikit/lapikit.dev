const fetch_timeout = 5000;

export async function fetchJson(url: string, headers?: HeadersInit) {
	const response = await fetch(url, { headers, signal: AbortSignal.timeout(fetch_timeout) });
	if (!response.ok) throw new Error(`${response.status} ${url}`);
	return response.json();
}

export function formatCount(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}
