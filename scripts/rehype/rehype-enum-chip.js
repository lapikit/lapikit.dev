/**
 * Rehype plugin – transforms union-type `<code>` cells in tables.
 *
 * - All literals ('...', numbers): <span class="enum-chip" data-values="[...]">
 * - Mixed (types + literals):     <span class="type-union"><code>type</code> | <enum-chip></span>
 * - All types (string | null):    left untouched
 *
 * The `.enum-chip[data-values]` element is hydrated client-side by EnumChip.svelte.
 * The SSR fallback (trigger + popover) remains for SEO and no-JS users.
 */

function rehypeEnumChip() {
	/** @param {HastNode} tree */
	return (tree) => {
		/** @type {Array<{node: HastElement, values: string[]}>} */
		const targets = [];

		walk(tree, (node, parent) => {
			if (node.type !== 'element' || node.tagName !== 'code') return;
			if (!parent || !['td', 'th'].includes(parent.tagName)) return;

			const text = getTextContent(node);
			const hasUnion = text.includes(' \\| ') || text.includes(' | ');
			if (!hasUnion) return;

			const values = text
				.split(/ \\\| | \| /)
				.map((v) => v.trim())
				.filter(Boolean);

			if (values.length < 2) return;

			targets.push({ node, values });
		});

		// Second pass: strip residual \| from text nodes in all table cells
		// (affects untransformed cells like `string \| null` where no literals exist)
		walk(tree, (node) => {
			if (node.type !== 'element' || !['td', 'th'].includes(node.tagName)) return;
			stripEscapedPipes(node);
		});

		for (const { node, values } of targets) {
			const literals = values.filter(isLiteral);
			const types = values.filter((v) => !isLiteral(v));

			if (literals.length === 0) continue;

			if (types.length === 0) {
				// All literals → simple enum chip
				node.tagName = 'span';
				node.properties = { class: 'enum-chip', 'data-values': jsonAttr(literals) };
				node.children = buildChipContent(literals);
			} else {
				// Mixed → type-union wrapper: <code>type</code> | enum-chip
				node.tagName = 'span';
				node.properties = { class: 'type-union' };
				node.children = buildMixedContent(types, literals);
			}
		}
	};
}

/**
 * Encode a value as JSON safe for use inside a double-quoted HTML attribute.
 * mdsvex doesn't encode `"` in attribute values, so we must do it ourselves.
 * @param {unknown} value
 */
function jsonAttr(value) {
	return JSON.stringify(value).replace(/"/g, '&quot;');
}

/** Recursively replace ` \| ` with ` | ` in all text nodes under a cell. @param {HastNode} node */
function stripEscapedPipes(node) {
	if (node.type === 'text') {
		/** @type {any} */ (node).value = (/** @type {any} */ (node).value ?? '').replace(
			/ \\\| /g,
			' | '
		);
		return;
	}
	if (Array.isArray(node.children)) {
		for (const child of node.children) stripEscapedPipes(child);
	}
}

/** @param {string} value */
function isLiteral(value) {
	return /^['"]/.test(value) || /^\d/.test(value);
}

/** @param {string[]} literals */
function buildChipContent(literals) {
	return [
		{
			type: 'element',
			tagName: 'span',
			properties: {
				class: 'enum-chip__trigger',
				tabIndex: 0,
				role: 'button',
				'aria-haspopup': 'true',
				'aria-label': `enum: ${literals.join(', ')}`
			},
			children: [
				{ type: 'text', value: 'enum' },
				{
					type: 'element',
					tagName: 'span',
					properties: { class: 'enum-chip__count', 'aria-hidden': 'true' },
					children: [{ type: 'text', value: String(literals.length) }]
				}
			]
		},
		{
			type: 'element',
			tagName: 'span',
			properties: { class: 'enum-chip__popover', role: 'tooltip' },
			children: literals.map((v) => ({
				type: 'element',
				tagName: 'code',
				properties: {},
				children: [{ type: 'text', value: v }]
			}))
		}
	];
}

/** @param {string[]} types @param {string[]} literals */
function buildMixedContent(types, literals) {
	/** @type {HastNode[]} */
	const children = [];

	for (let i = 0; i < types.length; i++) {
		if (i > 0) children.push(sep());
		children.push({
			type: 'element',
			tagName: 'code',
			properties: {},
			children: [{ type: 'text', value: types[i] }]
		});
	}

	children.push(sep());
	children.push({
		type: 'element',
		tagName: 'span',
		properties: { class: 'enum-chip', 'data-values': jsonAttr(literals) },
		children: buildChipContent(literals)
	});

	return children;
}

function sep() {
	return {
		type: 'element',
		tagName: 'span',
		properties: { class: 'type-sep', 'aria-hidden': 'true' },
		children: [{ type: 'text', value: ' | ' }]
	};
}

/**
 * @typedef {{ type: string; tagName?: string; children?: HastNode[]; properties?: Record<string, unknown>; value?: string }} HastNode
 * @typedef {HastNode & { tagName: string }} HastElement
 */

/** @param {HastNode} node @param {(node: HastNode, parent: HastNode | null) => void} visitor @param {HastNode | null} parent */
function walk(node, visitor, parent = null) {
	visitor(node, parent);
	if (Array.isArray(node.children)) {
		for (const child of node.children) {
			walk(child, visitor, node);
		}
	}
}

/** @param {HastNode} node @returns {string} */
function getTextContent(node) {
	if (node.type === 'text') return /** @type {any} */ (node).value ?? '';
	if (!Array.isArray(node.children)) return '';
	return node.children.map(getTextContent).join('');
}

export default rehypeEnumChip;
