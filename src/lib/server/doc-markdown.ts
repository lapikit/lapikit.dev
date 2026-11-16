import type { DocSummary } from '$lib/types';
import { command } from '$lib/constants';
import { siteUrl } from '$lib/utils';
import { exampleCode, parseFence, type DocFence } from './doc-fences';

const sources = import.meta.glob('/content/docs/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const assets = import.meta.glob<string>('/content/docs/**/+assets/*', {
	eager: true,
	import: 'default'
});

const frontmatter = /^---\n[\s\S]*?\n---\n/;
const code_segments = /(```[\s\S]*?```|`[^`\n]*`)/;
const fence_block = /^```([^\n]*)\n([\s\S]*?)\n?```$/;
const root_link = /\]\(\//g;
const extra_blank_lines = /\n{3,}/g;

const fence = (code: string, lang = '') => `\`\`\`${lang}\n${code.trim()}\n\`\`\``;

function fenceToMarkdown(docFence: DocFence) {
	switch (docFence.kind) {
		case 'repl': {
			if (docFence.files.length) return '';
			const code = docFence.source ? exampleCode(docFence.source) : docFence.code;
			return code ? fence(code, docFence.lang ?? 'svelte') : '';
		}
		case 'command':
			return docFence.selected
				? ''
				: fence(command.npm[docFence.key as keyof (typeof command)['npm']], 'sh');
		default:
			return '';
	}
}

function transformCode(segment: string) {
	const match = segment.match(fence_block);
	const docFence = match ? parseFence(match[1], match[2]) : null;
	return docFence ? fenceToMarkdown(docFence) : segment;
}

function transformProse(text: string, folder: string) {
	return text
		.replace(/(["(])\+assets\/([^"')\s]+)/g, (_, prefix: string, name: string) => {
			const url = assets[`/${folder}/+assets/${name}`];
			return `${prefix}${url?.startsWith('/') ? siteUrl : ''}${url ?? `+assets/${name}`}`;
		})
		.replace(root_link, `](${siteUrl}/`);
}

export function docToMarkdown(doc: DocSummary) {
	const sourcePath = doc.path.sourcePath;
	const folder = sourcePath.slice(0, sourcePath.lastIndexOf('/'));
	const source = (sources[`/${sourcePath}`] ?? '').replace(frontmatter, '');

	const body = source
		.split(code_segments)
		.map((segment, index) =>
			index % 2 === 0 ? transformProse(segment, folder) : transformCode(segment)
		)
		.join('')
		.replace(extra_blank_lines, '\n\n')
		.trim();

	const description = doc.head?.description;
	const header = [
		`# ${doc.title}`,
		description && `> ${description}`,
		`Source: ${siteUrl}${doc.path.pathname}`
	].filter(Boolean);

	return `${header.join('\n\n')}\n\n${body}\n`;
}
