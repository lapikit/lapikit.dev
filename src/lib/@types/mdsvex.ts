import type { Component } from 'svelte';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DocComponent = Component<any>;

export type DocEntry = DocSummary & {
	component: DocComponent;
};

export type DocSeoEntry = {
	title: string;
	description: string;
	type: 'article';
};

export type ContentSummary = {
	path: string;
	slug: string;
	sourcePath: string;
	metadata: { title: string; description?: unknown; [key: string]: unknown };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkdownComponent = Component<any>;
export type ContentEntry<T extends ContentSummary> = T & { component: MarkdownComponent };
