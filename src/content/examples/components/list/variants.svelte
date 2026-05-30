<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
	{#each ['filled', 'outline', 'text'] as variant (variant)}
		<kit:list {variant}>
			<kit:list-item is="button">Item one</kit:list-item>
			<kit:list-item is="button" active>Item two</kit:list-item>
			<kit:list-item is="button">Item three</kit:list-item>
		</kit:list>
	{/each}
</div>
