<script lang="ts">
	let bold = $state(false);
	let align = $state('left');
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn
		input
		type="checkbox"
		label="Bold"
		variant="outline"
		checked={bold}
		onchange={() => (bold = !bold)}
	/>

	{#each ['left', 'center', 'right'] as value (value)}
		<kit:btn
			input
			type="radio"
			name="align"
			{value}
			label={value}
			variant="tonal"
			color="accent"
			checked={align === value}
			onchange={() => (align = value)}
		/>
	{/each}

	<form onsubmit={(event) => event.preventDefault()}>
		<kit:btn input type="submit" value="Send" color="accent" />
	</form>
</div>

<p>Bold: {bold}, align: {align}</p>
