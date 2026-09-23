import { relative } from 'node:path';
import { slugify } from '../../src/lib/utils/slugify.js';

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

function toPosixPath(value: string) {
	return value.replaceAll('\\', '/');
}
