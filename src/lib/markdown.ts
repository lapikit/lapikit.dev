import { error } from '@sveltejs/kit';

// types
import type {
	ContentEntry,
	ContentSummary,
	DocComponent,
	DocSummary,
	MarkdownComponent,
	SeoEntry
} from './@types';

// datas
import docsMetadataJson from '../pages.docs.json';

export function createRegistry<T extends ContentSummary>(
	metadata: T[],
	modules: Record<string, MarkdownComponent>,
	buildSeo: (doc: T) => SeoEntry = defaultSeoBuilder
) {
	const paths: string[] = [];
	const byPath = new Map<string, T>();
	const seoByPath: Record<string, SeoEntry> = {};
	const entries: ContentEntry<T>[] = [];

	for (const doc of metadata) {
		paths.push(doc.path);
		byPath.set(doc.path, doc);
		seoByPath[doc.path] = buildSeo(doc);

		const component = modules[`/${doc.sourcePath}`];
		if (!component) throw error(500, `Missing compiled module for: ${doc.sourcePath}`);
		entries.push({ ...doc, component });
	}

	const bySlug = new Map(entries.map((entry) => [entry.slug, entry] as const));

	return { paths, byPath, seoByPath, entries, bySlug };
}

function defaultSeoBuilder<T extends ContentSummary>(doc: T): SeoEntry {
	const head = getDocHead(doc.metadata);
	const title = asOptionalString(head?.title) ?? doc.metadata.title;
	const description = asOptionalString(head?.description) ?? `Read ${doc.metadata.title}.`;

	return { head: { title, description }, type: 'article' };
}

function getDocHead(metadata: ContentSummary['metadata']) {
	const head = metadata.head;
	return typeof head === 'object' && head !== null && !Array.isArray(head)
		? (head as Record<string, unknown>)
		: undefined;
}

function asOptionalString(value: unknown): string | undefined {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

/**
 * Documentation registry creator
 * This module provides a utility function `createRegistry` to build a registry of documentation pages.
 */

const docModules = import.meta.glob('/src/content/docs/**/*.md', {
	eager: true,
	import: 'default'
}) as Record<string, DocComponent>;

export const docsMetadata: DocSummary[] = docsMetadataJson as DocSummary[];

const { paths, byPath, seoByPath, entries, bySlug } = createRegistry(docsMetadata, docModules, (doc) => {
	const head = getDocHead(doc.metadata);
	const title = asOptionalString(head?.title) ?? doc.metadata.title;
	const description =
		asOptionalString(head?.description) ?? `Read ${doc.metadata.title} in the Lapikit documentation.`;

	return { head: { title, description }, type: 'article' };
});

export const docsPaths = paths;
export const docsByPath = byPath;
export const docsSeoByPath = seoByPath;
export const docs = entries;
export const docsBySlug = bySlug;
