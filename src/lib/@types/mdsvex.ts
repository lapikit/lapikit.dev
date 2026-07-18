import type { Component } from 'svelte';

export type MarkdownHeading = {
	depth: 1 | 2 | 3;
	slug: string;
	value: string;
};

export type DocPath = {
	sourcePath: string;
	slug: string;
	slugSegments: string[];
	pathname: string;
};

export type DocSummary = {
	title: string;
	path: DocPath;
} & Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DocComponent = Component<any>;

export type DocEntry = DocSummary & {
	component: DocComponent;
};
