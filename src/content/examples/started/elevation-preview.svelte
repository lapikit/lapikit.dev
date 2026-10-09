<div class="elevation-grid">
	{#each { length: 6 }, index}
		<div class="elevation-item">
			<kit:sheet class="elevation-card" rounded="lg" elevation={String(index)}>{index}</kit:sheet>
			<span class="text-xs">data-elevation='{index}'</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.elevation-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.elevation-item {
		width: 8rem;
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
