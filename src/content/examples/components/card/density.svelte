<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: start;">
	{#each ['compact', 'default', 'comfortable'] as density}
		<kit:card variant="outline" {density}>
			<p class="kit-card__header">{density}</p>
			<p class="kit-card__body">Padding adjusts with density.</p>
		</kit:card>
	{/each}
</div>
