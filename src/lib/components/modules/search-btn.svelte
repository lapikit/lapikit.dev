<script lang="ts">
	import { getContext } from 'svelte';

	// assets
	import { Search } from 'lucide-svelte';

	let {
		onlyBtn,
		class: className,
		block,
		density
	}: {
		onlyBtn?: boolean;
		class?: string;
		block?: boolean;
		density?: string;
	} = $props();

	const search = getContext<{ open: boolean; toggle: () => void }>('search');
</script>

{#if onlyBtn}
	<kit:btn
		class={className}
		onclick={() => search.toggle()}
		icon
		density="compact"
		variant="text"
		aria-label="Search the documentation"
	>
		<kit:icon>
			<Search />
		</kit:icon>
	</kit:btn>
{:else}
	<kit:btn class={className} onclick={() => search.toggle()} {block} {density}>
		{#snippet prepend()}
			<kit:icon>
				<Search />
			</kit:icon>
		{/snippet}
		Search

		{#snippet append()}
			<kit:chip size="xs" variant="text" s-style_cursor="pointer"> CTRL + K </kit:chip>
		{/snippet}
	</kit:btn>
{/if}
