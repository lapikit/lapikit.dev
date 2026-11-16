<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	{#each ['dense', 'compact', 'default', 'comfortable', 'spacious'] as density (density)}
		<kit:btn variant="outline" {density}>{density}</kit:btn>
	{/each}
</div>
