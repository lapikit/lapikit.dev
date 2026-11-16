<script lang="ts">
	import { Star } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 1rem;">
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.375rem;">
			<kit:icon {size}><Star /></kit:icon>
			<span style="font-size: 0.75rem; opacity: 0.6;">{size}</span>
		</div>
	{/each}
</div>
