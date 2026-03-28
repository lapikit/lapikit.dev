<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';

	// Components
	import TableOfContent from '$lib/components/table-of-content.svelte';

	let {
		children,
		summary = []
	}: {
		children?: Snippet;
		summary?: MarkdownHeading[];
	} = $props();
</script>

<article>
	<TableOfContent {summary} />
	{@render children?.()}
</article>
