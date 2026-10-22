<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: start;">
	{#each ['dense', 'compact', 'default', 'comfortable', 'spacious'] as density (density)}
		<kit:card variant="outline" {density}>
			<kit:card-title>{density}</kit:card-title>
			<kit:card-content>Padding and gap adjust with density.</kit:card-content>
		</kit:card>
	{/each}
</div>
