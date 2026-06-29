<script lang="ts">
	import type { ModelPopoverProps } from 'lapikit/components';
</script>

<kit:popover>
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:btn variant="outline" onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}>
			Open popover
		</kit:btn>
	{/snippet}

	<div style="min-width: 14rem;">
		<p style="margin: 0 0 0.375rem; font-weight: 600;">Popover title</p>
		<p style="margin: 0; opacity: 0.7; font-size: 0.875rem;">
			Rich content can go here — links, buttons, or any component. Closes on click outside.
		</p>
	</div>
</kit:popover>
