<script>
	import { command } from '$lib/constants';
	import { application } from '$lib/stores/app.svelte';
	import { npmState } from '$lib/stores/npm.svelte';

	// data
	import {
		replComponentPreCompil,
		replComponentSvelte,
		replDirectivePreCompil,
		replDirectiveSvelte
	} from '../../content/app/code';
	import { advantageHome } from '../../content/app/advantage';

	// animations
	import GlowOrb from '$lib/components/animations/glow-orb.svelte';

	// modules
	import Advantage from '$lib/components/home/advantage.svelte';
	import PreprocessSchema from '$lib/components/home/preprocess-schema.svelte';
	import Components from '$lib/components/home/components.svelte';
	import ComparLib from '$lib/components/home/datatable.svelte';
	import Faq from '$lib/components/home/faq.svelte';
	import OpenSource from '$lib/components/home/open-source.svelte';
	import PrependFooter from '$lib/components/home/prepend-footer.svelte';
	import Header from '$lib/components/home/header.svelte';
	import VsCode from '$lib/components/home/vs-code/vs-code.svelte';
	import Repl from '$lib/components/home/repl.svelte';
	import { BookOpenText, Boxes } from 'lucide-svelte';

	// states
	const h1 = ['components', 'api', 'hooks', 'themes', 'actions'];
	const version = $derived(npmState.version.latest);
</script>

