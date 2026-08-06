import { error } from '@sveltejs/kit';

// types
import type { DocComponent, DocEntry, DocSummary } from './@types';

// datas
import manifest from '../manifest.json';

export function createRegistry(docsList: DocSummary[], modules: Record<string, DocComponent>) {
	const paths: string[] = [];
	const byPath = new Map<string, DocEntry>();
	const entries: DocEntry[] = [];

	for (const doc of docsList) {
		const component = modules[`/${doc.path.sourcePath}`];
		if (!component) throw error(500, `Missing compiled module for: ${doc.path.sourcePath}`);

		const entry: DocEntry = { ...doc, component };
		paths.push(doc.path.pathname);
		byPath.set(doc.path.pathname, entry);
		entries.push(entry);
	}

	const bySlug = new Map(entries.map((entry) => [entry.path.slug, entry] as const));

	return { paths, byPath, entries, bySlug };
}

/**
 * Documentation registry creator
 * This module provides a utility function `createRegistry` to build a registry of documentation pages.
 */

const docModules = import.meta.glob('/src/content/docs/**/*.md', {
	eager: true,
	import: 'default'
}) as Record<string, DocComponent>;

export const docsMetadata: DocSummary[] = (manifest as DocSummary[]).filter((doc) =>
	doc.path.sourcePath.startsWith('src/content/docs/')
);

const { paths, byPath, entries, bySlug } = createRegistry(docsMetadata, docModules);

export const docsPaths = paths;
export const docsByPath = byPath;
export const docs = entries;
export const docsBySlug = bySlug;
