<script lang="ts">
	import { npmState } from '$lib/stores/npm.svelte';

	// assets
	import { ArrowRight, BookMarked, Rocket } from 'lucide-svelte';

	// states
	let possibility: string = $state('components');
	let possibilities = ['components', 'api', 'hooks', 'themes', 'actions'];

	$effect(() => {
		let index = possibilities.indexOf(possibility);

		const interval = setInterval(() => {
			index = (index + 1) % possibilities.length;
			possibility = possibilities[index];
		}, 3500);

		return () => clearInterval(interval);
	});
</script>

<div class="wrapper">
	<div>
		<kit:chip
			href="/docs/changelog"
			size="xl"
			rounded="lg"
			s-style_--kit-chip-p="6px"
			s-style_width="fit-content"
			s-style_margin="0 auto"
		>
			{#snippet prepend()}
				<kit:chip rounded="md" background="accent" color="on-accent">
					{#snippet prepend()}
						<span class="dot"></span>
					{/snippet}
					Current version
				</kit:chip>
			{/snippet}

			{npmState.version.latest}

			{#snippet append()}
				<kit:icon>
					<ArrowRight />
				</kit:icon>
			{/snippet}
		</kit:chip>
		<div class="headline_hero">
			<h1>
				<div>Simple, optimized</div>
				<div class="tilted-box">
					<span class="possibility">
						{possibility}
					</span>
				</div>

				<div>
					for <span class="svelte">Svelte</span>
				</div>
			</h1>
		</div>
		<p class="paragraphe-ws">
			A library of accessible, high-performance, versatile components that let you develop fast,
			fully customizable interfaces. <span class="svelte">svelte</span> and
			<span class="svelte">sveltekit</span> ready.
		</p>
		<div class="headline_actions">
			<kit:btn density="comfortable" rounded="lg" background="accent" color="on-accent">
				{#snippet prepend()}
					<kit:icon>
						<Rocket />
					</kit:icon>
				{/snippet}
				Discover the power
			</kit:btn>
			<kit:btn density="comfortable" rounded="lg" variant="outline" color="accent">
				{#snippet prepend()}
					<kit:icon>
						<BookMarked />
					</kit:icon>
				{/snippet}
				Install Guide
			</kit:btn>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		--fade-height: 180px;

		position: relative;
		height: 100vh;
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
		padding-top: 156px;
		margin-top: -75px;

		&::after {
			content: '';
			position: absolute;
			inset-inline: 0;
			bottom: 0;
			height: var(--fade-height);
			background: linear-gradient(to bottom, transparent, var(--kit-color-surface));
			pointer-events: none;
			z-index: 0;
		}

		& > div {
			position: relative;
			z-index: 1;
			display: grid;
			// max-width: 1538px;
			margin: 0 auto;
			padding-left: 24px;
			padding-right: 24px;

			& > div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				align-items: center;
				gap: 23px;
			}
		}

		.headline_hero {
			display: flex;
		}

		h1 {
			font-size: 32px;
			line-height: 1;
			width: fit-content;
			margin: 0 auto;
			display: grid;
			gap: 14px;
			font-weight: 900;

			> div:first-child,
			> div:last-child {
				display: flex;
				width: fit-content;
				margin: 0 auto;
				gap: 8px;
			}
		}

		span.svelte {
			color: var(--kit-color-svelte);
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

		p.paragraphe-ws {
			max-width: 750px;
			margin: 0 auto;
			font-size: 22px;
			font-weight: 200;
		}

		.headline_actions {
			gap: 20px;
			display: flex;
			flex-direction: row;
		}

		@media (min-width: 640px) {
			> div {
				gap: 40px;
			}

			h1 {
				font-size: 56px;
				line-height: 1;
			}
		}

		@media (min-width: 767px) {
			> div {
				padding-left: 40px;
				padding-right: 40px;
			}
		}
	}

	.dot {
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--kit-color-success);
	}

	.dot::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: inherit;
		animation: pulse 1.6s ease-out infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.6;
		}
		100% {
			transform: scale(2.5);
			opacity: 0;
		}
	}
</style>
