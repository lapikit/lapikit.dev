<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text', 'plain'] as variant (variant)}
		<kit:list {variant} color="accent">
			<kit:list-item is="button">{variant}</kit:list-item>
			<kit:list-item is="button" active>Item two</kit:list-item>
			<kit:list-item is="button">Item three</kit:list-item>
		</kit:list>
	{/each}
</div>
