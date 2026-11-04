import type { DocSummary } from '$lib/@types';
import { command } from '$lib/constants';
import { siteUrl } from '$lib/utils';

const sources = import.meta.glob('/src/content/docs/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const examples = import.meta.glob('/src/content/examples/**/*.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const SCRIPT_BLOCK = /<script[\s\S]*?<\/script>/g;
const RAW_EXAMPLE_IMPORT = /import\s+(\w+)\s+from\s+['"]\$examples\/([^'"?]+)\?raw['"]/g;
const CODE_SEGMENTS = /(```[\s\S]*?```|`[^`\n]*`)/;
const LAZY_REPL = /<LazyRepl\b((?:[^>{]|\{[^}]*\})*?)(?:\/>|>[\s\S]*?<\/LazyRepl>)/g;
const INLINE_CONTENT = /content=\{(['"`])([\s\S]*?)\1\}/;
const COMMAND_REPL = /<CommandRepl\b[^>]*commandkey="([\w-]+)"[^>]*\/>/g;
const COMPONENT_PAIRED = /<([A-Z]\w*)\b[^>]*>[\s\S]*?<\/\1>/g;
const COMPONENT_SELF_CLOSING = /<[A-Z]\w*\b[^>]*\/>/g;
const ROOT_LINK = /\]\(\//g;
const EXTRA_BLANK_LINES = /\n{3,}/g;

const fence = (code: string, lang = '') => `\`\`\`${lang}\n${code.trim()}\n\`\`\``;

const attribute = (attributes: string, name: string) =>
	attributes
		.match(new RegExp(`${name}=(?:"([^"]*)"|\\{(\\w+)\\})`))
		?.slice(1)
		.find(Boolean);

function collectExampleCode(source: string) {
	const code = new Map<string, string>();
	for (const [, name, path] of source.matchAll(RAW_EXAMPLE_IMPORT)) {
		const example = examples[`/src/content/examples/${path}`];
		if (example) code.set(name, example);
	}
	return code;
}

function transformProse(text: string, exampleCode: Map<string, string>) {
	return text
		.replace(LAZY_REPL, (_, attributes: string) => {
			const code =
				attributes.match(INLINE_CONTENT)?.[2] ??
				exampleCode.get(attribute(attributes, 'content') ?? '');
			return code ? fence(code, attribute(attributes, 'lang') ?? 'svelte') : '';
		})
		.replace(COMMAND_REPL, (_, key: keyof (typeof command)['npm']) =>
			command.npm[key] ? fence(command.npm[key], 'sh') : ''
		)
		.replace(COMPONENT_PAIRED, '')
		.replace(COMPONENT_SELF_CLOSING, '')
		.replace(ROOT_LINK, `](${siteUrl}/`);
}

export function docToMarkdown(doc: DocSummary) {
	const source = (sources[`/${doc.path.sourcePath}`] ?? '').replace(FRONTMATTER, '');
	const exampleCode = collectExampleCode(source);

	const body = source
		.replace(SCRIPT_BLOCK, '')
		.split(CODE_SEGMENTS)
		.map((segment, index) => (index % 2 === 0 ? transformProse(segment, exampleCode) : segment))
		.join('')
		.replace(EXTRA_BLANK_LINES, '\n\n')
		.trim();

	const description = doc.head?.description;
	const header = [
		`# ${doc.title}`,
		description && `> ${description}`,
		`Source: ${siteUrl}${doc.path.pathname}`
	].filter(Boolean);

	return `${header.join('\n\n')}\n\n${body}\n`;
}
