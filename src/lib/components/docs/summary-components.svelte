<script lang="ts">
	import { docsNavigation } from '$lib/router';

	const components = docsNavigation.find((section) => section.label === 'Components')?.pages ?? [];
</script>

<div class="components-grid-evol">
	{#each components as { label, url, description, image } (label)}
		{#if label !== 'All components'}
			<kit:card href={url} density="comfortable" elevation={{ base: 0, hover: 2 }}>
				<kit:card-media s-style_border-color="transparent">
					<kit:aspect-ratio ratio="16/9">
						<img src={image} alt={label} />
					</kit:aspect-ratio>
				</kit:card-media>

				<kit:card-container class="component-card-container">
					<kit:card-title class="component-card-title">{label}</kit:card-title>
					{#if description}
						<kit:card-content>
							{description}
						</kit:card-content>
					{/if}
				</kit:card-container>
			</kit:card>
		{/if}
	{/each}
</div>

<style lang="scss">
	img {
		border: 0;
	}

	.components-grid-evol {
		display: grid;
		gap: 8px;
		grid-template-columns: 1fr;
		margin-bottom: 20px;

		@media (min-width: 520px) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: 840px) {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 10px;
		}
	}

	:global(.component-card-container) {
		display: grid;
		gap: 1.25rem;
	}

	:global(.component-card-title) {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
</style>
