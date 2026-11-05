<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		replComponentPreCompil,
		replComponentSvelte,
		replDirectivePreCompil,
		replDirectiveSvelte
	} from '../../../content/app/code';

	import { BookOpenText, Cog, PenLine, Send } from 'lucide-svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';
	import LiliPipeline from './lili-pipeline.svelte';
	import Repl from '$lib/components/home/repl.svelte';

	const steps = [
		{
			icon: PenLine,
			title: 'Write',
			text: 'Use any Lapikit component as a tag. No import line, no naming convention to remember.'
		},
		{
			icon: Cog,
			title: 'Compile',
			text: 'Lili rewrites the tags into Svelte components, adds the imports and adapts the snippets.'
		},
		{
			icon: Send,
			title: 'Ship',
			text: 'The browser receives plain Svelte 5. No extra runtime, nothing to configure.'
		}
	];
</script>

<SheetSection labelledby="lili-title">
	<SheetGrid>
		<div class="lili-intro">
			<SheetHeading id="lili-title" eyebrow="// 01 — Lili preprocessor">
				One syntax. <span class="accent-text">Zero imports.</span>
				{#snippet description()}
					Lili is the Svelte preprocessor at the core of Lapikit. It turns
					<code>&lt;kit:*&gt;</code> tags into regular Svelte components at compile time, so there is
					nothing to import and nothing extra to ship.
				{/snippet}
			</SheetHeading>
		</div>
	</SheetGrid>

	<SheetGrid columns={{ lg: 3 }}>
		{#each steps as { icon: Icon, title, text }, index (title)}
			<div class="lili-step">
				<div class="lili-step-header">
					<span class="lili-step-icon">
						<kit:icon>
							<Icon />
						</kit:icon>
					</span>
					<span class="lili-step-index" aria-hidden="true">0{index + 1}</span>
				</div>
				<h3 class="lili-step-title">{title}</h3>
				<p class="lili-step-text">{text}</p>
			</div>
		{/each}
	</SheetGrid>

	<SheetGrid>
		<div class="lili-diagram">
			<LiliPipeline />
		</div>
	</SheetGrid>

	<SheetGrid columns={{ lg: 2 }}>
		<div class="lili-feature">
			<h3 class="lili-feature-title">
				Components with the <code class="accent-text">&lt;kit:*&gt;</code> syntax
			</h3>
			<p>
				Write <code>&lt;kit:list&gt;</code> and <code>&lt;kit:list-item&gt;</code> directly in your template.
				Lili handles the imports, the component naming and the snippet adaptations for you.
			</p>
			<p>
				The example shows the same list written with the <code>&lt;kit:*&gt;</code> syntax, then compiled
				to standard Svelte imports.
			</p>
			<kit:btn
				href={resolve('/docs/essentials/template-syntax')}
				color="accent"
				size="lg"
				rounded="md"
			>
				{#snippet prepend()}
					<kit:icon>
						<BookOpenText />
					</kit:icon>
				{/snippet}
				Learn the template syntax
			</kit:btn>
		</div>

		<div class="lili-demo">
			<Repl code={replComponentSvelte} render={replComponentPreCompil} />
		</div>

		<div class="lili-demo lili-demo-start">
			<Repl left code={replDirectiveSvelte} render={replDirectivePreCompil} />
		</div>

		<div class="lili-feature">
			<h3 class="lili-feature-title">
				<code class="accent-text">class:</code> and <code class="accent-text">style:</code> directives
				on every component
			</h3>
			<p>
				Svelte only accepts <code>class:</code> and <code>style:</code> on native HTML elements.
				Lili lifts that limit: toggle a class or set a CSS variable on any
				<code>&lt;kit:*&gt;</code>
				tag, exactly like on a <code>&lt;div&gt;</code>.
			</p>
			<p>
				The <code>class</code> attribute takes strings, arrays and objects too. Working without the
				preprocessor? The <code>s-class</code> and <code>s-style</code> props do the same job.
			</p>
			<kit:btn
				href={resolve('/docs/essentials/class-and-style')}
				color="accent"
				size="lg"
				rounded="md"
			>
				{#snippet prepend()}
					<kit:icon>
						<BookOpenText />
					</kit:icon>
				{/snippet}
				Read about class and style
			</kit:btn>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.lili-intro {
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.lili-step {
		display: grid;
		align-content: start;
		gap: 12px;
		padding: var(--sheet-cell-padding);
	}

	.lili-step-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.lili-step-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--kit-shape-md);
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 88%);
		color: var(--kit-color-accent);
	}

	.lili-step-index {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.lili-step-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.lili-step-text {
		color: var(--kit-color-text-muted);
		line-height: 1.55;
	}

	.lili-diagram {
		display: grid;
		gap: 24px;
		justify-items: center;
		padding: var(--sheet-cell-padding);
		overflow: hidden;
	}

	.lili-feature {
		display: grid;
		align-content: center;
		justify-items: start;
		gap: 16px;
		padding: var(--sheet-cell-padding);

		p {
			max-width: 60ch;
			color: var(--kit-color-text-muted);
			line-height: 1.6;
		}

		code {
			color: var(--kit-color-text);
		}
	}

	.lili-feature-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}

	.lili-demo {
		--repl-max-width: none;

		min-width: 0;
		padding: var(--sheet-cell-padding);
	}

	.lili-demo-start {
		order: 1;

		@include up(lg) {
			order: 0;
		}
	}
</style>
