<script lang="ts">
	//assets
	import { ArrowRight, Box, ChartSpline, Images, Sparkles, SwatchBook } from 'lucide-svelte';
	import TypeScriptIcon from '$lib/assets/icons/typescript.svg?raw';
	import SvelteIcon from '$lib/assets/icons/svelte.svg?raw';
	import { capitalize } from '$lib/utils';

	// states
	const enableFeatures = [
		{
			icon: Sparkles,
			title: {
				en: 'Lightweight and fast'
			},
			description: {
				en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications'
			}
		},
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
		},
		{
			icon: SvelteIcon,
			title: {
				en: 'SvelteKit friendly'
			},
			description: {
				en: 'Lapikit is built on SvelteKit and fully supports its capabilities such as routing, server-side rendering, and static site generation'
			}
		}
	];
</script>

<section>
	<div>
		<h2>Discover what functionalities are available for your application</h2>
		<p>
			Lapikit is a component library with a variety of features to help you create beautiful and
			functional web applications. Here are some of the features you can make use of:
		</p>
	</div>
	<div>
		<ul>
			{#each enableFeatures as { title, description, icon } (title)}
				<li>
					<div>
						<div style="color: var(--kit-color-accent)">
							{#if typeof icon === 'string'}
								<kit:icon size="xl" color="accent">
									{@html icon}
								</kit:icon>
							{:else}
								{@const FeatureIcon = icon}

								<kit:icon size="xl" color="accent">
									<FeatureIcon />
								</kit:icon>
							{/if}
						</div>
						<div>
							<p>{title['en']}</p>
							<p>{description['en']}</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<div>
			<kit:btn href="/docs" size="lg" background="accent" color="on-accent">
				{capitalize(`it's not over yet!`)}
				{#snippet append()}
					<kit:icon>
						<ArrowRight />
					</kit:icon>
				{/snippet}
			</kit:btn>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		max-width: 1538px;
		margin: -50px auto 0;
		padding-left: 24px;
		padding-right: 24px;

		h2 {
			font-size: 24px;
			line-height: 1;
			width: fit-content;
			margin-bottom: 40px;
		}

		> div:nth-child(2) {
			margin-top: 60px;

			ul {
				display: grid;
				gap: 24px;
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					div {
						> div:last-child {
							p:first-child {
								margin-bottom: 0.25rem;
								font-weight: 700;
							}
						}
					}
				}
			}
		}

		> div:last-child {
			margin-top: 60px;
		}

		@media (min-width: 640px) {
			h2 {
				font-size: 48px;
				line-height: 1;
			}

			> div:nth-child(2) {
				ul {
					grid-template-columns: repeat(2, minmax(0, 1fr));
				}
			}

			> div:last-child {
				display: flex;
				justify-content: center;
			}
		}

		@media (min-width: 1024px) {
			> div:nth-child(2) {
				ul {
					grid-template-columns: repeat(3, minmax(0, 1fr));
				}
			}
		}

		@media (min-width: 1280px) {
			> div:nth-child(2) {
				ul {
					grid-template-columns: repeat(4, minmax(0, 1fr));
				}
			}
		}
	}
</style>
