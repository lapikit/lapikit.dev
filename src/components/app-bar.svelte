<script lang="ts">
	import { getContext } from 'svelte';

	// icons
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import { Search } from 'lucide-svelte';

	const search = getContext<{ open: boolean; toggle: () => void }>('search');
</script>

<kit:appbar>
	<kit:btn onclick={() => search.toggle()}>
		{#snippet prepend()}
			<kit:icon>
				<Search />
			</kit:icon>
		{/snippet}
		Search

		{#snippet append()}
			<kit:chip> CTRL + K </kit:chip>
		{/snippet}
	</kit:btn>

	<kit:btn icon>
		<kit:icon>
			{@html githubIcon}
		</kit:icon>
	</kit:btn>

	<kit:btn icon>
		<kit:icon>
			{@html githubIcon}
		</kit:icon>
	</kit:btn>

	<kit:btn icon>
		<kit:icon>
			{@html githubIcon}
		</kit:icon>
	</kit:btn>
</kit:appbar>
