<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	{#each ['dense', 'compact', 'default', 'comfortable', 'spacious'] as density (density)}
		<kit:alert tone="info" variant="tonal" {density}
			>{density} — padding adjusts with density.</kit:alert
		>
	{/each}
</div>
