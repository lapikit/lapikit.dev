<script lang="ts">
	import { Box, ChartSpline, Images, Sparkles, SwatchBook } from 'lucide-svelte';

	// assets
	import TypeScriptIcon from '$lib/assets/icons/typescript.svg?raw';
	import SvelteIcon from '$lib/assets/icons/svelte.svg?raw';

	const features = [
		// {
		// 	icon: Sparkles,
		// 	title: {
		// 		en: 'Lightweight and fast'
		// 	},
		// 	description: {
		// 		en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications'
		// 	}
		// },
		{
			icon: ChartSpline,
			title: {
				en: 'Transition and animations'
			},
			description: {
				en: 'You can easily add transitions and animations to your components thanks to built-in support for major animation libraries'
			}
		},
		{
			icon: Images,
			title: {
				en: 'Scoped styles'
			},
			description: {
				en: 'All styles are scoped to their specific components, preventing style leakage and maintaining consistent design throughout the application'
			}
		},
		{
			icon: Box,
			title: {
				en: 'Reusable components'
			},
			description: {
				en: 'A comprehensive library of pre-built, accessible, and customisable UI components to accelerate your development process'
			}
		},
		{
			icon: SwatchBook,
			title: {
				en: 'Customizable themes'
			},
			description: {
				en: "Includes light and dark themes that may be easily customized to match your brand's colors"
			}
		},
		{
			icon: TypeScriptIcon,
			title: {
				en: 'Typescript support'
			},
			description: {
				en: 'Lapikit, which is written in TypeScript, comes pre-loaded with type definitions for a better developer experience'
			}
		}
		// {
		// 	icon: SvelteIcon,
		// 	title: {
		// 		en: 'SvelteKit friendly'
		// 	},
		// 	description: {
		// 		en: 'Lapikit is built on SvelteKit and fully supports its capabilities such as routing, server-side rendering, and static site generation'
		// 	}
		// }
	];
</script>

<div class="custom-grid">
	{#each features as { title, description, icon } (title)}
		<kit:card background="surface-2">
			<kit:card-container>
				<div>
					{#if typeof icon === 'string'}
						<kit:icon size="xl">
							{@html icon}
						</kit:icon>
					{:else}
						{@const FeatureIcon = icon}

						<kit:icon size="xl">
							<FeatureIcon />
						</kit:icon>
					{/if}
				</div>
				<kit:separator />
				<kit:card-content>
					<p>{description['en']}</p>
				</kit:card-content>
			</kit:card-container>
			<kit:card-actions>
				{#if typeof icon === 'string'}
					<kit:icon size="xl">
						{@html icon}
					</kit:icon>
				{:else}
					{@const FeatureIcon = icon}

					<kit:icon size="xl">
						<FeatureIcon />
					</kit:icon>
				{/if}
				<kit:spacer />
				<p>{title['en']}</p>
			</kit:card-actions>
		</kit:card>
	{/each}
</div>

<style lang="scss">
	.custom-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;

		:global(.kit-card) {
			grid-column: span 1;
		}

		@media (min-width: 520px) {
			grid-template-columns: repeat(6, 1fr);
			gap: 10px;

			:global(.kit-card) {
				grid-column: span 3;
			}
		}

		@media (min-width: 876px) {
			grid-template-columns: repeat(6, 1fr);
			gap: 16px;

			:global(.kit-card) {
				grid-column: span 2;
			}
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(12, 1fr);
			gap: 16px;

			:global(.kit-card) {
				grid-column: span 4;
			}
		}

		@media (min-width: 1200px) {
			grid-template-columns: repeat(15, 1fr);
			gap: 16px;

			:global(.kit-card) {
				grid-column: span 3;
			}
		}
	}
</style>
