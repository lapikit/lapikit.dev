import type { FrontmatterData, FrontmatterValue } from './types.ts';

const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function readFrontmatter(content: string): FrontmatterData {
	const match = content.match(FRONTMATTER_BLOCK);

	if (!match || !match[1].trim()) {
		return {};
	}

	const lines = match[1].replace(/\r\n/g, '\n').split('\n');

	return parseObject(lines, { line: 0 }, 0);
}

function parseObject(
	lines: string[],
	cursor: { line: number },
	indent: number
): FrontmatterData {
	const result: FrontmatterData = {};

	while (cursor.line < lines.length) {
		skipBlank(lines, cursor);

		if (cursor.line >= lines.length || indentOf(lines[cursor.line]) < indent) {
			break;
		}

		const trimmed = lines[cursor.line].trim();
		const separator = trimmed.indexOf(':');

		if (separator === -1) {
			throw new Error(`Invalid frontmatter line: "${trimmed}"`);
		}

		const key = trimmed.slice(0, separator).trim();
		const remainder = trimmed.slice(separator + 1).trim();
		cursor.line += 1;

		if (remainder) {
			result[key] = parseScalar(remainder);
			continue;
		}

		result[key] = parseNested(lines, cursor, indent);
	}

	return result;
}

function parseArray(
	lines: string[],
	cursor: { line: number },
	indent: number
): FrontmatterValue[] {
	const result: FrontmatterValue[] = [];

	while (cursor.line < lines.length) {
		skipBlank(lines, cursor);

		if (cursor.line >= lines.length || indentOf(lines[cursor.line]) < indent) {
			break;
		}

		const trimmed = lines[cursor.line].trim();

		if (!trimmed.startsWith('-')) {
			throw new Error(`Invalid array entry: "${trimmed}"`);
		}

		const remainder = trimmed.slice(1).trim();
		cursor.line += 1;

		result.push(remainder ? parseScalar(remainder) : parseNested(lines, cursor, indent));
	}

	return result;
}

function parseNested(
	lines: string[],
	cursor: { line: number },
	parentIndent: number
): FrontmatterValue {
	skipBlank(lines, cursor);

	if (cursor.line >= lines.length || indentOf(lines[cursor.line]) <= parentIndent) {
		return null;
	}

	const nestedIndent = indentOf(lines[cursor.line]);

	return lines[cursor.line].trim().startsWith('-')
		? parseArray(lines, cursor, nestedIndent)
		: parseObject(lines, cursor, nestedIndent);
}

function parseScalar(value: string): FrontmatterValue {
	if (value === 'null') return null;
	if (value === 'true') return true;
	if (value === 'false') return false;
	if (value === '[]') return [];
	if (value === '{}') return {};
	if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);

	if (value.startsWith('"') && value.endsWith('"')) {
		return JSON.parse(value) as string;
	}

	if (value.startsWith("'") && value.endsWith("'")) {
		return value.slice(1, -1).replace(/\\'/g, "'");
	}

	return value;
}

function skipBlank(lines: string[], cursor: { line: number }) {
	while (cursor.line < lines.length && !lines[cursor.line].trim()) {
		cursor.line += 1;
	}
}

function indentOf(line: string): number {
	return line.length - line.trimStart().length;
}