<main class="homepage">
	<section>
		<Header {version} list={h1}>
			{#snippet animation()}
				<GlowOrb />
			{/snippet}
			<VsCode {version} />
		</Header>
	</section>

	<section>
		<div class="wrapper compact-top-wrapper">
			<h2 class="title-xl">The <span class="accent-text">power</span> of Lapikit</h2>
			<div class="app-grids">
				<div>
					<p>
						Lapikit is an open-source Svelte component library built by front-end developer, for
						front-end developers. The goal of Lapikit is to free you from repetitive tasks such as
						managing component imports, duplicate CSS classes, and global components that have to be
						reinvented for every project.
					</p>
					<p>
						The main challenge for projects is time. Lapikit is here to free up your time so you can
						focus on what really matters: building accessible, high-performance, and consistent
						interfaces, without ever sacrificing the flexibility of your code.
					</p>
				</div>
				<div>
					<Advantage list={advantageHome} />
				</div>
			</div>
			<div class="app-center-content">
				<h2 class="title-xl">
					<span class="accent-text">Lili</span> preprocessor: it’s at the core of Lapikit
				</h2>

				<p>
					Lili is the Svelte preprocessor used by Lapikit to transform its custom component syntax
					at compile time.
				</p>

				<p>
					It ensures that Lapikit components are properly structured and allows you to use features
					such as the `class` and `style` directives on Lapikit components; it works as an extension
					of the Svelte preprocessor.
				</p>

				<p class="muted-text text-sm">Coming soon: compatibility with Webpack and Rollup</p>

				<kit:btn
					href="/docs/essentials/class-and-style"
					variant="outline"
					color="accent"
					s-style_width="fit-content"
					s-style_margin="0 auto"
					rounded="lg"
				>
					{#snippet prepend()}
						<kit:icon>
							<BookOpenText />
						</kit:icon>
					{/snippet}
					Learn more about <br class="mobile-break" />the preprocessor
				</kit:btn>
			</div>

			<div class="diagram">
				<PreprocessSchema />
			</div>

			<h2 class="title-xl">
				Class and Style Binding with <span class="accent-text">s-class</span> and
				<span class="accent-text">s-style</span>
			</h2>

			<div class="app-grids">
				<div>
					<p>
						Svelte offers a directive-based approach for the <span class="muted-text">`style`</span>
						and <span class="muted-text">`class`</span> properties through its new directives dedicated
						to these properties. You can now define your dynamic classes directly within your elements,
						which makes the code much more fluid and readable by eliminating the need for complex ternary
						operators or tedious manipulations.
					</p>
					<p>But what role does the Lili preprocessor play in all of this?</p>
					<p>
						To top it all off, the Lapikit Lili preprocessor further enhances this experience by
						extending this handy feature to all components in the Lapikit library, giving you
						optimal flexibility for your projects!
					</p>
					<p>
						Two directives
						<span class="accent-text">`s-style`</span>
						and <span class="accent-text">`s-class`</span> are available to provide the same convenience
						as native HTML elements.
					</p>
				</div>
				<div>
					<Repl code={replDirectiveSvelte} render={replDirectivePreCompil} />
				</div>
			</div>

			<h2 class="title-xl">
				Use Lapikit components with the <span class="accent-text">&lt;kit:*&gt;</span> syntax
			</h2>

			<div class="app-grids inverse-order">
				<div>
					<Repl code={replComponentSvelte} render={replComponentPreCompil} />
				</div>
				<div>
					<p>
						With Lapikit and the Lili preprocessor, you can focus on writing your code and calling
						components using the <span class="accent-text">`&lt;kit:*&gt;`</span> directives the preprocessor
						will handle the rest, including imports, proper naming conventions for using Svelte components,
						snippet adaptations, and more.
					</p>
					<p>
						Here's a quick example of how Lapikit components work. Use <span class="accent-text"
							>`&lt;kit:list&gt;`</span
						>
						and <span class="accent-text">`&lt;kit:list-item&gt;`</span> directly in your Svelte template,
						and Lili transforms the syntax at compile time while handling the corresponding component
						imports.
					</p>

					<p>
						The example below shows the same List component using the <span class="accent-text"
							>`&lt;kit:*&gt;`</span
						> syntax and standard Svelte imports.
					</p>

					<kit:btn
						variant="outline"
						color="accent"
						href="/docs/essentials/template-syntax"
						rounded="lg"
					>
						{#snippet prepend()}
							<kit:icon>
								<BookOpenText />
							</kit:icon>
						{/snippet}
						Learn more about the Lapikit <br class="mobile-break" />template syntax
					</kit:btn>
				</div>
			</div>
		</div>
		<div class="spacing-wrapper">
			<Components />

			<div class="app-center-content wrapper-gutter">
				<p class="devise">It's not magic, It's Lapikit</p>

				<p>
					Lapikit includes reusable Svelte components for interface patterns such as buttons, text
					fields, cards, dialog boxes, drop-down menus, accordions, lists, tooltips, navigation
					elements, and more. These components work in tandem with Lapikit themes, stylesheets,
					hooks, and the Lili preprocessor.
				</p>

				<kit:btn
					href="/docs/components"
					variant="outline"
					color="accent"
					s-style_width="fit-content"
					s-style_margin="0 auto"
					rounded="lg"
				>
					{#snippet prepend()}
						<kit:icon>
							<Boxes />
						</kit:icon>
					{/snippet}
					Explore all Svelte components
				</kit:btn>
			</div>
		</div>
	</section>

	<section>
		<div class="wrapper wrapper-compact">
			<kit:card elevation="3" s-style_overflow="hidden" s-style_padding="24px">
				<kit:card-container>
					<div class="app-center-content">
						<h2 class="title-xl">
							Why choose <span class="accent-text">Lapikit</span> over other Svelte component libraries?
						</h2>
						<p class="subtitle">Here's how Lapikit compares to other popular Svelte libraries:</p>
					</div>
				</kit:card-container>
				<ComparLib />
			</kit:card>
		</div>
	</section>

	<section>
		<div class="wrapper">
			<Faq>
				<h2 class="title-xl"><span class="accent-text">Common questions</span> about Lapikit</h2>
				<p class="subtitle">
					Can't find the answer to your question here? Contact us we're here to help.
				</p>
			</Faq>
		</div>
	</section>
	<section>
		<div class="wrapper">
			<OpenSource>
				<h2 class="title-xl">
					<span class="muted-text">Free</span> and <span class="muted-text">open-source</span>,
					<br /> Built by the <span class="accent-text">community</span>
				</h2>

				{#if npmState.downloads}
					<p class="subtitle">
						Already {npmState.downloads} downloads on <span class="npm-text">NPM</span>.
					</p>
				{/if}

				<p class="subtitle">
					Why not you? We welcome contributions from developers around the world. <br />
					Help grow the community and share your projects built with Lapikit with us.
				</p>
			</OpenSource>
		</div>
	</section>

	<section>
		<div class="wrapper app-grids">
			<PrependFooter commandLine={command[application.pkg_selected]['launch-cli']}>
				<h2 class="title-xl">
					Try it on your project and <span class="accent-text">write less , code more</span>
				</h2>
			</PrependFooter>
		</div>
	</section>
</main>

<style lang="scss">
	.app-grids {
		display: grid;
		grid-template-columns: 1fr;
		gap: 25px;

		p {
			margin: 6px 0;

			&:first-child {
				margin-top: 0px;
				margin-bottom: 6px;
			}

			&:last-of-type {
				margin-bottom: 16px;
			}
		}
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
		padding: 30px 0 0;
		display: grid;
		gap: 40px;
	}

	.compact-top-wrapper {
		padding-top: 0 !important;
	}

	section:first-child {
		position: relative;
		overflow: hidden;
		width: 100%;
		margin-top: -80px; // appbar sticky
	}

	section:last-child {
		--kit-color-footer-banner: hsl(320deg 13.04% 4.51%);
		--kit-color-on-footer-banner: hsl(0 0% 100%);
		background-color: var(--kit-color-footer-banner);
		color: var(--kit-color-on-footer-banner);
	}

	.wrapper {
		padding-top: var(--app-spacing-y-container);
		padding-bottom: var(--app-spacing-y-container);
	}

	.wrapper-compact {
		padding-left: 12px;
		padding-right: 12px;
	}

	.wrapper-gutter {
		padding-left: 24px;
		padding-right: 24px;
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
		.mobile-break {
			display: none;
		}

		.app-grids {
			grid-template-columns: 1fr 1fr;
			gap: 40px;
		}

		.app-center-content {
			row-gap: 40px;
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
