import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../../src/lib/utils/slugify.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const TEMP_DIR = join(ROOT, '.tmp-changelog');
const REPO_URL = 'https://github.com/lapikit/lapikit';
const FALLBACK_BRANCH = 'develop';

const LINKS: Record<string, string> = {
	'CHANGELOG.md': '/docs/changelog'
	// 'CONTRIBUTING.md': '/docs/contributing',
	// 'CODE_OF_CONDUCT.md': '/docs/code-of-conduct'
};

type SyncSource = {
	file: string;
	target: string;
	placeholder: string;
};

const SOURCES: SyncSource[] = [
	{
		file: 'CHANGELOG.md',
		target: 'src/content/docs/changelog.md',
		placeholder: '<p>Changelog Content</p>'
	}
	// {
	// 	file: 'CONTRIBUTING.md',
	// 	target: 'src/content/docs/contributing.md',
	// 	placeholder: '<p>Contributing Content</p>'
	// },
	// {
	// 	file: 'CODE_OF_CONDUCT.md',
	// 	target: 'src/content/docs/code-of-conduct.md',
	// 	placeholder: '<p>Code of Conduct Content</p>'
	// }
];

function git(args: string): string {
	return execSync(`git ${args}`, { cwd: TEMP_DIR, stdio: 'pipe', encoding: 'utf-8' });
}

let fallbackFetched = false;

function readFromRepository(file: string): string {
	try {
		return git(`show HEAD:${file}`);
	} catch {
		if (!fallbackFetched) {
			git(`fetch --depth 1 --quiet origin ${FALLBACK_BRANCH}`);
			fallbackFetched = true;
		}
		console.warn(`[sync-changelog] ${file} not found on main, using ${FALLBACK_BRANCH}.`);
		return git(`show FETCH_HEAD:${file}`);
	}
}

// in-page anchors written by hand upstream often skip the heading numbering
// ("#reporting-bugs" for "## 3. Reporting Bugs"): map them to the real heading ids,
// otherwise the prerender fails on the missing id
function fixAnchors(markdown: string): string {
	const ids = new Set<string>();
	const aliases = new Map<string, string>();

	for (const [, title] of markdown.matchAll(/^#{1,6} +(.+)$/gm)) {
		const id = slugify(title);
		ids.add(id);
		aliases.set(slugify(title.replace(/^\d+(\.\d+)*\.?\s+/, '')), id);
	}

	return markdown.replace(/\[([^\]]*)\]\(#([^)]+)\)/g, (match, text: string, anchor: string) => {
		if (ids.has(anchor)) return match;
		const id = aliases.get(anchor);
		return id ? `[${text}](#${id})` : text;
	});
}

// the doc page already renders the title and its own table of contents
function toDocContent(markdown: string): string {
	const content = markdown
		.replace(/^\s*# .*\n/, '')
		.replace(/^## Table of Contents\n[\s\S]*?(?=^## )/m, '')
		.replace(/\]\(\.?\/?([A-Z_]+\.md)(#[^)]*)?\)/g, (match, file: string, hash = '') =>
			LINKS[file] ? `](${LINKS[file]}${hash})` : match
		)
		.trim();

	return fixAnchors(content);
}

function syncSource({ file, target, placeholder }: SyncSource) {
	try {
		const targetPath = join(ROOT, target);
		const current = readFileSync(targetPath, 'utf-8');

		if (!current.includes(placeholder)) {
			console.warn(`[sync-changelog] Placeholder not found in ${target} — skipping replacement.`);
			return;
		}

		const content = toDocContent(readFromRepository(file));
		writeFileSync(
			targetPath,
			current.replace(placeholder, () => content),
			'utf-8'
		);
		console.log(`[sync-changelog] ${file} synced successfully.`);
	} catch (error) {
		console.error(
			`[sync-changelog] Failed to sync ${file}:`,
			error instanceof Error ? error.message : String(error)
		);
	}
}

async function syncChangelog() {
	try {
		if (existsSync(TEMP_DIR)) {
			rmSync(TEMP_DIR, { recursive: true, force: true });
		}

		mkdirSync(TEMP_DIR, { recursive: true });

		execSync(`git clone --depth 1 --quiet ${REPO_URL} ${TEMP_DIR}`, { stdio: 'pipe' });

		for (const source of SOURCES) {
			syncSource(source);
		}
	} catch (error) {
		console.error(
			'[sync-changelog] Failed to sync changelog:',
			error instanceof Error ? error.message : String(error)
		);
	} finally {
		if (existsSync(TEMP_DIR)) {
			rmSync(TEMP_DIR, { recursive: true, force: true });
		}
	}
}

await syncChangelog();
