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
	state?: 'deprecated';
	/** ISO date of the last commit on the source file, missing when git is unavailable */
	lastModified?: string;
	head?: {
		title?: string;
		description?: string;
	};
	path: DocPath;
} & Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DocComponent = Component<any>;

export type DocEntry = DocSummary & {
	component: DocComponent;
};

export type BlogPostSummary = DocSummary & {
	description: string;
	author: string;
	/** YYYY-MM-DD */
	date: string;
	/** YYYY-MM-DD, only when the post was revised after publication */
	updated?: string;
	/** minutes */
	readingTime: number;
};
