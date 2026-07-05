<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; align-items: start;">
	{#each ['none', 'compact', 'default', 'comfortable'] as density (density)}
		<kit:card variant="outline" {density}>
			<kit:card-title>{density}</kit:card-title>
			<kit:card-content>Padding adjusts with density.</kit:card-content>
		</kit:card>
	{/each}
</div>
