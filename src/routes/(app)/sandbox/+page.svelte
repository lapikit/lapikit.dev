<script lang="ts">
	import BentoCounter from '$lib/components/home/bento-counter.svelte';
	import Faq from '$lib/components/home/faq.svelte';
	import Features from '$lib/components/home/features.svelte';

	// modules
	import Hero from '$lib/components/home/hero.svelte';
	import ReplComponentList from '$lib/components/home/repl-component-list.svelte';
	import ReplShortInstall from '$lib/components/home/repl-short-install.svelte';
	import Table from '$lib/components/home/table.svelte';
	import Testimonials from '$lib/components/home/testimonials.svelte';
	import { ArrowRight, BadgeCheck } from 'lucide-svelte';

	// states
	const validArg = [
		'Your code will be cleaner, with simpler and more legible syntax',
		'Faster, thanks to reuse components and uniform styling',
		'More consistently, with pre-optimized Svelte + TypeScript integration',
		'Stop copying and duplicating CSS classes and start shipping better user interfaces'
	];
</script>

<Hero />

<BentoCounter />

<section>
	<div>
		<div class="bento-discover layout_grid_2_column center-last-child">
			<div id="why-lapikit-is-cool">
				<h2>Stop building from scratch</h2>
				<p class="paragraphe-ws">
					With Lapikit, you can easily create and manage your components, making your development
					process more efficient
				</p>
				<p class="paragraphe-ws">
					Why waste time developing the same UI components on each project? With raw TailwindCSS,
					every button, card, and modal becomes a collection of repeating class blocks that clutter
					your codebase and complicate maintenance. Lapikit allows you to focus on what matters
					most: developing exceptional user experiences by delivering ready-to-use, customisable,
					and type-safe Svelte components
				</p>
				<p class="paragraphe-ws">With Lapikit, you write less but build more:</p>

				<ul>
					{#each validArg as argument (argument)}
						<li>
							<kit:icon color="success"><BadgeCheck /></kit:icon>
							{@html argument}
						</li>
					{/each}
				</ul>
			</div>
			<div id="example-use-list-component">
				<ReplComponentList />
			</div>

			<div id="process-to-install-rapidly">
				<ReplShortInstall />
			</div>

			<div id="get-started-in-seconds">
				<h2>Get started in seconds</h2>
				<p class="paragraphe-ws">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi culpa odit, quisquam
					reprehenderit sunt officiis necessitatibus!
				</p>

				<p class="paragraphe-ws">With Lapikit, you write less but build more:</p>

				<kit:btn size="lg" href="/docs/getting-started">
					Installation Guide
					{#snippet append()}
						<kit:icon>
							<ArrowRight />
						</kit:icon>
					{/snippet}
				</kit:btn>
				<p style:color="var(--kit-color-text-muted)">Works with Vite</p>
			</div>
		</div>
	</div>
</section>

<Features />

<Table />

<Testimonials />

<Faq />

<section id="footer-banner">
	<div>
		<h2>Explore the futur library components on your apps</h2>

		<p class="paragraphe-ws">
			Simple setup, intuitive and natural use, Svelte-focused optimization with Runes—so, shall we
			get started?
		</p>

		<div>
			<kit:btn href="/docs/getting-started">Get started with Lapikit</kit:btn>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		max-width: 1538px;
		padding-left: 24px;
		padding-right: 24px;
		margin: 40px auto;

		h2 {
			font-size: 24px;
			line-height: 1;
			width: fit-content;
			margin-bottom: 40px;
		}

		p.paragraphe-ws {
			max-width: 80%;
			margin: 12px 0;
		}

		ul > li {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 10px;
		}

		.bento-discover {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			grid-auto-rows: minmax(180px, auto);
			gap: 1rem;
			grid-template-areas:
				'whylapikit				  '
				'repllistcomponent		  '
				'getstarted   			  '
				'replprocessinstall       ';
			row-gap: 60px;
			padding-top: 80px;
			padding-bottom: 80px;
		}

		#why-lapikit-is-cool {
			grid-area: whylapikit;
		}
		#example-use-list-component {
			grid-area: repllistcomponent;
		}
		#process-to-install-rapidly {
			grid-area: replprocessinstall;
		}
		#get-started-in-seconds {
			grid-area: getstarted;
		}

		&#footer-banner {
			display: grid;
			max-width: 640px;
			gap: 20px;
			text-align: center;
			margin: 0 auto;
			padding-left: 24px;
			padding-right: 24px;

			p {
				margin: 0 auto 24px;
			}
		}

		@media (max-width: 560px) {
			#example-use-list-component,
			#process-to-install-rapidly {
				width: 100%;
			}
		}

		@media (min-width: 640px) {
			h2 {
				font-size: 48px;
				line-height: 1;
			}

			&#footer-banner {
				gap: 40px;

				p {
					margin: 0 auto 40px;
				}
			}
		}

		@media (max-width: 1024px) {
			text-align: center;

			h2 {
				margin: 0 auto 40px;
			}
			p.paragraphe-ws {
				margin: 12px auto;
			}

			ul > li {
				justify-content: center;
			}

			#get-started-in-seconds {
				margin-top: 100px;
			}

			#example-use-list-component,
			#process-to-install-rapidly {
				margin: 0 auto;
			}
		}

		@media (min-width: 1024px) {
			h2 {
				font-size: 48px;
				line-height: 1;
			}

			.bento-discover {
				grid-template-columns: repeat(20, 1fr);
				grid-template-areas: none;
				align-items: center;
				column-gap: 50px;
				row-gap: 180px;
				padding-top: 80px;
				padding-bottom: 100px;
			}

			#why-lapikit-is-cool {
				grid-area: 1 / 1 / 2 / 14;
			}
			#example-use-list-component {
				grid-area: 1 / 12 / 1 / 21;
			}

			// row 2 : 35% / 65%
			#process-to-install-rapidly {
				grid-area: 2 / 1 / 3 / 8;
			}
			#get-started-in-seconds {
				grid-area: 2 / 8 / 3 / 21;
			}
		}
	}
</style>
