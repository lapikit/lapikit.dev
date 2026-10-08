<div class="elevation-grid">
	{#each { length: 6 }, index}
		<div class="elevation-item">
			<kit:card class="elevation-card" rounded="lg" elevation={String(index)}>{index}</kit:card>
			<span>[data-elevation='{index}']</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.elevation-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 1.5rem;
	}

	.elevation-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.elevation-item :global(.elevation-card) {
		width: 70%;
		aspect-ratio: 1;
		justify-content: center;
		align-items: center;
	}
</style>
