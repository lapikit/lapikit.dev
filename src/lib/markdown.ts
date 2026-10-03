// types
import type { DocComponent, DocSummary } from './@types';

// datas
import manifest from '../manifest.json';

/**
 * Documentation registry
 * Metadata comes from the generated manifest, compiled pages are loaded lazily
 * so that importing this module never pulls every documentation page into the bundle.
 */

const docModules = import.meta.glob('/src/content/docs/**/*.md', {
	import: 'default'
}) as Record<string, () => Promise<DocComponent>>;

export const docsMetadata: DocSummary[] = (manifest as DocSummary[]).filter((doc) =>
	doc.path.sourcePath.startsWith('src/content/docs/')
);

export const docs = docsMetadata;
export const docsPaths = docsMetadata.map((doc) => doc.path.pathname);
export const docsByPath = new Map(docsMetadata.map((doc) => [doc.path.pathname, doc] as const));
export const docsBySlug = new Map(docsMetadata.map((doc) => [doc.path.slug, doc] as const));

export function loadDocComponent(doc: DocSummary): Promise<DocComponent> {
	const loader = docModules[`/${doc.path.sourcePath}`];
	if (!loader) throw new Error(`Missing compiled module for: ${doc.path.sourcePath}`);

	return loader();
}
