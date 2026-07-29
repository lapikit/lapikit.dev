<script lang="ts">
	import { getContext } from 'svelte';
	import { Search } from 'lucide-svelte';

	let {
		onlyBtn,
		class: className
	}: {
		onlyBtn?: boolean;
		class?: string;
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
	<kit:btn class={className} onclick={() => search.toggle()}>
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
