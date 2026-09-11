<script>
	import Shell from '$lib/components/shell.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { command } from '$lib/constants';
	import { application } from '$lib/stores/app.svelte';
	import SupportProject from '$lib/components/home/support-project.svelte';
	import ComparLib from '$lib/components/home/compar-lib.svelte';
	import Faq from '$lib/components/home/faq.svelte';
	import BentoCounter from '$lib/components/home/bento-counter.svelte';
	import Components from '$lib/components/home/components.svelte';
	import Header from '$lib/components/home/header.svelte';
	import VsCodeUi from '$lib/components/home/modules/ide-code/vs-code-ui.svelte';
</script>

<section id="header-homepage">
	<Header />
</section>

<section id="vscode-homepage">
	<div>
		<VsCodeUi />
	</div>
</section>

<section id="bento-counter">
	<BentoCounter />
</section>

<section id="grid-components">
	<Components />
</section>

<section id="compare-with-other-lib">
	<ComparLib />
</section>

<section id="faq">
	<Faq />
</section>

<section id="support-project">
	<SupportProject />
</section>

<section id="footer-banner">
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
</section>

<style lang="scss">
	#vscode-homepage {
		div {
			margin: 70px auto 0;
			max-width: 1200px;
			width: 100%;
		}
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
		width: 100%;
		height: 70vh;
		background-color: aliceblue;
		margin-top: -80px;
		padding-bottom: 80px;
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
