<script>
	// import { npmState } from '$lib/stores/npm.svelte';

	// import Shell from '$lib/components/shell.svelte';
	// import { ChevronRight } from 'lucide-svelte';
	// import { command } from '$lib/constants';
	// import { application } from '$lib/stores/app.svelte';
	// import SupportProject from '$lib/components/home/support-project.svelte';
	// import ComparLib from '$lib/components/home/compar-lib.svelte';
	// import Faq from '$lib/components/home/faq.svelte';
	//
	// import Components from '$lib/components/home/components.svelte';
	// import Header from '$lib/components/home/header.svelte';
	// import VsCode from '$lib/components/home/modules/vs-code/vs-code.svelte';
	// import PreprocessSchema from '$lib/components/home/preprocess-schema.svelte';
	// import Repl from '$lib/components/home/repl.svelte';
	// import GridDirective from '$lib/components/home/grid-directive.svelte';
	// import BentoCounter from '$lib/components/home/bento-counter.svelte';

	// import VsCodeUi from '$lib/components/home/modules/ide-code/vs-code-ui.svelte';

	// modules
	import Advantage from '$lib/components/home/advantage.svelte';
	import PreprocessSchema from '$lib/components/home/preprocess-schema.svelte';
	import ReplComponents from '$lib/components/home/repl-components.svelte';
	import ReplDirective from '$lib/components/home/repl-directive.svelte';
	import Components from '$lib/components/home/components.svelte';
	// import { Rocket } from 'lucide-svelte';
	// import Table from '$lib/components/home/table.svelte';

	// states
	// const h1 = ['components', 'api', 'hooks', 'themes', 'actions'];
	const advantage = [
		'Your code will be cleaner, with simpler and more legible syntax',
		'Faster, thanks to reuse components and uniform styling',
		'More consistently, with pre-optimized Svelte + TypeScript integration',
		'Stop copying and duplicating CSS classes and start shipping better user interfaces',
		'Take advantage of Svelte 5’s style and class directives directly within your components',
		'The Lili preprocessor handles component imports for you'
	];
</script>

<!-- <main class="homepage">
	<section id="header-homepage">
		<div class="ambient" aria-hidden="true">
			<span class="glow-orb orb-1"></span>
			<span class="glow-orb orb-2"></span>
			<span class="glow-orb orb-3"></span>
		</div>
		<Header version={npmState.version.latest} list={h1} />
	</section>

	<section class="container-wrapper">
		<div>
			<VsCode />
		</div>
	</section>
</main> -->

<main class="homepage">
	<section>header</section>
	<section>vscode</section>
	<section>bento?</section>
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
		<div>
			<Components />
		</div>
		<div class="wrapper app-center-content">
			<p class="devise">It's not magic, It's Lapikit</p>
		</div>
	</section>

	<section>
		<div class="wrapper">table</div>
	</section>

	<section>
		<div class="wrapper">faq</div>
		<div class="wrapper">support</div>
	</section>

	<section>
		<div class="wrapper">prepend-footer</div>
	</section>
</main>

<!-- <section id="vscode-homepage"></section> -->

<!-- <section id="plugins-vs-code"> -->
<!-- <PreprocessSchema /> -->
<!-- 
	<h2>Expande your possibility</h2>

	<div>
		<p>
			Since version 5.16, Svelte has offered directives for the `style` and `class` properties. This
			allows you to define class properties with conditions written directly within the element,
			without having to use either a long string with ternary operators or functions that directly
			modify the element. However, this feature is not natively supported in Svelte components; with
			Lapikit’s lili preprocessor, this limitation is overcome for components in the Lapikit
			library. Two directives `s-style` and `s-class` are available to provide the same convenience
			as native HTML elements.
		</p>

		<div>
			<kit:btn>Discover this feature</kit:btn>
		</div>
	</div>

	<GridDirective />

	<p>It's not magic, It's Lapikit</p> -->

<!-- <Components /> -->
<!-- </section> -->

<!-- <section id="bento-counter">
	<BentoCounter />
</section>

<section id="grid-components"></section> -->

