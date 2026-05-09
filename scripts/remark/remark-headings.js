/** @typedef {import('$lib/@types').MarkdownHeading} MarkdownHeading */
/**
 * @typedef {{
 *   type?: string;
 *   depth?: number;
 *   value?: string;
 *   children?: MarkdownNode[];
 *   data?: {
 *     hProperties?: Record<string, string>;
 *   };
 * }} MarkdownNode
 */
/**
 * @typedef {{
 *   data: {
 *     fm?: Record<string, unknown>;
 *   };
 * }} MarkdownFile
 */

function remarkHeadings() {
	/** @param {MarkdownNode} tree @param {MarkdownFile} file */
	return (tree, file) => {
		/** @type {Map<string, number>} */
		const slugCounts = new Map();
		/** @type {MarkdownHeading[]} */
		const summary = [];

		/** @param {MarkdownNode} node */
		walk(tree, (node) => {
			if (node.type !== 'heading' || typeof node.depth !== 'number') {
				return;
			}

			const value = toPlainText(node).trim();

			if (!value) {
				return;
			}

			const slug = createUniqueSlug(value, slugCounts);
			const data = node.data ?? (node.data = {});
			const hProperties = data.hProperties ?? (data.hProperties = {});

			hProperties.id = slug;

			if (node.depth <= 3) {
				summary.push({
					depth: /** @type {1 | 2 | 3} */ (node.depth),
					slug,
					value
				});
			}
		});

		const metadata = isObject(file.data.fm) ? file.data.fm : {};
		metadata.summary = summary;
		file.data.fm = metadata;
	};
}

/** @param {MarkdownNode} node @param {(node: MarkdownNode) => void} visitor */
function walk(node, visitor) {
	visitor(node);

	if (!Array.isArray(node.children)) {
		return;
	}

	for (const child of node.children) {
		walk(child, visitor);
	}
}

/** @param {MarkdownNode} node @returns {string} */
function toPlainText(node) {
	if (typeof node.value === 'string') {
		return decodeHtmlEntities(node.value);
	}

	if (!Array.isArray(node.children)) {
		return '';
	}

	return node.children.map(toPlainText).join('');
}

/** @param {string} str */
function decodeHtmlEntities(str) {
	return str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

/** @param {string} value @param {Map<string, number>} slugCounts */
function createUniqueSlug(value, slugCounts) {
	const baseSlug = slugify(value) || 'section';
	const count = (slugCounts.get(baseSlug) ?? 0) + 1;

	slugCounts.set(baseSlug, count);

	return count === 1 ? baseSlug : `${baseSlug}-${count}`;
}

/** @param {string} value */
function slugify(value) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** @param {unknown} value */
function isObject(value) {
	return typeof value === 'object' && value !== null;
}

export default remarkHeadings;
