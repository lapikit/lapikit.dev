<script lang="ts">
	import { getContext } from 'svelte';
	import { Search } from 'lucide-svelte';

	const search = getContext<{ open: boolean; toggle: () => void }>('search');
</script>

<kit:btn onclick={() => search.toggle()}>
	{#snippet prepend()}
		<kit:icon>
			<Search />
		</kit:icon>
	{/snippet}
	Search

	{#snippet append()}
		<kit:chip size="xs"> CTRL + K </kit:chip>
	{/snippet}
</kit:btn>
