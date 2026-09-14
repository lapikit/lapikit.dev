<script>
	import { command } from '$lib/constants';
	import { application } from '$lib/stores/app.svelte';
	import { npmState } from '$lib/stores/npm.svelte';

	// animations
	import GlowOrb from '$lib/components/animations/glow-orb.svelte';

	// modules
	import Advantage from '$lib/components/home/advantage.svelte';
	import PreprocessSchema from '$lib/components/home/preprocess-schema.svelte';
	import ReplComponents from '$lib/components/home/repl-components.svelte';
	import ReplDirective from '$lib/components/home/repl-directive.svelte';
	import Components from '$lib/components/home/components.svelte';
	import ComparLib from '$lib/components/home/compar-lib.svelte';
	import Faq from '$lib/components/home/faq.svelte';
	import SupportProject from '$lib/components/home/support-project.svelte';
	import PrependFooter from '$lib/components/home/prepend-footer.svelte';
	import Header from '$lib/components/home/header.svelte';
	import VsCode from '$lib/components/home/modules/vs-code/vs-code.svelte';

	// states
	const h1 = ['components', 'api', 'hooks', 'themes', 'actions'];
	const advantage = [
		'Your code will be cleaner, with simpler and more legible syntax',
		'Faster, thanks to reuse components and uniform styling',
		'More consistently, with pre-optimized Svelte + TypeScript integration',
		'Stop copying and duplicating CSS classes and start shipping better user interfaces',
		'Take advantage of Svelte 5’s style and class directives directly within your components',
		'The Lili preprocessor handles component imports for you'
	];
</script>

<main class="homepage">
	<section>
		<GlowOrb />
		<Header version={npmState.version.latest} list={h1} />
	</section>
	<section>
		<VsCode />
	</section>
	<section id="lapikit-explore">
		<div class="wrapper">
			<h2>The <span class="accent-text">power</span> to Lapikit</h2>
			<div class="app-grids">
				<div>
					<p>
						Lapikit is a Svelte component library designed by a front-end developer, for front-end
						developers. Lapikit’s goal is to free you from repetitive tasks such as managing
						component imports, duplicate CSS classes, and global components that have to be
						reinvented for every project.
					</p>
					<p>
						The main challenge for projects is time. Lapikit is here to free up your time so you can
						focus on what really matters: building accessible, high-performance, and consistent
						interfaces, without ever sacrificing the flexibility of your code.
					</p>

					<p>Write less, code more!</p>
				</div>
				<div>
					<Advantage list={advantage} />
				</div>
			</div>
			<div class="app-center-content">
				<h2><span class="accent-text">Lili</span> preprocessor</h2>

				<p>
					The Lili preprocessor is at the heart of Lapikit. It ensures that Lapikit components are
					properly structured and allows you to use features such as the `class` and `style`
					directives on Lapikit components. It works as an add-on to the Svelte preprocessor.
				</p>

				<p class="muted-text">
					Currently, it only works with Vite.js. However, we plan to make it compatible with Webpack
					and Rollup soon.
				</p>
			</div>

			<div class="diagram">
				<PreprocessSchema />
			</div>

			<h2>
				The directive <span class="accent-text">class</span> and
				<span class="accent-text">styles</span>
			</h2>

			<div class="app-grids">
				<div>
					<p>
						Since <span class="svelte-text">version 5.16</span>, Svelte has offered directives for
						the <span class="muted-text">`style`</span> and <span class="muted-text">`class`</span>
						properties. This allows you to define class properties with conditions written directly within
						the element, without having to use either a long string with ternary operators or functions
						that directly modify the element. However, this feature is not natively supported in Svelte
						components; with Lapikit’s lili preprocessor, this limitation is overcome for components in
						the Lapikit library.
					</p>
					<p>
						Two directives
						<span class="accent-text">`s-style`</span>
						and <span class="accent-text">`s-class`</span> are available to provide the same convenience
						as native HTML elements.
					</p>
				</div>
				<div>
					<ReplDirective />
				</div>
			</div>

			<h2>Use a <span class="accent-text">Lapikit components</span></h2>

			<div class="app-grids inverse-order">
				<div>
					<ReplComponents />
				</div>
				<div>
					<p>
						With Lapikit and its Lili preprocessor, you can focus on writing your code and calling
						components using the <span class="accent-text">`&lt;kit:*&gt;`</span> directives the preprocessor
						will handle the rest, including imports, proper naming conventions for using Svelte components,
						snippet adaptations, and more.
					</p>
					<p>
						This example gives you a brief overview of how to use Lapikit components. You call a
						list and its children using <span class="accent-text">`&lt;kit:list&gt;`</span> and
						<span class="accent-text">`&lt;kit:list-item&gt;`</span>. Once saved, during
						compilation, the preprocessor formats it for Svelte.
					</p>
				</div>
			</div>
		</div>
		<div class="spacing-wrapper">
			<Components />
		</div>
		<div class="wrapper app-center-content">
			<p class="devise">It's not magic, It's Lapikit</p>
		</div>
	</section>

	<section id="card-home">
		<div class="wrapper">
			<kit:card elevation="3" s-style_overflow="hidden">
				<kit:card-container>
					<div class="app-center-content">
						<h2>
							Why choose <span class="accent-text">Lapikit</span> over other Svelte component libraries?
						</h2>
						<p class="subtitle">Here's how Lapikit compares to other popular Svelte libraries:</p>
					</div>
				</kit:card-container>
				<ComparLib />
			</kit:card>
		</div>
	</section>

	<section id="faq-homepage">
		<div class="wrapper">
			<Faq>
				<h2><span class="accent-text">Common</span> questions</h2>
				<p class="subtitle">Not covered here? Reach out and we'll help</p>
			</Faq>
		</div>
	</section>
	<section id="support">
		<div class="wrapper">
			<SupportProject>
				<h2>
					<span class="muted-text">Free</span> and <span class="muted-text">open-source</span>,
					<br /> Built by the <span class="accent-text">community</span>
				</h2>

				<p class="subtitle">Lapikit welcomes contributions from developers around the world</p>
			</SupportProject>
		</div>
	</section>

	<section>
		<div class="wrapper">
			<PrependFooter commandLine={command[application.pkg_selected]['launch-cli']}>
				<h2>Try it on your project and <span class="accent-text">write low , code more</span></h2>
			</PrependFooter>
		</div>
	</section>
