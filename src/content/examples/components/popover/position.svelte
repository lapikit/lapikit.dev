<script lang="ts">
	import type { PopoverTriggerProps } from 'lapikit/components';
	const positions = ['top', 'bottom', 'left', 'right'] as const;
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; padding: 3rem 0;">
	{#each positions as position (position)}
		<kit:popover {position}>
			{#snippet trigger(props: PopoverTriggerProps)}
				<kit:btn variant="outline" {...props}>{position}</kit:btn>
			{/snippet}
			<p style="margin: 0;">Position: <strong>{position}</strong></p>
		</kit:popover>
	{/each}
</div>
