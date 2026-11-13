<script lang="ts">
	import type { TooltipTriggerProps } from 'lapikit/components';
	import { Info } from 'lucide-svelte';
</script>

<div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
	<kit:tooltip label="I'm a tooltip">
		{#snippet trigger(props: TooltipTriggerProps)}
			<kit:btn {...props}>Hover me</kit:btn>
		{/snippet}
	</kit:tooltip>

	<kit:icon tooltip="More information"><Info /></kit:icon>
</div>