</main>

<style lang="scss">
	.app-grids {
		display: grid;
		grid-template-columns: 1fr;
		gap: 25px;
	}

	.app-center-content {
		display: grid;
		grid-template-columns: 1fr;
		justify-content: center;
		text-align: center;
		row-gap: 25px;
		max-width: 640px;
		margin: 0 auto;
	}

	.spacing-wrapper {
		padding: 110px 0 40px;
	}

	section:first-child {
		position: relative;
		overflow: hidden;
		width: 100%;
		margin-top: -80px; // appbar sticky
	}

	#lapikit-explore {
		padding: 110px 40px;
	}
	#card-home {
		:global(.kit-card) {
			padding: 40px;
		}
	}
	#faq-homepage {
		padding: 110px 40px;
	}
	#support {
		padding: 110px 40px;
	}
	section:last-child {
		--kit-color-footer-banner: hsl(320deg 13.04% 4.51%);
		--kit-color-on-footer-banner: hsl(0 0% 100%);
		background-color: var(--kit-color-footer-banner);
		color: var(--kit-color-on-footer-banner);
		padding: 110px 40px;
	}

	p {
		margin-bottom: 15px;
		line-height: 1.5;
		font-size: 1rem;
	}

	.devise {
		font-size: 1.75rem;
		color: var(--kit-color-text-subtle);
		font-weight: 900;
	}

	.diagram {
		padding: 20px 0;
	}

	:global(.outline) {
		// TW Overwrite
		outline-width: 0px !important;
	}

	.inverse-order {
		> div:last-child {
			order: -1;
		}
	}

	@media (min-width: 720px) {
		.app-grids {
			grid-template-columns: 1fr 1fr;
			gap: 40px;
		}

		.app-center-content {
			row-gap: 40px;
		}

		p {
			margin-bottom: 20px;
			line-height: 1.6;
			font-size: 1.1rem;
		}

		.diagram {
			padding: 20px 0 50px;
		}

		.inverse-order {
			> div:last-child {
				order: initial;
			}
		}
	}
</style>
