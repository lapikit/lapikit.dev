<script lang="ts">
	//assets
	import { BadgeCheck } from 'lucide-svelte';

	let {
		list = []
	}: {
		list: Array<string>;
	} = $props();
</script>

<kit:list
	variant="outline"
	nav
	s-style_gap="8px"
	s-style_--kit-list-item-bd="var(--kit-color-border)"
	density="compact"
>
	{#each list as argument (argument)}
		<kit:list-item>
			{#snippet prepend()}
				<kit:icon color="success"><BadgeCheck /></kit:icon>
			{/snippet}
			{@html argument}
		</kit:list-item>
	{/each}
</kit:list>
