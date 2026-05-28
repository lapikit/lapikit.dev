import type { Dirent } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function collectMarkdownFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries
			.filter((entry: Dirent) => !entry.name.startsWith('.'))
			.map(async (entry: Dirent) => {
				const fullPath = join(directory, entry.name);

				if (entry.isDirectory()) {
					return collectMarkdownFiles(fullPath);
				}

				return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
			})
	);

	return files.flat().sort((left: string, right: string) => left.localeCompare(right));
}

export async function readTextFile(filePath: string) {
	return readFile(filePath, 'utf8');
}

export async function writeTextFile(filePath: string, content: string) {
	await writeFile(filePath, content, 'utf8');
}
