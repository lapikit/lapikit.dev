<script lang="ts">
	import { docsNavigation } from '$lib';

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

				<kit:card-container class="grid gap-5">
					<kit:card-title class="text-xl">{label}</kit:card-title>
					{#if description}
						<kit:card-content class="text-md">
							{description}
						</kit:card-content>
					{/if}
				</kit:card-container>
			</kit:card>
		{/if}
	{/each}
</div>

<style>
	img {
		border: 0;
	}

	.components-grid-evol {
		display: grid;
		gap: 8px;
		grid-template-columns: 1fr;
		margin-bottom: 20px;
	}

	@media (min-width: 520px) {
		.components-grid-evol {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 840px) {
		.components-grid-evol {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 10px;
		}
	}
</style>
