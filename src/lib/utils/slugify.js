/**
 * Single slug implementation, shared by the Svelte templates and the build scripts
 * @param {string} value
 */
export function slugify(value) {
	return value
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
