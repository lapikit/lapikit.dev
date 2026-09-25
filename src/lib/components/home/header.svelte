<script lang="ts">
	import { untrack, type Snippet } from 'svelte';

	// assets
	import { ArrowRight, BookMarked, Rocket } from 'lucide-svelte';
	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import LogoSvelte from '$lib/assets/images/svelte.webp?enhanced';
	import ImgLove from '$lib/assets/images/love.png?enhanced';

	let {
		children,
		animation,
		version = 'v0.0.0',
		list = ['components']
	}: {
		children?: Snippet;
		animation?: Snippet;
		list: Array<string>;
		version?: string;
	} = $props();

	// states
	let text: string = $state(untrack(() => list[0]));

	$effect(() => {
		let index = list.indexOf(text);

		const interval = setInterval(() => {
			index = (index + 1) % list.length;
			text = list[index];
		}, 3500);

		return () => clearInterval(interval);
	});
</script>

<div>
	<div class="background-header">
		{@render animation?.()}
	</div>
	<div class="wrapper">
		<kit:chip
			href="/docs/changelog"
			size="md"
			rounded="lg"
			s-style_--kit-chip-p="6px"
			s-style_width="fit-content"
			s-style_margin="0 auto"
		>
			{#snippet prepend()}
				<kit:chip size="sm" rounded="md" background="accent" color="on-accent"> New </kit:chip>
			{/snippet}

			{version}

			{#snippet append()}
				<kit:icon>
					<ArrowRight />
				</kit:icon>
			{/snippet}
		</kit:chip>

		<h1 class="title-2xl">
			Simple, optimized <br />
			<div class="tilted-box">
				<span class="possibility">
					{text || 'components'}
				</span>
			</div>
			<span>for <span class="svelte-text">Svelte</span></span>
		</h1>

		<p class="subtitle-h1">
			A library of accessible, high-performance, versatile components that let you develop fast,
			fully customizable interfaces <span class="svelte-text">svelte</span> and
			<span class="svelte-text">sveltekit</span> ready.
		</p>

		<div class="headline_actions">
			<kit:btn
				density="comfortable"
				rounded="lg"
				background="accent"
				color="on-accent"
				href="/docs"
			>
				{#snippet prepend()}
					<kit:icon>
						<Rocket />
					</kit:icon>
				{/snippet}
				Discover the power
			</kit:btn>
			<kit:btn
				density="comfortable"
				rounded="lg"
				color="accent"
				background="on-accent"
				href="/docs/getting-started"
			>
				{#snippet prepend()}
					<kit:icon>
						<BookMarked />
					</kit:icon>
				{/snippet}
				Install Guide
			</kit:btn>
		</div>

		<div class="headline_lapinosaure">
			<enhanced:img src={LogoLapikit} alt="Lapikit logo" sizes="75px" />
			<enhanced:img src={ImgLove} alt="Lapikit love Svelte" sizes="58px" />
			<enhanced:img src={LogoSvelte} alt="Svelte logo" sizes="66px" />
		</div>

		<div>
			{@render children?.()}
		</div>
	</div>
</div>

<style lang="scss">
	.background-header {
		--kit-color-surface: transparent;

		position: absolute;
		min-height: 90vh;
		height: calc(100% - 50vh);
		width: 100%;
		background-image:
			linear-gradient(var(--kit-color-fill) 1px, transparent 1px),
			linear-gradient(90deg, var(--kit-color-fill) 1px, transparent 1px),
			linear-gradient(var(--kit-color-fill) 0.5px, transparent 0.5px),
			linear-gradient(90deg, var(--kit-color-fill) 0.5px, var(--kit-color-surface) 0.5px);
		background-size:
			100px 100px,
			100px 100px,
			20px 20px,
			20px 20px;
		background-position:
			-1px -1px,
			-1px -1px,
			-0.5px -0.5px,
			-0.5px -0.5px;
	}

	.wrapper {
		z-index: 1;
		padding-top: var(--home-appbar-affect-wrapper);
		padding-bottom: calc(var(--home-appbar-affect-wrapper) - 30px);
	}

	h1 {
		width: fit-content;
		margin: 0 auto;
		display: grid;
		gap: 14px;
		text-align: center;
	}

	.tilted-box {
		display: inline-block;
		transform: rotate(-3deg);
		overflow: hidden;
		padding: 0.5rem 1rem;
		background: var(--kit-color-accent);
		color: var(--kit-color-on-accent);
		border-radius: 6px;
		width: fit-content;
		margin: 0 auto;
	}

	.possibility {
		display: inline-block;
	}

	p {
		max-width: 750px;
		text-align: center;
		margin: 0 auto;
	}

	.headline_actions {
		gap: 20px;
		display: flex;
		flex-direction: column;
	}

	.headline_lapinosaure {
		display: flex;
		flex-direction: row;
		margin-top: 40px;
		justify-content: center;
		gap: 23px;

		:global(picture) {
			position: relative;
			width: 48px;
		}

		:global(picture:first-child) {
			transform: rotate(347deg);
			animation: lapinosaure-float 3.4s ease-in-out infinite;
		}

		:global(picture:nth-child(2)) {
			top: 35px;
		}

		:global(picture:last-child) {
			transform: rotate(7deg);
			animation: lapinosaure-float 4.2s ease-in-out infinite;
			animation-delay: -1.8s;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.headline_lapinosaure :global(picture) {
			animation: none;
		}
	}

	@media (min-width: 480px) {
		.wrapper {
			gap: 23px;
		}

		.headline_actions {
			flex-direction: row;
			justify-content: center;
		}
	}

	@media (min-width: 640px) {
		.headline_lapinosaure {
			:global(picture) {
				width: 58px;
			}
		}
	}
</style>
