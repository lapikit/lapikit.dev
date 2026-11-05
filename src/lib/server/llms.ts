import type { DocSummary } from '$lib/@types';
import { docs, docsByPath } from '$lib/markdown';
import { docsNavigation } from '$lib/router';
import { siteUrl } from '$lib/utils';
import { docToMarkdown } from './doc-markdown';

const DEPRECATED = 'Deprecated';

const intro = [
	'# Lapikit',
	'',
	'> Lapikit is a Svelte 5 component library. Components are accessible, themeable and written with a zero-import `<kit:*>` syntax that the Lili preprocessor compiles to regular Svelte components at build time.',
	'',
	'Key facts for writing Lapikit code:',
	'',
	'- Install with `npm install -D lapikit`, then add `lapikitPreprocess()` (from `lapikit/preprocess`) to the `preprocess` array of `svelte.config.js`.',
	'- Use components as `<kit:btn>`, `<kit:card>`, `<kit:accordion>`… without importing them.',
	'- Hooks and actions come from `lapikit/actions`, component types from `lapikit/components`.',
	'- Theming relies on CSS custom properties (`--kit-*`) and the `data-kit-theme` attribute.',
	'- The `class:` and `style:` directives work on any `<kit:*>` tag, like on native elements. Without the preprocessor, use the `s-class` and `s-style` props.'
].join('\n');

const markdownUrl = (doc: DocSummary) => `${siteUrl}${doc.path.pathname}.md`;

function entry(doc: DocSummary) {
	const description = doc.head?.description;
	return `- [${doc.title}](${markdownUrl(doc)})${description ? `: ${description}` : ''}`;
}

function groupDocs() {
	const listed = new Set<string>();

	const sections = docsNavigation
		.filter(({ label }) => label !== DEPRECATED)
		.map(({ label, pages }) => {
			const sectionDocs = pages
				.map(({ url }) => docsByPath.get(url))
				.filter((doc): doc is DocSummary => !!doc);
			sectionDocs.forEach((doc) => listed.add(doc.path.pathname));
			return { label, docs: sectionDocs };
		})
		.filter((section) => section.docs.length > 0);

	const optional = docs.filter((doc) => !listed.has(doc.path.pathname));

	return [...sections, { label: 'Optional', docs: optional }];
}

export function llmsIndex() {
	const sections = groupDocs().map(
		({ label, docs: sectionDocs }) => `## ${label}\n\n${sectionDocs.map(entry).join('\n')}`
	);

	return `${intro}\n\n${sections.join('\n\n')}\n`;
}

export function llmsFull() {
	const pages = groupDocs()
		.filter(({ label }) => label !== 'Optional')
		.flatMap(({ docs: sectionDocs }) => sectionDocs)
		.map(docToMarkdown);

	return `${intro}\n\n${pages.join('\n---\n\n')}`;
}
