import { relative } from 'node:path';

export type SourceMeta = {
	sourcePath: string;
	slug: string;
	slugSegments: string[];
	pathname: string;
};

const ROUTE_GROUP = /^\(.*\)$/;

export function deriveSource(filePath: string, baseDir: string, urlPrefix: string): SourceMeta {
	const sourcePath = toPosixPath(relative(process.cwd(), filePath));
	const segments = toPosixPath(relative(baseDir, filePath)).replace(/\.md$/, '').split('/');

	const slugSegments = segments
		.filter((segment) => !ROUTE_GROUP.test(segment))
		.filter((segment, index, all) => index !== all.length - 1 || !isIndexLike(segment))
		.map(slugify)
		.filter(Boolean);

	const slug = slugSegments.join('/');
	const pathname = `${urlPrefix}${slug ? `/${slug}` : ''}` || '/';

	return { sourcePath, slug, slugSegments, pathname };
}

function isIndexLike(segment: string) {
	return segment === 'index' || segment.startsWith('+');
}

function slugify(value: string) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function toPosixPath(value: string) {
	return value.replaceAll('\\', '/');
}
