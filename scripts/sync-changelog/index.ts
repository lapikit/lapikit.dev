import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const TEMP_DIR = join(ROOT, '.tmp-changelog');
const REPO_URL = 'https://github.com/lapikit/lapikit';
const CHANGELOG_TARGET = join(ROOT, 'src/content/docs/99-changelog.md');
const PLACEHOLDER = '<p>Changelog Content</p>';

async function syncChangelog() {
	try {
		if (existsSync(TEMP_DIR)) {
			rmSync(TEMP_DIR, { recursive: true, force: true });
		}

		mkdirSync(TEMP_DIR, { recursive: true });

		execSync(`git clone --depth 1 --quiet ${REPO_URL} ${TEMP_DIR}`, { stdio: 'pipe' });

		const changelogPath = join(TEMP_DIR, 'CHANGELOG.md');
		if (!existsSync(changelogPath)) {
			throw new Error('CHANGELOG.md not found in the cloned repository.');
		}

		const changelog = readFileSync(changelogPath, 'utf-8');
		const target = readFileSync(CHANGELOG_TARGET, 'utf-8');

		if (!target.includes(PLACEHOLDER)) {
			console.warn('[sync-changelog] Placeholder not found in target file — skipping replacement.');
		} else {
			writeFileSync(CHANGELOG_TARGET, target.replace(PLACEHOLDER, changelog), 'utf-8');
			console.log('[sync-changelog] Changelog synced successfully.');
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
