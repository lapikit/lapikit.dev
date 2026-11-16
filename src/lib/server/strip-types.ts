import { parse } from 'svelte/compiler';

type Node = {
	type: string;
	start: number;
	end: number;
	[key: string]: unknown;
};

type Range = [start: number, end: number];

const typescript_langs = new Set(['ts', 'typescript']);
const svelte_langs = new Set(['svelte']);

const type_only_statements = new Set([
	'TSTypeAliasDeclaration',
	'TSInterfaceDeclaration',
	'TSDeclareFunction'
]);

const type_wrappers = new Set(['TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression']);

const annotation_keys = ['typeAnnotation', 'returnType', 'typeParameters', 'typeArguments'];

const ignored_keys = new Set(['parent', 'metadata', ...annotation_keys]);

const isNode = (value: unknown): value is Node =>
	typeof value === 'object' && value !== null && typeof (value as Node).type === 'string';

const children = (node: Node) =>
	Object.entries(node)
		.filter(([key]) => !ignored_keys.has(key))
		.flatMap(([, value]) => (Array.isArray(value) ? value : [value]))
		.filter(isNode);

function lineRange(source: string, start: number, end: number): Range {
	const lineStart = source.lastIndexOf('\n', start - 1) + 1;
	const before = source.slice(lineStart, start);
	const lineEnd = source.indexOf('\n', end);
	const after = source.slice(end, lineEnd === -1 ? source.length : lineEnd);

	if (before.trim() === '' && after.trim() === '') {
		return [lineStart, lineEnd === -1 ? source.length : lineEnd + 1];
	}

	return [start, end];
}

function specifierRange(source: string, specifier: Node): Range {
	const following = source.slice(specifier.end).match(/^\s*,\s*/);
	if (following) return [specifier.start, specifier.end + following[0].length];

	const preceding = source.slice(0, specifier.start).match(/,\s*$/);
	if (preceding) return [specifier.start - preceding[0].length, specifier.end];

	return [specifier.start, specifier.end];
}

function collectRanges(source: string, root: Node) {
	const ranges: Range[] = [];
	const leftovers: Node[] = [];

	const visit = (node: Node) => {
		if (node.type === 'ImportDeclaration') {
			const specifiers = (node.specifiers as Node[]) ?? [];
			const typeSpecifiers = specifiers.filter((specifier) => specifier.importKind === 'type');

			if (
				node.importKind === 'type' ||
				(specifiers.length > 0 && typeSpecifiers.length === specifiers.length)
			) {
				ranges.push(lineRange(source, node.start, node.end));
				return;
			}

			typeSpecifiers.forEach((specifier) => ranges.push(specifierRange(source, specifier)));
			return;
		}

		if (node.type === 'ExportNamedDeclaration') {
			const declaration = node.declaration as Node | null;
			if (
				node.exportKind === 'type' ||
				(declaration && type_only_statements.has(declaration.type))
			) {
				ranges.push(lineRange(source, node.start, node.end));
				return;
			}
		}

		if (type_only_statements.has(node.type)) {
			ranges.push(lineRange(source, node.start, node.end));
			return;
		}

		if (type_wrappers.has(node.type)) {
			const expression = node.expression as Node;
			ranges.push([expression.end, node.end]);
			visit(expression);
			return;
		}

		if (node.type === 'Identifier' && node.optional && node.typeAnnotation) {
			const name = node.name as string;
			ranges.push([node.start + name.length, node.start + name.length + 1]);
		}

		for (const key of annotation_keys) {
			const annotation = node[key];
			if (isNode(annotation) && annotation.type.startsWith('TS')) {
				ranges.push([annotation.start, annotation.end]);
			}
		}

		for (const child of children(node)) {
			const isUnsupported =
				child.type.startsWith('TS') &&
				!type_wrappers.has(child.type) &&
				!type_only_statements.has(child.type);

			if (isUnsupported) {
				leftovers.push(child);
				continue;
			}
			visit(child);
		}
	};

	visit(root);
	return { ranges, leftovers };
}

function applyRanges(source: string, ranges: Range[]) {
	const merged = [...ranges]
		.sort((a, b) => a[0] - b[0])
		.reduce<Range[]>((list, range) => {
			const last = list.at(-1);
			if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
			else list.push([...range]);
			return list;
		}, []);

	let output = '';
	let cursor = 0;
	for (const [start, end] of merged) {
		output += source.slice(cursor, start);
		cursor = end;
	}
	return output + source.slice(cursor);
}

function tidyScripts(code: string) {
	return code
		.replace(/<script([^>]*)>\s*<\/script>\n*/g, '')
		.replace(/(<script[^>]*>)\n{2,}/g, '$1\n')
		.replace(/\n{3,}/g, '\n\n')
		.replace(/^\n+/, '');
}

function stripSvelte(code: string, name: string) {
	const ast = parse(code, { modern: true });
	const scripts = [ast.instance, ast.module].filter(Boolean) as unknown as Node[];
	const isTypescript = scripts.some((script) =>
		(script.attributes as Node[]).some(
			(attribute) =>
				attribute.name === 'lang' &&
				/ts|typescript/.test(code.slice(attribute.start, attribute.end))
		)
	);

	if (!isTypescript) return null;

	const ranges: Range[] = [];
	const leftovers: Node[] = [];

	for (const script of scripts) {
		for (const attribute of script.attributes as Node[]) {
			if (attribute.name === 'lang' || attribute.name === 'generics') {
				ranges.push([attribute.start - 1, attribute.end]);
			}
		}
		const result = collectRanges(code, script.content as Node);
		ranges.push(...result.ranges);
		leftovers.push(...result.leftovers);
	}

	const fragment = collectRanges(code, ast.fragment as unknown as Node);
	ranges.push(...fragment.ranges);
	leftovers.push(...fragment.leftovers);

	if (leftovers.length > 0) {
		const kinds = [...new Set(leftovers.map(({ type }) => type))].join(', ');
		throw new Error(`Unsupported TypeScript syntax (${kinds}) in ${name}`);
	}

	const output = tidyScripts(applyRanges(code, ranges));
	parse(output, { modern: true });
	return output;
}

function stripTypescript(code: string, name: string) {
	const open = '<script lang="ts">';
	const wrapped = stripSvelte(`${open}\n${code}</script>`, name);
	if (wrapped === null) return null;

	const output = wrapped.replace(/^<script>\n?/, '').replace(/<\/script>\n*$/, '');
	return output.endsWith('\n') || !code.endsWith('\n') ? output : `${output}\n`;
}

export function stripTypes(code: string, lang: string | undefined, name = 'inline code') {
	if (lang && svelte_langs.has(lang)) return stripSvelte(code, name);
	if (lang && typescript_langs.has(lang)) return stripTypescript(code, name);
	return null;
}

export const javascriptFileName = (name: string) => name.replace(/\.ts$/, '.js');
