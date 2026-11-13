<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
		<kit:chip variant="outline" {size}>{size}</kit:chip>
	{/each}
</div>
