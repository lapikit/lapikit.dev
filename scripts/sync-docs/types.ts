export type FrontmatterValue =
	| string
	| number
	| boolean
	| null
	| FrontmatterValue[]
	| { [key: string]: FrontmatterValue };

export type FrontmatterData = Record<string, FrontmatterValue>;

export type ParsedMarkdownFile = {
	body: string;
	frontmatter: FrontmatterData;
	hasFrontmatter: boolean;
};

export type DerivedDoc = {
	id: string;
	metadata: FrontmatterData & { title: string };
	order: number;
	path: string;
	section?: string;
	slug: string;
	slugSegments: string[];
	sortKey: number[];
	sourcePath: string;
	title: string;
};
