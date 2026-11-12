<script lang="ts">
	import type { PopoverTriggerProps } from 'lapikit/components';
	import { Info } from 'lucide-svelte';

	let { values }: { values: string[] } = $props();
</script>

<kit:popover>
	{#snippet trigger(props: PopoverTriggerProps)}
		<kit:chip size="xs" variant="outline" {...props} aria-label={`enum: ${values.join(', ')}`}>
			Enum

			{#snippet append()}
				<kit:icon size="xs">
					<Info />
				</kit:icon>
			{/snippet}
		</kit:chip>
	{/snippet}

	<kit:list density="compact" size="xs">
		{#each values as value (value)}
			<kit:list-item>
				<code>{value}</code>
			</kit:list-item>
		{/each}
	</kit:list>
</kit:popover>