<!-- <section id="compare-with-other-lib">
	<ComparLib />
</section> -->

<!-- <section id="faq">
	<Faq />
</section>

<section id="support-project">
	<SupportProject />
</section> -->

<!-- <section id="footer-banner">
	<div class="wrapper">
		<div>
			<div>
				<h2>Try it on your project and <span class="accent-text">write low , code more</span></h2>
			</div>
			<div>
				<p>
					Install Lapikit, open the project you were already working on, and run
					<span class="accent-text">{command[application.pkg_selected]['launch-cli']}</span>. In fee
					minutes you can code with lapikit directly in your project
				</p>

				<Shell
					textLink="View install script"
					pathLink="/docs/getting-started#install-lapikit-in-your-project-directory"
					dark
				/>

				<div>
					<kit:btn
						size="lg"
						rounded="lg"
						href="/docs/getting-started"
						background="accent"
						color="on-accent"
					>
						Quickstart
						{#snippet append()}
							<ChevronRight />
						{/snippet}
					</kit:btn>
					<kit:btn
						size="lg"
						rounded="lg"
						variant="outline"
						href="/docs/components"
						color="text-on-dark"
					>
						All components
					</kit:btn>
				</div>
			</div>
		</div>
	</div>
</section> -->

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

	// #vscode-homepage {
	// 	div {
	// 		margin: -135px auto 0;
	// 		max-width: 1200px;
	// 		width: 100%;
	// 	}
	// }
	// #plugins-vs-code {
	// 	padding: 110px 40px;
	// }
	// #grid-components {
	// 	padding: 110px 40px;
	// }
	// #bento-counter {
	// 	padding: 110px 40px;
	// }

	// #faq {
	// 	padding: 110px 40px;
	// }

	// #support-project {
	// 	padding: 110px 40px;
	// }

	// #compare-with-other-lib {
	// 	padding: 110px 40px;
	// }

	// #header-homepage {
	// 	position: relative;
	// 	overflow: hidden;
	// 	width: 100%;
	// 	margin-top: -80px; // appbar sticky
	// 	// height: 70vh;
	// 	// margin-top: -80px;
	// 	// padding-bottom: 80px;
	// 	//background: linear-gradient(180deg, #04031a 0%, #0a0834 60%, #140b3f 100%);

	// 	.ambient {
	// 		position: absolute;
	// 		inset: 0;
	// 		z-index: 0;
	// 		pointer-events: none;

	// 		// &::before {
	// 		// 	// sparkles / stars
	// 		// 	content: '';
	// 		// 	position: absolute;
	// 		// 	inset: 0;
	// 		// 	background-repeat: no-repeat;
	// 		// 	// background-image:
	// 		// 	// 	radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent),
	// 		// 	// 	radial-gradient(1px 1px at 60% 18%, #fff, transparent),
	// 		// 	// 	radial-gradient(1.5px 1.5px at 80% 42%, #fff, transparent),
	// 		// 	// 	radial-gradient(2px 2px at 33% 60%, #fff, transparent),
	// 		// 	// 	radial-gradient(1px 1px at 12% 72%, #fff, transparent),
	// 		// 	// 	radial-gradient(1.5px 1.5px at 70% 68%, #fff, transparent),
	// 		// 	// 	radial-gradient(1px 1px at 92% 20%, #fff, transparent),
	// 		// 	// 	radial-gradient(1.5px 1.5px at 45% 12%, #fff, transparent),
	// 		// 	// 	radial-gradient(1px 1px at 5% 45%, #fff, transparent),
	// 		// 	// 	radial-gradient(1.5px 1.5px at 55% 50%, #fff, transparent);
	// 		// 	opacity: 0.7;
	// 		// 	animation: header-sparkle 4s ease-in-out infinite alternate;
	// 		// }

	// 		// &::after {
	// 		// 	// fade the ambient scene into the page background at the bottom edge
	// 		// 	content: '';
	// 		// 	position: absolute;
	// 		// 	inset-inline: 0;
	// 		// 	bottom: 0;
	// 		// 	height: 200px;
	// 		// 	background: linear-gradient(to bottom, transparent, #fff);
	// 		// }
	// 	}

	// 	.glow-orb {
	// 		position: absolute;
	// 		border-radius: 50%;
	// 		filter: blur(50px);
	// 		animation: orb-float ease-in-out infinite alternate;
	// 	}

	// 	.orb-1 {
	// 		width: 300px;
	// 		height: 300px;
	// 		top: 62%;
	// 		left: 58%;
	// 		// background: radial-gradient(
	// 		// 	circle at 35% 35%,
	// 		// 	hsl(275 95% 88%),
	// 		// 	hsl(262 88% 62%) 45%,
	// 		// 	transparent 72%
	// 		// );
	// 		background: radial-gradient(
	// 			circle at 35% 35%,
	// 			var(--kit-color-svelte),
	// 			var(--kit-color-accent) 45%,
	// 			transparent 72%
	// 		);
	// 		animation-duration: 11s;
	// 	}

	// 	.orb-2 {
	// 		width: 220px;
	// 		height: 220px;
	// 		top: 68%;
	// 		left: 30%;
	// 		// background: radial-gradient(
	// 		// 	circle at 35% 35%,
	// 		// 	hsl(220 95% 88%),
	// 		// 	hsl(238 88% 62%) 45%,
	// 		// 	transparent 72%
	// 		// );
	// 		background: radial-gradient(
	// 			circle at 35% 35%,
	// 			var(--kit-color-accent),
	// 			var(--kit-color-svelte),
	// 			transparent 72%
	// 		);
	// 		animation-duration: 9s;
	// 		animation-delay: -3s;
	// 	}

	// 	.orb-3 {
	// 		width: 640px;
	// 		height: 380px;
	// 		bottom: -18%;
	// 		left: 24%;
	// 		filter: blur(75px);
	// 		background: radial-gradient(
	// 			ellipse at 50% 50%,
	// 			var(--kit-color-svelte),
	// 			var(--kit-color-accent) 50%,
	// 			transparent 75%
	// 		);
	// 		animation-duration: 14s;
	// 		animation-delay: -6s;
	// 	}
	// }

	// @keyframes header-sparkle {
	// 	0% {
	// 		opacity: 0.4;
	// 	}
	// 	100% {
	// 		opacity: 1;
	// 	}
	// }

	// @keyframes orb-float {
	// 	0% {
	// 		transform: translateY(0) scale(1);
	// 	}
	// 	100% {
	// 		transform: translateY(-22px) scale(1.05);
	// 	}
	// }

	// @media (prefers-reduced-motion: reduce) {
	// 	#header-homepage {
	// 		.ambient::before,
	// 		.glow-orb {
	// 			animation: none;
	// 		}
	// 	}
	// }

	// #footer-banner {
	// 	--kit-color-footer-banner: hsl(320deg 13.04% 4.51%);
	// 	--kit-color-on-footer-banner: hsl(0 0% 100%);
	// 	background-color: var(--kit-color-footer-banner);
	// 	color: var(--kit-color-on-footer-banner);
	// 	padding: 110px 40px;

	// 	.wrapper > div:first-child {
	// 		display: grid;
	// 		grid-template-columns: 1fr 1fr;

	// 		h2 {
	// 			max-width: 80%;
	// 		}

	// 		> div:last-child {
	// 			// shell and CTA
	// 			max-width: 70%;
	// 			display: flex;
	// 			flex-direction: column;
	// 			gap: 38px;
	// 			margin: 0 0 0 auto;

	// 			> div:last-child {
	// 				display: flex;
	// 				gap: 10px;
	// 			}
	// 		}
	// 	}

	// 	h2 {
	// 		font-size: 4rem;
	// 		letter-spacing: -0.01em;
	// 		line-height: 1.15;
	// 		font-weight: 900;
	// 	}
	// }

	// // .wrapper {
	// // 	max-width: var(--app-container-size-compact);
	// // 	margin: 0 auto;
	// // 	padding-left: 24px;
	// // 	padding-right: 24px;
	// // }
</style>
