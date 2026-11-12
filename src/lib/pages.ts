import type { DocContent, DocModule, DocSummary } from './@types';
import manifest from '$lib/generated/manifest.json';

const docModules = import.meta.glob<DocModule>('/src/content/docs/**/*.md');

export const pages = manifest as DocSummary[];
export const pagesByPath = new Map(pages.map((page) => [page.path.pathname, page] as const));

export const docs = pages.filter((page) => page.path.sourcePath.startsWith('src/content/docs/'));
export const docsByPath = new Map(docs.map((doc) => [doc.path.pathname, doc] as const));
export const docsBySlug = new Map(docs.map((doc) => [doc.path.slug, doc] as const));

export async function loadDocContent(doc: DocSummary): Promise<DocContent> {
	const loader = docModules[`/${doc.path.sourcePath}`];
	if (!loader) throw new Error(`Missing compiled module for: ${doc.path.sourcePath}`);

	const module = await loader();

	return { component: module.default, summary: module.metadata?.summary ?? [] };
}
