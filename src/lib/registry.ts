import { error } from '@sveltejs/kit';
import docsMetadataJson from '../pages.docs.json';
import type { DocComponent, DocEntry, DocSeoEntry, DocSummary } from '$lib/@types';

const docModules = import.meta.glob('/src/content/docs/**/*.md', {
	eager: true,
	import: 'default'
}) as Record<string, DocComponent>;

export const docsMetadata: DocSummary[] = docsMetadataJson as DocSummary[];

export const docsPaths = docsMetadata.map((doc) => doc.path);

export const docsByPath = new Map(docsMetadata.map((doc) => [doc.path, doc] as const));

export const docMetadataBySlug = new Map(docsMetadata.map((doc) => [doc.slug, doc] as const));

export const docsSeoByPath = Object.fromEntries(
	docsMetadata.map((doc) => [
		doc.path,
		{
			title: doc.title,
			description: doc.description ?? `Read ${doc.title} in the Lapikit documentation.`,
			type: 'article'
		} satisfies DocSeoEntry
	])
) as Record<string, DocSeoEntry>;

export const docs: DocEntry[] = docsMetadata.map((doc) => {
	const component = docModules[`/${doc.sourcePath}`];

	if (!component) {
		throw error(500, `Missing compiled module for documentation source: ${doc.sourcePath}`);
	}

	return {
		...doc,
		component
	};
});

export const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc] as const));
