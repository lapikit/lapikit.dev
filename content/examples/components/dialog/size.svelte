<script lang="ts">
	let size = $state<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
	let open = $state(false);

	function show(s: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
		size = s;
		open = true;
	}
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as s (s)}
		<kit:btn variant="outline" onclick={() => show(s as 'xs' | 'sm' | 'md' | 'lg' | 'xl')}>
			{s}
		</kit:btn>
	{/each}
</div>

<kit:dialog bind:open {size}>
	<p style="margin: 0 0 1rem;">Size: <strong>{size}</strong></p>
	<kit:btn onclick={() => (open = false)}>Close</kit:btn>
</kit:dialog>
