<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text', 'plain', 'link'] as variant (variant)}
		<kit:btn {variant} color="accent">{variant}</kit:btn>
	{/each}
</div>
