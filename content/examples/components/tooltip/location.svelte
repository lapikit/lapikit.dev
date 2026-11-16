<script lang="ts">
	import type { TooltipTriggerProps } from 'lapikit/components';
</script>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; padding: 2rem 0;">
	{#each ['top', 'bottom', 'left', 'right'] as location (location)}
		<kit:tooltip {location} label={`Location: ${location}`}>
			{#snippet trigger(props: TooltipTriggerProps)}
				<kit:btn variant="outline" {...props}>{location}</kit:btn>
			{/snippet}
		</kit:tooltip>
	{/each}
</div>
