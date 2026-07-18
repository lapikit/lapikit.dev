export type FrontmatterValue =
	| string
	| number
	| boolean
	| null
	| FrontmatterValue[]
	| { [key: string]: FrontmatterValue };

export type FrontmatterData = Record<string, FrontmatterValue>;

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
