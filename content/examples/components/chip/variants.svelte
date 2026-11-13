<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text', 'plain'] as variant (variant)}
		<kit:chip {variant} color="accent">{variant}</kit:chip>
	{/each}
</div>
