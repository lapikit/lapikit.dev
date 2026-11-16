import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const prerender = true;

const examples = import.meta.glob<{ default: Component }>('/content/examples/**/*.svelte');

export async function load({ data }) {
	const { rendered, ...page } = data;

	const demoPaths = rendered.blocks.flatMap((block) => {
		if (block.type === 'demo') return [block.path];
		if (block.type === 'repl' && block.demo) return [block.demo];
		return [];
	});

	const demos = Object.fromEntries(
		await Promise.all(
			demoPaths.map(async (path) => {
				const loader = examples[`/content/examples/${path}`];
				if (!loader) error(500, `Missing example: content/examples/${path}`);
				return [path, (await loader()).default] as const;
			})
		)
	);

	return { ...page, content: { ...rendered, demos } };
}
