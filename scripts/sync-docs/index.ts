import { mkdir } from 'node:fs/promises';
import { docsContentDir, docsMetadataFile, generatedDir } from './config.ts';
import { assertNoDuplicateRoutes, compareDocs, createDocsMetadataJson, deriveDoc } from './docs.ts';
import { collectMarkdownFiles, readTextFile, writeTextFile } from './files.ts';
import {
	parseMarkdownFile,
	serializeMarkdownFile,
	stripGeneratedFrontmatter
} from './frontmatter.ts';
import type { DerivedDoc } from './types.ts';

await syncDocs();

async function syncDocs() {
	const docFiles = await collectMarkdownFiles(docsContentDir);
	const derivedDocs: DerivedDoc[] = [];

	for (const filePath of docFiles) {
		derivedDocs.push(await syncDocFile(filePath));
	}

	const sortedDocs = [...derivedDocs].sort(compareDocs);
	assertNoDuplicateRoutes(sortedDocs);

	await mkdir(generatedDir, { recursive: true });
	await writeTextFile(docsMetadataFile, createDocsMetadataJson(sortedDocs));

	console.log(`Synced ${sortedDocs.length} documentation files.`);
}

async function syncDocFile(filePath: string): Promise<DerivedDoc> {
	const rawContent = await readTextFile(filePath);
	const newline = rawContent.includes('\r\n') ? '\r\n' : '\n';
	const { body, frontmatter, hasFrontmatter } = parseMarkdownFile(rawContent);
	const nextFrontmatter = stripGeneratedFrontmatter(frontmatter);
	const derivedDoc = deriveDoc(filePath, nextFrontmatter);
	const nextContent = serializeMarkdownFile(nextFrontmatter, body, newline, hasFrontmatter);

	if (nextContent !== rawContent) {
		await writeTextFile(filePath, nextContent);
	}

	return derivedDoc;
}
