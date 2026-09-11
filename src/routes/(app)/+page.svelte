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
	import GridDirective from '$lib/components/home/grid-directive.svelte';
	import BentoCounter from '$lib/components/home/bento-counter.svelte';
	// import VsCodeUi from '$lib/components/home/modules/ide-code/vs-code-ui.svelte';

	// const h1 = ['components', 'api', 'hooks', 'themes', 'actions'];
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

<section id="vscode-homepage"></section>

<section id="plugins-vs-code">
	<!-- <PreprocessSchema /> -->

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

	<p>It's not magic, It's Lapikit</p>

	<!-- <Components /> -->
</section>

<section id="bento-counter">
	<BentoCounter />
</section>

<section id="grid-components"></section>

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
	#vscode-homepage {
		div {
			margin: -135px auto 0;
			max-width: 1200px;
			width: 100%;
		}
	}
	#plugins-vs-code {
		padding: 110px 40px;
	}
	#grid-components {
		padding: 110px 40px;
	}
	#bento-counter {
		padding: 110px 40px;
	}

	#faq {
		padding: 110px 40px;
	}

	#support-project {
		padding: 110px 40px;
	}

	#compare-with-other-lib {
		padding: 110px 40px;
	}

	#header-homepage {
		position: relative;
		overflow: hidden;
		width: 100%;
		margin-top: -80px; // appbar sticky
		// height: 70vh;
		// margin-top: -80px;
		// padding-bottom: 80px;
		//background: linear-gradient(180deg, #04031a 0%, #0a0834 60%, #140b3f 100%);

		.ambient {
			position: absolute;
			inset: 0;
			z-index: 0;
			pointer-events: none;

			// &::before {
			// 	// sparkles / stars
			// 	content: '';
			// 	position: absolute;
			// 	inset: 0;
			// 	background-repeat: no-repeat;
			// 	// background-image:
			// 	// 	radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent),
			// 	// 	radial-gradient(1px 1px at 60% 18%, #fff, transparent),
			// 	// 	radial-gradient(1.5px 1.5px at 80% 42%, #fff, transparent),
			// 	// 	radial-gradient(2px 2px at 33% 60%, #fff, transparent),
			// 	// 	radial-gradient(1px 1px at 12% 72%, #fff, transparent),
			// 	// 	radial-gradient(1.5px 1.5px at 70% 68%, #fff, transparent),
			// 	// 	radial-gradient(1px 1px at 92% 20%, #fff, transparent),
			// 	// 	radial-gradient(1.5px 1.5px at 45% 12%, #fff, transparent),
			// 	// 	radial-gradient(1px 1px at 5% 45%, #fff, transparent),
			// 	// 	radial-gradient(1.5px 1.5px at 55% 50%, #fff, transparent);
			// 	opacity: 0.7;
			// 	animation: header-sparkle 4s ease-in-out infinite alternate;
			// }

			// &::after {
			// 	// fade the ambient scene into the page background at the bottom edge
			// 	content: '';
			// 	position: absolute;
			// 	inset-inline: 0;
			// 	bottom: 0;
			// 	height: 200px;
			// 	background: linear-gradient(to bottom, transparent, #fff);
			// }
		}

		.glow-orb {
			position: absolute;
			border-radius: 50%;
			filter: blur(50px);
			animation: orb-float ease-in-out infinite alternate;
		}

		.orb-1 {
			width: 300px;
			height: 300px;
			top: 62%;
			left: 58%;
			// background: radial-gradient(
			// 	circle at 35% 35%,
			// 	hsl(275 95% 88%),
			// 	hsl(262 88% 62%) 45%,
			// 	transparent 72%
			// );
			background: radial-gradient(
				circle at 35% 35%,
				var(--kit-color-svelte),
				var(--kit-color-accent) 45%,
				transparent 72%
			);
			animation-duration: 11s;
		}

		.orb-2 {
			width: 220px;
			height: 220px;
			top: 68%;
			left: 30%;
			// background: radial-gradient(
			// 	circle at 35% 35%,
			// 	hsl(220 95% 88%),
			// 	hsl(238 88% 62%) 45%,
			// 	transparent 72%
			// );
			background: radial-gradient(
				circle at 35% 35%,
				var(--kit-color-accent),
				var(--kit-color-svelte),
				transparent 72%
			);
			animation-duration: 9s;
			animation-delay: -3s;
		}

		.orb-3 {
			width: 640px;
			height: 380px;
			bottom: -18%;
			left: 24%;
			filter: blur(75px);
			background: radial-gradient(
				ellipse at 50% 50%,
				var(--kit-color-svelte),
				var(--kit-color-accent) 50%,
				transparent 75%
			);
			animation-duration: 14s;
			animation-delay: -6s;
		}
	}

	@keyframes header-sparkle {
		0% {
			opacity: 0.4;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes orb-float {
		0% {
			transform: translateY(0) scale(1);
		}
		100% {
			transform: translateY(-22px) scale(1.05);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		#header-homepage {
			.ambient::before,
			.glow-orb {
				animation: none;
			}
		}
	}

	#footer-banner {
		--kit-color-footer-banner: hsl(320deg 13.04% 4.51%);
		--kit-color-on-footer-banner: hsl(0 0% 100%);
		background-color: var(--kit-color-footer-banner);
		color: var(--kit-color-on-footer-banner);
		padding: 110px 40px;

		.wrapper > div:first-child {
			display: grid;
			grid-template-columns: 1fr 1fr;

			h2 {
				max-width: 80%;
			}

			> div:last-child {
				// shell and CTA
				max-width: 70%;
				display: flex;
				flex-direction: column;
				gap: 38px;
				margin: 0 0 0 auto;

				> div:last-child {
					display: flex;
					gap: 10px;
				}
			}
		}

		h2 {
			font-size: 4rem;
			letter-spacing: -0.01em;
			line-height: 1.15;
			font-weight: 900;
		}
	}

	.wrapper {
		max-width: var(--app-container-size-compact);
		margin: 0 auto;
		padding-left: 24px;
		padding-right: 24px;
	}
</style>
