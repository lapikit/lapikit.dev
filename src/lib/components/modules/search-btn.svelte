<script lang="ts">
	import { getContext } from 'svelte';

	// assets
	import { Search } from 'lucide-svelte';

	let {
		onlyBtn,
		class: className,
		block
	}: {
		onlyBtn?: boolean;
		class?: string;
		block?: boolean;
	} = $props();

	const search = getContext<{ open: boolean; toggle: () => void }>('search');
</script>

{#if onlyBtn}
	<kit:btn class={className} onclick={() => search.toggle()} icon density="compact" variant="text">
		<kit:icon>
			<Search />
		</kit:icon>
	</kit:btn>
{:else}
	<kit:btn class={className} onclick={() => search.toggle()} {block}>
		{#snippet prepend()}
			<kit:icon>
				<Search />
			</kit:icon>
		{/snippet}
		Search

		{#snippet append()}
			<kit:chip size="xs" background="transparent" s-style_cursor="pointer"> CTRL + K </kit:chip>
		{/snippet}
	</kit:btn>
{/if}
