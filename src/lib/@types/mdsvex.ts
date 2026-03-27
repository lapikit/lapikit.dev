import type { ComponentType, SvelteComponent } from 'svelte';

export type DocFrontmatter = {
	title?: string;
	description?: string;
};

export type DocSummary = {
	id: string;
	sourcePath: string;
	title: string;
	description?: string;
	slug: string;
	path: string;
	section?: string;
	order: number;
	slugSegments: string[];
	sortKey: number[];
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
