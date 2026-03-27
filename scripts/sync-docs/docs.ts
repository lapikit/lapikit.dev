import { basename, relative } from 'node:path';
import { docsContentDir, projectRoot } from './config.ts';
import type { DerivedDoc, FrontmatterData, FrontmatterValue } from './types.ts';

export function deriveDoc(filePath: string, frontmatter: FrontmatterData): DerivedDoc {
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
	const order = fileSegment?.order ?? directorySegments.at(-1)?.order ?? 0;
	const sortKey = [...directorySegments.map((segment) => segment.order), fileSegment?.order ?? -1];

	return {
		id: relativeFilePath.replace(/\.md$/, ''),
		metadata: createDocMetadata(frontmatter, title),
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

export function compareDocs(left: DerivedDoc, right: DerivedDoc) {
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

export function assertNoDuplicateRoutes(docs: DerivedDoc[]) {
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

export function createDocsMetadataJson(docs: DerivedDoc[]) {
	const docsPayload = docs.map((doc) => ({
		id: doc.id,
		sourcePath: doc.sourcePath,
		metadata: doc.metadata,
		slug: doc.slug,
		slugSegments: doc.slugSegments,
		path: doc.path,
		section: doc.section,
		order: doc.order,
		sortKey: doc.sortKey
	}));

	return `${JSON.stringify(docsPayload, null, 2)}\n`;
}

function createDocMetadata(frontmatter: FrontmatterData, title: string) {
	const metadata: FrontmatterData & { title: string } = {
		title
	};

	for (const [key, value] of Object.entries(frontmatter)) {
		if (key === 'title') {
			continue;
		}

		metadata[key] = value;
	}

	return metadata;
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

function toPosixPath(value: string) {
	return value.replaceAll('\\', '/');
}
