<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text'] as variant (variant)}
		<kit:appbar rounded="md" {variant} color="accent">
			<span style="font-weight: 600;">{variant}</span>
		</kit:appbar>
	{/each}
</div>
