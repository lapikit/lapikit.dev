<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { links } from '$lib/constants';

	import { ArrowRight, Rocket, Star } from 'lucide-svelte';
	import Mascot from '$lib/assets/images/mascot/default.webp?enhanced';
	import SvelteIcon from '$lib/assets/icons/svelte.svg?raw';
	import TypescriptIcon from '$lib/assets/icons/typescript_color.svg?url';
	import ViteIcon from '$lib/assets/icons/vite.js.svg?url';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';
	import VsCode from '$lib/components/home/vs-code/vs-code.svelte';
	import InstallCommand from './install-command.svelte';

	let { version = '' }: { version?: string } = $props();

	const WORDS = ['components', 'themes', 'hooks', 'actions'];
	const WORD_DURATION = 3000;
	const STACK = [
		{ label: 'Svelte 5', svg: SvelteIcon },
		{ label: 'SvelteKit', svg: SvelteIcon },
		{ label: 'TypeScript', src: TypescriptIcon },
		{ label: 'Vite', src: ViteIcon }
	];

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	let wordIndex = $state(0);

	$effect(() => {
		if (reducedMotion.current) return;

		const interval = setInterval(() => {
			wordIndex = (wordIndex + 1) % WORDS.length;
		}, WORD_DURATION);

		return () => clearInterval(interval);
	});
</script>

<SheetSection labelledby="hero-title">
	<SheetGrid columns={{ lg: 2 }}>
		<div class="hero-intro">
			<div class="hero-content">
				{#if version}
					<kit:chip href="/docs/changelog" variant="outline" rounded="full" size="md">
						{#snippet prepend()}
							<kit:chip size="sm" rounded="full" color="accent">New</kit:chip>
						{/snippet}
						Lapikit {version} is out
						{#snippet append()}
							<kit:icon size="sm">
								<ArrowRight />
							</kit:icon>
						{/snippet}
					</kit:chip>
				{/if}

				<SheetHeading id="hero-title" level={1} eyebrow="// The component library for Svelte 5">
					{#snippet description()}
						Accessible, themeable Svelte components with a zero-import syntax. Write
						<code>&lt;kit:btn&gt;</code>, the Lili preprocessor handles the rest at compile time.
					{/snippet}
					Write less,<br />
					ship more
					<span class="sr-only">Svelte components</span>
					{#key wordIndex}
						<span class="hero-word" aria-hidden="true">{WORDS[wordIndex]}</span>
					{/key}
				</SheetHeading>

				<div class="hero-actions">
					<kit:btn href="/docs/getting-started" color="accent" size="lg" rounded="md">
						{#snippet prepend()}
							<kit:icon>
								<Rocket />
							</kit:icon>
						{/snippet}
						Get started
					</kit:btn>

					<kit:btn
						href={links['github-repo-lapikit'].url}
						target="_blank"
						rel="noopener noreferrer"
						variant="text"
						size="lg"
						rounded="md"
					>
						{#snippet prepend()}
							<kit:icon class="hero-star">
								<Star />
							</kit:icon>
						{/snippet}
						Star on GitHub
					</kit:btn>
				</div>
			</div>

			<div class="hero-mascot">
				<enhanced:img src={Mascot} alt="" sizes="(min-width: 1124px) 280px, 0px" />
			</div>
		</div>

		<div class="hero-cell">
			<p class="hero-cell-label">Install</p>
			<InstallCommand />
		</div>

		<div class="hero-cell">
			<p class="hero-cell-label">Built for</p>
			<ul class="hero-stack">
				{#each STACK as { label, svg, src } (label)}
					<li>
						<kit:chip variant="outline" rounded="full">
							{#snippet prepend()}
								<span class="hero-stack-logo" aria-hidden="true">
									{#if svg}
										{@html svg}
									{:else}
										<img {src} alt="" width="16" height="16" />
									{/if}
								</span>
							{/snippet}
							{label}
						</kit:chip>
					</li>
				{/each}
			</ul>
		</div>

		<div class="hero-preview">
			<VsCode {version} />
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.hero-intro,
	.hero-preview {
		grid-column: 1 / -1;
	}

	.hero-intro {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--lapikit-spacing-block);
		padding: var(--sheet-cell-padding-lg);
		background-image: radial-gradient(var(--kit-color-border) 1px, transparent 1px);
		background-size: 24px 24px;
		overflow: hidden;
	}

	.hero-content {
		display: grid;
		justify-items: start;
		gap: 32px;
	}

	.hero-word {
		display: inline-block;
		color: var(--kit-color-accent);
		animation: hero-word-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.hero-mascot {
		display: none;
		flex: 0 0 auto;
		width: clamp(180px, 16vw, 280px);

		:global(img) {
			display: block;
			width: 100%;
			height: auto;
		}

		@include up(lg) {
			display: block;
		}
	}

	.hero-cell {
		display: grid;
		align-content: start;
		gap: 12px;
		padding: var(--sheet-cell-padding);
	}

	.hero-cell-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.hero-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.hero-stack-logo {
		display: inline-flex;
		width: 16px;
		height: 16px;
		color: var(--kit-color-svelte);

		:global(svg),
		img {
			width: 100%;
			height: 100%;
		}
	}

	.hero-actions :global(.hero-star) {
		color: var(--kit-color-star);

		:global(svg) {
			fill: currentColor;
		}
	}

	.hero-preview {
		padding: var(--sheet-cell-padding);
	}

	@keyframes hero-word-in {
		from {
			opacity: 0;
			transform: translateY(0.25em);
		}
	}
</style>
