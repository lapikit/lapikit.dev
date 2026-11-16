<script lang="ts">
	let selected = $state(false);
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn color="accent">Palette</kit:btn>
	<kit:btn variant="tonal" color="#e11d48">Custom</kit:btn>
	<kit:btn
		variant="outline"
		color={{ base: 'accent', active: 'success' }}
		active={selected}
		onclick={() => (selected = !selected)}
	>
		{selected ? 'Selected' : 'Select'}
	</kit:btn>
	<kit:btn variant="tonal" color={selected && 'success'}>Follows the selection</kit:btn>
</div>
