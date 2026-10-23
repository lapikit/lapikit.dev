<div style="max-width: 360px; display: flex; flex-direction: column; gap: 1rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text'] as variant (variant)}
		<kit:textfield {variant} color="accent" placeholder={variant} />
	{/each}
</div>
