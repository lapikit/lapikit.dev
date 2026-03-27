import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, relative } from 'node:path';

type FrontmatterValue =
	| string
	| number
	| boolean
	| null
	| FrontmatterValue[]
	| { [key: string]: FrontmatterValue };

type FrontmatterData = Record<string, FrontmatterValue>;

type DerivedDoc = {
	id: string;
	order: number;
	path: string;
	section?: string;
	slug: string;
	slugSegments: string[];
	sortKey: number[];
	sourcePath: string;
	title: string;
	description?: string;
};

const projectRoot = process.cwd();
const docsContentDir = join(projectRoot, 'src/content/docs');
const generatedDir = join(projectRoot, 'src/');
const docsMetadataFile = join(generatedDir, 'pages.docs.json');
const generatedFrontmatterKeys = new Set(['layout', 'slug', 'path', 'section', 'order']);

await syncDocs();

async function syncDocs() {
	const docFiles = await collectMarkdownFiles(docsContentDir);
	const derivedDocs: DerivedDoc[] = [];

	for (const filePath of docFiles) {
		derivedDocs.push(await syncDocFile(filePath));
	}

	const sortedDocs = [...derivedDocs].sort(compareDocs);
	assertNoDuplicateRoutes(sortedDocs);

	await mkdir(generatedDir, { recursive: true });
	await writeTextFile(docsMetadataFile, createDocsMetadataJson(sortedDocs));

	console.log(`Synced ${sortedDocs.length} documentation files.`);
}

async function collectMarkdownFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries
			.filter((entry) => !entry.name.startsWith('.'))
			.map(async (entry) => {
				const fullPath = join(directory, entry.name);

				if (entry.isDirectory()) {
					return collectMarkdownFiles(fullPath);
				}

				return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
			})
	);

	return files.flat().sort((left, right) => left.localeCompare(right));
}

async function syncDocFile(filePath: string): Promise<DerivedDoc> {
	const rawContent = await readTextFile(filePath);
	const newline = rawContent.includes('\r\n') ? '\r\n' : '\n';
	const { body, frontmatter, hasFrontmatter } = parseMarkdownFile(rawContent);
	const derivedDoc = deriveDoc(filePath, frontmatter);
	const nextFrontmatter = stripGeneratedFrontmatter(frontmatter);
	const nextContent = serializeMarkdownFile(nextFrontmatter, body, newline, hasFrontmatter);

	if (nextContent !== rawContent) {
		await writeTextFile(filePath, nextContent);
	}

	return derivedDoc;
}

function parseMarkdownFile(content: string) {
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

function deriveDoc(filePath: string, frontmatter: FrontmatterData): DerivedDoc {
	const relativeFilePath = toPosixPath(relative(docsContentDir, filePath));
	const sourcePath = toPosixPath(relative(projectRoot, filePath));
	const pathSegments = relativeFilePath.split('/');
	const fileName = pathSegments.pop();

	if (!fileName) {
		throw new Error(`Invalid documentation file path: ${filePath}`);
	}

	const directorySegments = pathSegments.map(parseOrderedSegment);
	const fileBasename = basename(fileName, '.md');
	const fileSegment = fileBasename === 'index' ? null : parseOrderedSegment(fileBasename);
	const slugSegments = directorySegments
		.map((segment) => slugify(segment.name))
		.concat(fileSegment ? [slugify(fileSegment.name)] : [])
		.filter(Boolean);
	const slug = slugSegments.join('/');
	const path = slug ? `/docs/${slug}` : '/docs';
	const fallbackTitle = fileSegment?.title ?? directorySegments.at(-1)?.title ?? 'Documentation';
	const title = asOptionalString(frontmatter.title) ?? fallbackTitle;
	const description = asOptionalString(frontmatter.description);
	const order = fileSegment?.order ?? directorySegments.at(-1)?.order ?? 0;
	const sortKey = [...directorySegments.map((segment) => segment.order), fileSegment?.order ?? -1];

	return {
		description,
		id: relativeFilePath.replace(/\.md$/, ''),
		order,
		path,
		section: slugSegments[0],
		slug,
		slugSegments,
		sortKey,
		sourcePath,
		title
	};
}

function stripGeneratedFrontmatter(frontmatter: FrontmatterData): FrontmatterData {
	return Object.fromEntries(
		Object.entries(frontmatter).filter(([key]) => !generatedFrontmatterKeys.has(key))
	);
}

function serializeMarkdownFile(
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

async function readTextFile(filePath: string) {
	return readFile(filePath, 'utf8');
}

async function writeTextFile(filePath: string, content: string) {
	await writeFile(filePath, content, 'utf8');
}

function parseOrderedSegment(segment: string) {
	const match = segment.match(/^(\d+)-(.+)$/);
	const order = match ? Number(match[1]) : 0;
	const name = match ? match[2] : segment;

	return {
		name,
		order,
		title: toTitle(name)
	};
}

function slugify(value: string) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function toTitle(value: string) {
	return value
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(' ');
}

function asOptionalString(value: FrontmatterValue | undefined) {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function isPlainObject(value: unknown): value is Record<string, FrontmatterValue> {
	return Object.prototype.toString.call(value) === '[object Object]';
}

function compareDocs(left: DerivedDoc, right: DerivedDoc) {
	const maxLength = Math.max(left.sortKey.length, right.sortKey.length);

	for (let index = 0; index < maxLength; index += 1) {
		const leftValue = left.sortKey[index] ?? Number.POSITIVE_INFINITY;
		const rightValue = right.sortKey[index] ?? Number.POSITIVE_INFINITY;

		if (leftValue !== rightValue) {
			return leftValue - rightValue;
		}
	}

	return left.path.localeCompare(right.path);
}

function assertNoDuplicateRoutes(docs: DerivedDoc[]) {
	const slugs = new Set<string>();
	const paths = new Set<string>();

	for (const doc of docs) {
		if (slugs.has(doc.slug)) {
			throw new Error(`Duplicate documentation slug detected: "${doc.slug}".`);
		}

		if (paths.has(doc.path)) {
			throw new Error(`Duplicate documentation path detected: "${doc.path}".`);
		}

		slugs.add(doc.slug);
		paths.add(doc.path);
	}
}

function createDocsMetadataJson(docs: DerivedDoc[]) {
	const docsPayload = docs.map((doc) => ({
		id: doc.id,
		sourcePath: doc.sourcePath,
		slug: doc.slug,
		slugSegments: doc.slugSegments,
		path: doc.path,
		title: doc.title,
		description: doc.description,
		section: doc.section,
		order: doc.order,
		sortKey: doc.sortKey
	}));

	return `${toTypeScriptLiteral(docsPayload)}\n`;
}

function toTypeScriptLiteral(value: unknown) {
	return JSON.stringify(value, null, 2);
}

function toPosixPath(value: string) {
	return value.replaceAll('\\', '/');
}
