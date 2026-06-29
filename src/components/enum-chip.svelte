<script lang="ts">
	import type { ModelPopoverProps } from 'lapikit/components';
	import { Info } from 'lucide-svelte';

	let { values }: { values: string[] } = $props();
</script>

<kit:popover>
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:chip
			size="xs"
			variant="outline"
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
			aria-label={`enum: ${values.join(', ')}`}
			style="color: "
		>
			Enum

			{#snippet append()}
				<kit:icon size="xs"><Info /></kit:icon>
			{/snippet}
		</kit:chip>
	{/snippet}

	<kit:list density="compact" size="xs">
		{#each values as value (value)}
			<kit:list-item><code>{value}</code></kit:list-item>
		{/each}
	</kit:list>
</kit:popover>
