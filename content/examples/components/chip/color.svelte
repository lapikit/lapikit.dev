<script lang="ts">
	let selected = $state(false);
</script>

<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	<kit:chip color="success">Palette</kit:chip>
	<kit:chip variant="tonal" color="#e11d48">Custom</kit:chip>
	<kit:chip
		variant="outline"
		color={{ base: 'accent', active: 'success' }}
		active={selected}
		onclick={() => (selected = !selected)}
	>
		{selected ? 'Selected' : 'Select'}
	</kit:chip>
	<kit:chip variant="tonal" color={selected && 'success'}>Follows the selection</kit:chip>
</div>
