<script lang="ts">
	import { Star } from 'lucide-svelte';
</script>

<kit:tooltip>
	{#snippet tooltip()}
		<div style="display: flex; align-items: center; gap: 0.375rem;">
			<kit:icon size="sm"><Star /></kit:icon>
			<span>Custom tooltip content</span>
		</div>
	{/snippet}
	<kit:btn>Rich tooltip</kit:btn>
</kit:tooltip>
