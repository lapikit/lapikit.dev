import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

// Performance budget, checked after `bun run build`.
// If a limit is exceeded on purpose, raise it here. If the site gets lighter, lower it.
const BUDGET = {
	homeJsKb: 175, // JavaScript loaded by the homepage, gzipped (currently ~159 KB)
	clientMb: 3 // everything in build/client, uncompressed (currently ~2.2 MB)
};

const CLIENT_DIR = 'build/client';

// JS files referenced by the prerendered homepage
const homeHtml = readFileSync('build/prerendered/index.html', 'utf8');
const homeJsFiles = new Set(
	[...homeHtml.matchAll(/"\.?\/?(_app\/immutable\/[^"]+\.js)"/g)].map((match) => match[1])
);
const homeJsKb =
	[...homeJsFiles].reduce(
		(total, file) => total + gzipSync(readFileSync(join(CLIENT_DIR, file))).length,
		0
	) / 1024;

// all client assets, ignoring the precompressed .gz/.br copies
function folderSize(dir: string): number {
	return readdirSync(dir, { withFileTypes: true }).reduce((total, entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return total + folderSize(path);
		return /\.(gz|br)$/.test(entry.name) ? total : total + statSync(path).size;
	}, 0);
}
const clientMb = folderSize(CLIENT_DIR) / 1024 / 1024;

const checks = [
	{ label: 'Homepage JS (gzip)', value: homeJsKb, limit: BUDGET.homeJsKb, unit: 'KB' },
	{ label: 'Client build', value: clientMb, limit: BUDGET.clientMb, unit: 'MB' }
];

for (const { label, value, limit, unit } of checks) {
	const status = value <= limit ? 'ok' : 'OVER BUDGET';
	console.log(
		`${status.padEnd(11)} ${label}: ${value.toFixed(1)} ${unit} (limit ${limit} ${unit})`
	);
}

if (checks.some(({ value, limit }) => value > limit)) {
	process.exit(1);
}
