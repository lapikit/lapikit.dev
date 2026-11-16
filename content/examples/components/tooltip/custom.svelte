<script lang="ts">
	import type { TooltipTriggerProps } from 'lapikit/components';
	import { Star } from 'lucide-svelte';
</script>

<kit:tooltip>
	{#snippet trigger(props: TooltipTriggerProps)}
		<kit:btn {...props}>Rich tooltip</kit:btn>
	{/snippet}
	{#snippet tooltip()}
		<div style="display: flex; align-items: center; gap: 0.375rem;">
			<kit:icon size="sm"><Star /></kit:icon>
			<span>Custom tooltip content</span>
		</div>
	{/snippet}
</kit:tooltip>
