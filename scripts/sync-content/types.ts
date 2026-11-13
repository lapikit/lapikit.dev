import type { FrontmatterData } from '../../src/lib/server/frontmatter.ts';

export type { FrontmatterData };

export type ManifestPath = {
	sourcePath: string;
	slug: string;
	slugSegments: string[];
	pathname: string;
};

export type ManifestEntry = FrontmatterData & {
	title: string;
	path: ManifestPath;
};
