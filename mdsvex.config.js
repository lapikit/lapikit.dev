// node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import remarkHeadings from './scripts/mdsvex/remark-headings.js';
import rehypeEnumChip from './scripts/mdsvex/rehype-enum-chip.js';

// prism
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prism-svelte';

/**
 * @param {string} code
 * @param {string | undefined} lang
 */
function highlighter(code, lang) {
	const grammar = lang && Prism.languages[lang];
	const highlighted = (grammar ? Prism.highlight(code, grammar, lang) : code)
		.replace(/\{/g, '&#123;')
		.replace(/\}/g, '&#125;');
	return `<pre class="language-${lang ?? 'text'}"><code class="language-${lang ?? 'text'}">${highlighted}</code></pre>`;
}

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	remarkPlugins: [remarkHeadings],
	rehypePlugins: [rehypeEnumChip],
	highlight: { highlighter },
	layout: dirname(fileURLToPath(import.meta.url)) + '/src/lib/components/markdown/layout.svelte'
};
