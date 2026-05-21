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

	const fileBasename = basename(fileName, '.md');
	const slugSegments = pathSegments
		.map(slugify)
		.concat(fileBasename !== 'index' ? [slugify(fileBasename)] : [])
		.filter(Boolean);
	const slug = slugSegments.join('/');
	const path = slug ? `/docs/${slug}` : '/docs';
	const fallbackTitle = toTitle(fileBasename !== 'index' ? fileBasename : (pathSegments.at(-1) ?? '')) || 'Documentation';
	const title = asOptionalString(frontmatter.title) ?? fallbackTitle;

	return {
		id: relativeFilePath.replace(/\.md$/, ''),
		metadata: createDocMetadata(frontmatter, title),
		path,
		section: slugSegments[0],
		slug,
		slugSegments,
		sourcePath,
		title
	};
}

export function compareDocs(left: DerivedDoc, right: DerivedDoc) {
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
		section: doc.section
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
