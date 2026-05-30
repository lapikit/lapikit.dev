<script lang="ts">
	import { Inbox, Send, Archive, Trash2, Star } from 'lucide-svelte';

	const items = [
		{ icon: Inbox, label: 'Inbox', count: 12 },
		{ icon: Star, label: 'Starred', count: 3 },
		{ icon: Send, label: 'Sent' },
		{ icon: Archive, label: 'Archive' },
		{ icon: Trash2, label: 'Trash' }
	];

	let active = $state('Inbox');
</script>

<kit:list style="max-width: 240px;">
	{#each items as item (item.icon)}
		<kit:list-item is="button" active={active === item.label} onclick={() => (active = item.label)}>
			{#snippet prepend()}
				{@const Icon = item.icon}
				<kit:icon><Icon /></kit:icon>
			{/snippet}
			{item.label}
			{#if item.count}
				{#snippet append()}
					<kit:chip variant="filled" size="xs" labelStyle>{item.count}</kit:chip>
				{/snippet}
			{/if}
		</kit:list-item>
	{/each}
</kit:list>
