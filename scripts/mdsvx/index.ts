import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { readFrontmatter } from './frontmatter.ts';
import { deriveSource } from './source.ts';
import type { FrontmatterData, ManifestEntry } from './types.ts';

const folders = [
	{ dir: 'routes', urlPrefix: '' },
	{ dir: 'content/docs', urlPrefix: '/docs' }
];
const extensionsFile = ['md'];
const routesFile = join(process.cwd(), 'src', 'routes', 'routes.json');
const manifestFile = join(process.cwd(), 'src', 'manifest.json');

const entries = [
	...(await Promise.all(folders.map(collectFolderEntries))).flat(),
	...(await collectManualEntries())
].sort((left, right) => left.path.pathname.localeCompare(right.path.pathname));

assertNoDuplicatePaths(entries);

await writeFile(manifestFile, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');

console.log(`Wrote ${entries.length} entries to src/manifest.json`);

async function collectFolderEntries({ dir, urlPrefix }: { dir: string; urlPrefix: string }) {
	const baseDir = join(process.cwd(), 'src', dir);
	const dirEntries = await readdir(baseDir, { withFileTypes: true, recursive: true });

	const files = dirEntries.filter(
		(entry) => entry.isFile() && extensionsFile.includes(extname(entry.name).slice(1))
	);

	return Promise.all(
		files.map(async (entry): Promise<ManifestEntry> => {
			const filePath = join(entry.parentPath, entry.name);
			const content = await readFile(filePath, 'utf8');
			const frontmatter = readFrontmatter(content);
			const path = deriveSource(filePath, baseDir, urlPrefix);
			const title = asOptionalTitle(frontmatter.title) ?? fallbackTitle(path.slugSegments);

			return { ...frontmatter, title, path };
		})
	);
}

async function collectManualEntries(): Promise<ManifestEntry[]> {
	const content = await readFile(routesFile, 'utf8');
	const routes: Record<string, FrontmatterData> = JSON.parse(content);
	const sourcePath = 'src/routes/routes.json';

	return Object.entries(routes).map(([pathname, frontmatter]) => {
		const slug = pathname === '/' ? '' : pathname.replace(/^\//, '');
		const slugSegments = slug ? slug.split('/') : [];
		const title = requireTitle(frontmatter, `${sourcePath} (${pathname})`);

		return { ...frontmatter, title, path: { sourcePath, slug, slugSegments, pathname } };
	});
}

function asOptionalTitle(value: FrontmatterData['title']) {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function requireTitle(frontmatter: FrontmatterData, source: string) {
	const title = asOptionalTitle(frontmatter.title);

	if (!title) {
		throw new Error(`Missing "title" in frontmatter: ${source}`);
	}

	return title;
}

function fallbackTitle(slugSegments: string[]) {
	const lastSegment = slugSegments.at(-1);

	if (!lastSegment) {
		return 'Documentation';
	}

	return lastSegment
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function assertNoDuplicatePaths(manifestEntries: ManifestEntry[]) {
	const seen = new Set<string>();

	for (const entry of manifestEntries) {
		if (seen.has(entry.path.pathname)) {
			throw new Error(
				`Duplicate path detected in manifest: "${entry.path.pathname}" (${entry.path.sourcePath})`
			);
		}

		seen.add(entry.path.pathname);
	}
}
