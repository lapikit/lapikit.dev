<script lang="ts">
	type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
	const sizes: ModalSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

	let size = $state<ModalSize>('md');
	let open = $state(false);

	function show(s: ModalSize) {
		size = s;
		open = true;
	}
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
	{#each sizes as s (s)}
		<kit:btn onclick={() => show(s)}>{s}</kit:btn>
	{/each}
</div>

<kit:modal bind:open {size}>
	<p style="margin: 0 0 1rem; opacity: 0.7;">Size: <strong>{size}</strong></p>
	<kit:btn onclick={() => (open = false)}>Close</kit:btn>
</kit:modal>
