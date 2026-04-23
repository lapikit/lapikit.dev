<div style="display: flex; align-items: center; gap: 0.75rem;">
	{#each ['compact', 'default', 'comfortable'] as density}
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.375rem;">
			<kit:avatar label="AB" {density} />
			<span style="font-size: 0.75rem; opacity: 0.6;">{density}</span>
		</div>
	{/each}
</div>
