<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text', 'plain'] as variant (variant)}
		<kit:card {variant}>
			<kit:card-title>{variant}</kit:card-title>
			<kit:card-content>Variant <code>{variant}</code>.</kit:card-content>
		</kit:card>
	{/each}
</div>
