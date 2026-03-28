// node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import remarkHeadings from './scripts/remark/remark-headings.js';

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkHeadings],
	layout: {
		_: dirname(fileURLToPath(import.meta.url)) + '/src/lib/templates/page.svelte',
		docs: dirname(fileURLToPath(import.meta.url)) + '/src/lib/templates/doc.svelte'
	}
};
