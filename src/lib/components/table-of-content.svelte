<script lang="ts">
	import type { MarkdownHeading } from '$lib/@types';

	let { summary = [] }: { summary?: MarkdownHeading[] } = $props();

	const summaryItems = $derived(summary.filter((item) => item.depth >= 1 && item.depth <= 3));
</script>

{#if summaryItems.length > 0}
	<nav aria-label="Table of contents">
		<kit:list>
			<kit:list-item>
				<span class="font-semibold">On this page</span>
			</kit:list-item>
		</kit:list>

		{#each summaryItems as item (item.slug)}
			<kit:list-item href={`#${item.slug}`} class={`depth-${item.depth}`}>
				{item.value}
			</kit:list-item>
		{/each}
	</nav>
{/if}
