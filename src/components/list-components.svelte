<script lang="ts">
	import { docsNavigation } from '$lib';

	const components = docsNavigation.find((section) => section.label === 'Components')?.pages ?? [];
</script>

<div class="components-grid">
	{#each components as { label, url, description, image } (label)}
		{#if description}
			<kit:card href={url}>
				{#if image}
					<div class="kit-card__media">
						<kit:aspect-ratio ratio="4/3" style="border-radius: var(--kit-radius-2);">
							<img src={image} alt={label} />
						</kit:aspect-ratio>
					</div>
				{:else}
					<div class="kit-card__media">
						<kit:aspect-ratio ratio="4/3">
							<div class="placeholder">{label[0]}</div>
						</kit:aspect-ratio>
					</div>
				{/if}
				<div class="card-text">
					<p class="kit-card__header">{label}</p>
					{#if description}
						<p class="kit-card__body">{description}</p>
					{/if}
				</div>
			</kit:card>
		{/if}
	{/each}
</div>

<style>
	.components-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.components-grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}

	@media (max-width: 639px) {
		.components-grid :global(.kit-card) {
			flex-direction: row;
			align-items: center;
		}

		.components-grid :global(.kit-card__media) {
			aspect-ratio: 4 / 3;
			flex-shrink: 0;
		}

		.components-grid :global(.card-text) {
			display: flex;
			flex-direction: column;
		}
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
		text-transform: uppercase;
		background: var(--kit-color-surface);
		color: var(--kit-color-on-surface-variant);
	}

	img {
		border-radius: var(--kit-radius-2);
	}
</style>
