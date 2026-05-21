import type { ComponentType, SvelteComponent } from 'svelte';

export type DocMetadataValue =
	| string
	| number
	| boolean
	| null
	| DocMetadataValue[]
	| { [key: string]: DocMetadataValue };

export type DocFrontmatter = {
	title: string;
	[key: string]: DocMetadataValue;
};

export type MarkdownHeading = {
	depth: 1 | 2 | 3;
	slug: string;
	value: string;
};

export type DocSummary = {
	id: string;
	sourcePath: string;
	metadata: DocFrontmatter;
	slug: string;
	path: string;
	section?: string;
	slugSegments: string[];
};

export type DocComponent = ComponentType<SvelteComponent>;

export type DocEntry = DocSummary & {
	component: DocComponent;
};

export type DocSeoEntry = {
	title: string;
	description: string;
	type: 'article';
};
