<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; padding: 2rem 0;">
	{#each ['top', 'bottom', 'left', 'right'] as location}
		<kit:tooltip {location} label={`Location: ${location}`}>
			<kit:btn variant="outline">{location}</kit:btn>
		</kit:tooltip>
	{/each}
</div>
