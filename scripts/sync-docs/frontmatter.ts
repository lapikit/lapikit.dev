import { generatedFrontmatterKeys } from './config.ts';
import type { FrontmatterData, FrontmatterValue, ParsedMarkdownFile } from './types.ts';

export function parseMarkdownFile(content: string): ParsedMarkdownFile {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

	if (!match) {
		return {
			body: content,
			frontmatter: {} satisfies FrontmatterData,
			hasFrontmatter: false
		};
	}

	const parsed = match[1].trim() ? parseFrontmatter(match[1]) : {};

	return {
		body: content.slice(match[0].length),
		frontmatter: parsed,
		hasFrontmatter: true
	};
}

export function stripGeneratedFrontmatter(frontmatter: FrontmatterData): FrontmatterData {
	return Object.fromEntries(
		Object.entries(frontmatter).filter(([key]) => !generatedFrontmatterKeys.has(key))
	);
}

export function serializeMarkdownFile(
	frontmatter: FrontmatterData,
	body: string,
	newline: string,
	hasFrontmatter: boolean
) {
	const normalizedBody = body.replace(/^\r?\n/, '');

	if (Object.keys(frontmatter).length === 0) {
		return hasFrontmatter ? normalizedBody : body;
	}

	const serializedFrontmatter = serializeYamlObject(frontmatter).trimEnd();

	return ['---', serializedFrontmatter, '---', '', normalizedBody]
		.join('\n')
		.replace(/\n/g, newline);
}

function serializeYamlObject(value: FrontmatterData, indent = 0): string {
	const padding = ' '.repeat(indent);

	return Object.entries(value)
		.map(([key, entry]) => serializeYamlEntry(key, entry, padding, indent))
		.join('\n');
}

function serializeYamlEntry(
	key: string,
	value: FrontmatterValue,
	padding: string,
	indent: number
): string {
	if (Array.isArray(value)) {
		if (value.length === 0) {
			return `${padding}${key}: []`;
		}

		const items = value
			.map((item) => {
				if (isPlainObject(item)) {
					const nested = serializeYamlObject(item, indent + 4);
					return `${padding}  -\n${nested}`;
				}

				if (Array.isArray(item)) {
					throw new Error(`Nested arrays are not supported in frontmatter key "${key}".`);
				}

				return `${padding}  - ${serializeYamlScalar(item)}`;
			})
			.join('\n');

		return `${padding}${key}:\n${items}`;
	}

	if (isPlainObject(value)) {
		const nestedEntries = Object.keys(value);

		if (nestedEntries.length === 0) {
			return `${padding}${key}: {}`;
		}

		return `${padding}${key}:\n${serializeYamlObject(value, indent + 2)}`;
	}

	return `${padding}${key}: ${serializeYamlScalar(value)}`;
}

function serializeYamlScalar(value: string | number | boolean | null) {
	if (value === null) {
		return 'null';
	}

	if (typeof value === 'string') {
		return JSON.stringify(value);
	}

	return String(value);
}

function parseFrontmatter(source: string): FrontmatterData {
	const lines = source.replace(/\r\n/g, '\n').split('\n');
	const { value, nextIndex } = parseObjectBlock(lines, 0, 0, 'frontmatter');

	skipBlankLines(lines, nextIndex);

	return value;
}

