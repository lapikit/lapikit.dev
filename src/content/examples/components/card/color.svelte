<script lang="ts">
	let selected = $state(false);
</script>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
	<kit:card color="primary">
		<kit:card-title>Palette</kit:card-title>
		<kit:card-content>A color of the palette, the text color follows.</kit:card-content>
	</kit:card>

	<kit:card variant="tonal" color="#e11d48">
		<kit:card-title>Custom</kit:card-title>
		<kit:card-content>Any CSS color works too.</kit:card-content>
	</kit:card>

	<kit:card
		variant="outline"
		color={{ base: 'primary', active: 'success' }}
		active={selected}
		onclick={() => (selected = !selected)}
	>
		<kit:card-title color="success">Active color</kit:card-title>
		<kit:card-content>Click to toggle the active state.</kit:card-content>
	</kit:card>
</div>
