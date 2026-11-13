<script lang="ts">
	import type { DocBlock } from '$lib/@types';
	import Blockquote from '$lib/components/markdown/blockquote.svelte';

	let { blocks }: { blocks: DocBlock[] } = $props();
</script>

{#each blocks as block, index (index)}
	{#if block.type === 'callout'}
		<Blockquote>{@html block.html}</Blockquote>
	{:else}
		{@html block.html}
	{/if}
{/each}
