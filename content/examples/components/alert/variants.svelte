<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text'] as variant (variant)}
		<kit:alert tone="info" {variant}
			>{variant} — the info tone with the {variant} variant.</kit:alert
		>
	{/each}
</div>
