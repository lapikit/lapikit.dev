<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.375rem;">
			<kit:avatar label="AB" {size} />
			<span style="font-size: 0.75rem; opacity: 0.6;">{size}</span>
		</div>
	{/each}
</div>
