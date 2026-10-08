<script lang="ts">
	let variant = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
</script>

<div class="shape-grid">
	{#each variant as item (item)}
		<div class="shape-item">
			<kit:card class="shape-card" rounded={item}>{item}</kit:card>
			<span>--shape-{item}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.shape-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 1.5rem;
	}

	.shape-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.shape-item :global(.shape-card) {
		width: 70%;
		aspect-ratio: 1;
		justify-content: center;
		align-items: center;
	}
</style>
