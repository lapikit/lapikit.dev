import type { DocSummary } from '$lib/@types';
import { command } from '$lib/constants';
import { siteUrl } from '$lib/utils';

const sources = import.meta.glob('/content/docs/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const examples = import.meta.glob('/content/examples/**/*.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const frontmatter = /^---\n[\s\S]*?\n---\n/;
const script_block = /<script[\s\S]*?<\/script>/g;
const raw_example_import = /import\s+(\w+)\s+from\s+['"]\$examples\/([^'"?]+)\?raw['"]/g;
const code_segments = /(```[\s\S]*?```|`[^`\n]*`)/;
const lazy_repl = /<LazyRepl\b((?:[^>{]|\{[^}]*\})*?)(?:\/>|>[\s\S]*?<\/LazyRepl>)/g;
const inline_content = /content=\{(['"`])([\s\S]*?)\1\}/;
const command_repl = /<CommandRepl\b[^>]*commandkey="([\w-]+)"[^>]*\/>/g;
const component_paired = /<([A-Z]\w*)\b[^>]*>[\s\S]*?<\/\1>/g;
const component_self_closing = /<[A-Z]\w*\b[^>]*\/>/g;
const root_link = /\]\(\//g;
const extra_blank_lines = /\n{3,}/g;

const fence = (code: string, lang = '') => `\`\`\`${lang}\n${code.trim()}\n\`\`\``;

const attribute = (attributes: string, name: string) =>
	attributes
		.match(new RegExp(`${name}=(?:"([^"]*)"|\\{(\\w+)\\})`))
		?.slice(1)
		.find(Boolean);

function collectExampleCode(source: string) {
	const code = new Map<string, string>();
	for (const [, name, path] of source.matchAll(raw_example_import)) {
		const example = examples[`/content/examples/${path}`];
		if (example) code.set(name, example);
	}
	return code;
}

function transformProse(text: string, exampleCode: Map<string, string>) {
	return text
		.replace(lazy_repl, (_, attributes: string) => {
			const code =
				attributes.match(inline_content)?.[2] ??
				exampleCode.get(attribute(attributes, 'content') ?? '');
			return code ? fence(code, attribute(attributes, 'lang') ?? 'svelte') : '';
		})
		.replace(command_repl, (_, key: keyof (typeof command)['npm']) =>
			command.npm[key] ? fence(command.npm[key], 'sh') : ''
		)
		.replace(component_paired, '')
		.replace(component_self_closing, '')
		.replace(root_link, `](${siteUrl}/`);
}

export function docToMarkdown(doc: DocSummary) {
	const source = (sources[`/${doc.path.sourcePath}`] ?? '').replace(frontmatter, '');
	const exampleCode = collectExampleCode(source);

	const body = source
		.replace(script_block, '')
		.split(code_segments)
		.map((segment, index) => (index % 2 === 0 ? transformProse(segment, exampleCode) : segment))
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
