<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size}
		<kit:btn {size}>{size}</kit:btn>
	{/each}
</div>
