declare module '*.md' {
	import type { Component } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';

	const component: Component;
	export default component;

	export const metadata: {
		title?: string;
		category?: string;
		summary?: MarkdownHeading[];
	} & Record<string, unknown>;
}
