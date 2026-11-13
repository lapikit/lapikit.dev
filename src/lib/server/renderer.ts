import { Marked, type Token, type Tokens, type TokensList } from 'marked';
import retext from 'retext';
import smartypants from 'retext-smartypants';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prism-svelte';
import type { DocBlock, MarkdownHeading, RenderedDoc } from '$lib/@types';
import { slugify } from '$lib/utils/slugify.js';

const frontmatter_block = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const absolute_url = /^[a-z][a-z\d+\-.]*:/i;
const union_separator = / \\\| | \| /;

const typography = retext().use(smartypants);

const html_entities: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'"
};

const escapeHtml = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const decodeHtml = (value: string) =>
	value.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => html_entities[entity]);

const stripTags = (html: string) => html.replace(/<[^>]*>/g, '');

const smarten = (text: string) => typography.processSync(text).toString();

const isLiteral = (value: string) => /^['"]/.test(value) || /^\d/.test(value);

function enumChip(literals: string[]) {
	const label = `enum: ${literals.join(', ')}`;
	const values = literals.map((value) => `<code>${escapeHtml(value)}</code>`).join('');

	return (
		`<span class="enum-chip" data-values="${escapeHtml(JSON.stringify(literals))}">` +
		`<span class="enum-chip__trigger" tabindex="0" role="button" aria-haspopup="true" aria-label="${escapeHtml(label)}">` +
		`enum<span class="enum-chip__count" aria-hidden="true">${literals.length}</span></span>` +
		`<span class="enum-chip__popover" role="tooltip">${values}</span></span>`
	);
}

function unionCode(code: string) {
	const values = decodeHtml(code)
		.split(union_separator)
		.map((value) => value.trim())
		.filter(Boolean);

	const literals = values.filter(isLiteral);
	const types = values.filter((value) => !isLiteral(value));

	if (values.length < 2 || literals.length === 0) return `<code>${code}</code>`;
	if (types.length === 0) return enumChip(literals);

	const separator = '<span class="type-sep" aria-hidden="true"> | </span>';
	const typeCodes = types.map((type) => `<code>${escapeHtml(type)}</code>`).join(separator);

	return `<span class="type-union">${typeCodes}${separator}${enumChip(literals)}</span>`;
}

const enhanceTableCell = (html: string) =>
	html.replace(/<code>([^<]*)<\/code>/g, (match, code: string) =>
		union_separator.test(decodeHtml(code)) ? unionCode(code) : match
	);

function smartenTokens(token: Token) {
	if (token.type !== 'text' || ('tokens' in token && token.tokens)) return;

	const text = token as Tokens.Text;
	text.text = text.escaped ? escapeHtml(smarten(decodeHtml(text.text))) : smarten(text.text);
}

function createMarked(summary: MarkdownHeading[]) {
	const slugCounts = new Map<string, number>();

	const uniqueSlug = (value: string) => {
		const base = slugify(value) || 'section';
		const count = (slugCounts.get(base) ?? 0) + 1;
		slugCounts.set(base, count);
		return count === 1 ? base : `${base}-${count}`;
	};

	return new Marked({
		gfm: true,
		renderer: {
			heading({ tokens, depth }) {
				const html = this.parser.parseInline(tokens);
				const value = decodeHtml(stripTags(html)).trim();
				const slug = uniqueSlug(value);

				if (depth <= 3) summary.push({ depth: depth as 1 | 2 | 3, slug, value });

				return `<h${depth} id="${slug}">${html}</h${depth}>\n`;
			},
			code({ text, lang }) {
				const language = lang?.split(/\s/)[0] || 'text';
				const grammar = Prism.languages[language];
				const highlighted = grammar ? Prism.highlight(text, grammar, language) : escapeHtml(text);

				return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>\n`;
			},
			link({ href, title, tokens }) {
				const text = this.parser.parseInline(tokens);
				const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
				const rel = absolute_url.test(href) ? ' rel="nofollow"' : '';

				return `<a href="${escapeHtml(href)}"${titleAttribute}${rel}>${text}</a>`;
			},
			tablecell(token) {
				const content = enhanceTableCell(this.parser.parseInline(token.tokens));
				const tag = token.header ? 'th' : 'td';
				const align = token.align ? ` align="${token.align}"` : '';

				return `<${tag}${align}>${content}</${tag}>\n`;
			}
		}
	});
}

export function renderMarkdown(source: string): RenderedDoc {
	const summary: MarkdownHeading[] = [];
	const marked = createMarked(summary);
	const tokens = marked.lexer(source.replace(frontmatter_block, ''));

	const blocks: DocBlock[] = [];
	let pending: Token[] = [];

	const parse = (list: Token[]) =>
		marked.parser(Object.assign(list, { links: tokens.links }) as TokensList);

	const flush = () => {
		if (pending.length) blocks.push({ type: 'html', html: parse(pending) });
		pending = [];
	};

	marked.walkTokens(tokens, smartenTokens);

	for (const token of tokens) {
		if (token.type === 'blockquote') {
			flush();
			blocks.push({ type: 'callout', html: parse((token as Tokens.Blockquote).tokens) });
		} else {
			pending.push(token);
		}
	}

	flush();

	return { blocks, summary };
}