function parseObjectBlock(
	lines: string[],
	startIndex: number,
	indent: number,
	context: string
): { value: FrontmatterData; nextIndex: number } {
	const result: FrontmatterData = {};
	let index = skipBlankLines(lines, startIndex);

	while (index < lines.length) {
		const line = lines[index];
		const lineIndent = getIndent(line);
		const trimmed = line.trim();

		if (!trimmed) {
			index += 1;
			continue;
		}

		if (lineIndent < indent) {
			break;
		}

		if (lineIndent !== indent) {
			throw new Error(`Unexpected indentation at ${context} line ${index + 1}.`);
		}

		if (trimmed.startsWith('-')) {
			throw new Error(`Unexpected array item at ${context} line ${index + 1}.`);
		}

		const separatorIndex = trimmed.indexOf(':');

		if (separatorIndex === -1) {
			throw new Error(`Invalid frontmatter entry at ${context} line ${index + 1}.`);
		}

		const key = trimmed.slice(0, separatorIndex).trim();
		const remainder = trimmed.slice(separatorIndex + 1).trim();

		if (!key) {
			throw new Error(`Missing key at ${context} line ${index + 1}.`);
		}

		if (remainder) {
			result[key] = parseScalar(remainder, `${context}.${key}`);
			index += 1;
			continue;
		}

		const nextIndex = skipBlankLines(lines, index + 1);

		if (nextIndex >= lines.length || getIndent(lines[nextIndex]) <= indent) {
			result[key] = null;
			index = nextIndex;
			continue;
		}

		const nextLine = lines[nextIndex];
		const nextIndent = getIndent(nextLine);
		const nextTrimmed = nextLine.trim();

		if (nextTrimmed.startsWith('-')) {
			const arrayResult = parseArrayBlock(lines, nextIndex, nextIndent, `${context}.${key}`);
			result[key] = arrayResult.value;
			index = arrayResult.nextIndex;
			continue;
		}

		const objectResult = parseObjectBlock(lines, nextIndex, nextIndent, `${context}.${key}`);
		result[key] = objectResult.value;
		index = objectResult.nextIndex;
	}

	return { value: result, nextIndex: index };
}

function parseArrayBlock(
	lines: string[],
	startIndex: number,
	indent: number,
	context: string
): { value: FrontmatterValue[]; nextIndex: number } {
	const result: FrontmatterValue[] = [];
	let index = skipBlankLines(lines, startIndex);

	while (index < lines.length) {
		const line = lines[index];
		const lineIndent = getIndent(line);
		const trimmed = line.trim();

		if (!trimmed) {
			index += 1;
			continue;
		}

		if (lineIndent < indent) {
			break;
		}

		if (lineIndent !== indent || !trimmed.startsWith('-')) {
			throw new Error(`Invalid array entry at ${context} line ${index + 1}.`);
		}

		const remainder = trimmed.slice(1).trim();

		if (remainder) {
			result.push(parseScalar(remainder, `${context}[${result.length}]`));
			index += 1;
			continue;
		}

		const nextIndex = skipBlankLines(lines, index + 1);

		if (nextIndex >= lines.length || getIndent(lines[nextIndex]) <= indent) {
			result.push(null);
			index = nextIndex;
			continue;
		}

		const nextLine = lines[nextIndex];
		const nextIndent = getIndent(nextLine);
		const nextTrimmed = nextLine.trim();

		if (nextTrimmed.startsWith('-')) {
			const arrayResult = parseArrayBlock(
				lines,
				nextIndex,
				nextIndent,
				`${context}[${result.length}]`
			);
			result.push(arrayResult.value);
			index = arrayResult.nextIndex;
			continue;
		}

		const objectResult = parseObjectBlock(
			lines,
			nextIndex,
			nextIndent,
			`${context}[${result.length}]`
		);
		result.push(objectResult.value);
		index = objectResult.nextIndex;
	}

	return { value: result, nextIndex: index };
}

function parseScalar(value: string, context: string): FrontmatterValue {
	if (value === 'null') {
		return null;
	}

	if (value === 'true') {
		return true;
	}

	if (value === 'false') {
		return false;
	}

	if (value === '[]') {
		return [];
	}

	if (value === '{}') {
		return {};
	}

	if (/^-?\d+(?:\.\d+)?$/.test(value)) {
		return Number(value);
	}

	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		if (value.startsWith('"')) {
			return JSON.parse(value) as string;
		}

		return value.slice(1, -1).replace(/\\'/g, "'");
	}

	if (value.includes(': ')) {
		throw new Error(`Inline nested YAML is not supported at ${context}.`);
	}

	return value;
}

function skipBlankLines(lines: string[], index: number) {
	let nextIndex = index;

	while (nextIndex < lines.length && !lines[nextIndex].trim()) {
		nextIndex += 1;
	}

	return nextIndex;
}

function getIndent(line: string) {
	return line.length - line.trimStart().length;
}

function isPlainObject(value: unknown): value is Record<string, FrontmatterValue> {
	return Object.prototype.toString.call(value) === '[object Object]';
}
