<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	{#each ['dense', 'compact', 'default', 'comfortable', 'spacious'] as density (density)}
		<kit:appbar rounded="md" {density}>
			<span style="font-weight: 600;">{density}</span>
		</kit:appbar>
	{/each}
</div>
