<script lang="ts">
	import { Bold, Italic, Underline } from 'lucide-svelte';
	const densities = ['compact', 'default', 'comfortable'] as const;
</script>

<div style="display: flex; flex-direction: column; gap: 1rem;">
	{#each densities as density (density)}
		<kit:toolbar {density}>
			<kit:btn variant="text" size="sm" icon>
				{#snippet prepend()}<kit:icon><Bold /></kit:icon>{/snippet}
			</kit:btn>
			<kit:btn variant="text" size="sm" icon>
				{#snippet prepend()}<kit:icon><Italic /></kit:icon>{/snippet}
			</kit:btn>
			<kit:btn variant="text" size="sm" icon>
				{#snippet prepend()}<kit:icon><Underline /></kit:icon>{/snippet}
			</kit:btn>
		</kit:toolbar>
	{/each}
</div>
