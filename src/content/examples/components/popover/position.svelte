<script lang="ts">
	import type { ModelPopoverProps } from 'lapikit/labs/components';

	const positions = ['top', 'bottom', 'left', 'right'] as const;
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; padding: 3rem 0;">
	{#each positions as position (position)}
		<kit:popover {position}>
			{#snippet activator({ toggle }: ModelPopoverProps)}
				<kit:btn
					variant="outline"
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}>{position}</kit:btn
				>
			{/snippet}
			<p style="margin: 0;">Position: <strong>{position}</strong></p>
		</kit:popover>
	{/each}
</div>
