<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	{#each ['dense', 'compact', 'default', 'comfortable', 'spacious'] as density (density)}
		<kit:chip variant="outline" {density}>{density}</kit:chip>
	{/each}
</div>
