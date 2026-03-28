<script lang="ts">
	import type { MarkdownHeading } from '$lib/@types';

	let { summary = [] }: { summary?: MarkdownHeading[] } = $props();

	const summaryItems = $derived(summary.filter((item) => item.depth >= 1 && item.depth <= 3));
</script>

{#if summaryItems.length > 0}
	<nav aria-label="Table of contents">
		<p>On this page</p>

		<ul>
			{#each summaryItems as item (item.slug)}
				<li class={`depth-${item.depth}`}>
					<a href={`#${item.slug}`}>{item.value}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
