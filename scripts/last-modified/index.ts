import { execFileSync } from 'node:child_process';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const content_dirs = ['content/docs', 'content/pages'];
const output_file = join(process.cwd(), 'src', 'lib', 'generated', 'last-modified.json');

const files = (await Promise.all(content_dirs.map(listMarkdown))).flat().sort();

const dates = Object.fromEntries(
	files.flatMap((file) => {
		const date = getLastModified(file);
		return date ? [[file, date]] : [];
	})
);

await mkdir(dirname(output_file), { recursive: true });
await writeFile(output_file, `${JSON.stringify(dates, null, 2)}\n`, 'utf8');

console.log(`Wrote ${Object.keys(dates).length} dates to src/lib/generated/last-modified.json`);

async function listMarkdown(dir: string) {
	const entries = await readdir(join(process.cwd(), dir), { withFileTypes: true, recursive: true });

	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
		.map((entry) =>
			relative(process.cwd(), join(entry.parentPath, entry.name)).replaceAll('\\', '/')
		);
}

// date of the last commit changing the file content, pure renames skipped (sitemap lastmod,
// structured data). Left out when git has no answer: untracked file, or no .git in the build context
function getLastModified(sourcePath: string) {
	try {
		const history = execFileSync(
			'git',
			['log', '--follow', '--format=%x00%cI', '--name-status', '--', sourcePath],
			{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
		);

		const contentChange = history
			.split('\0')
			.map((commit) => commit.trim().split('\n'))
			.find(([date, , status]) => date && !status?.startsWith('R100'));

		return contentChange?.[0];
	} catch {
		return undefined;
	}
}
