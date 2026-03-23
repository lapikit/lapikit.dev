// node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: dirname(fileURLToPath(import.meta.url)) + '/src/lib/templates/page.svelte'
	}
};
