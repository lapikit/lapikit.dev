<script lang="ts">
	let position = $state<'top' | 'center' | 'bottom'>('center');
	let open = $state(false);

	function show(p: 'top' | 'center' | 'bottom') {
		position = p;
		open = true;
	}
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
	{#each ['top', 'center', 'bottom'] as p (p)}
		<kit:btn variant="outline" onclick={() => show(p as 'top' | 'center' | 'bottom')}>
			{p}
		</kit:btn>
	{/each}
</div>

<kit:dialog bind:open {position}>
	<p style="margin: 0 0 1rem;">Dialog positioned at <strong>{position}</strong>.</p>
	<kit:btn onclick={() => (open = false)}>Close</kit:btn>
</kit:dialog>
