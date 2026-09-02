<script lang="ts">
	import { copyToClipboard } from '$lib/utils';

	// assets
	import { BookMarked, Check, Copy, Rocket, Terminal } from 'lucide-svelte';
	import npmIcon from '$lib/assets/icons/npm_color.svg?raw';
	import yarnIcon from '$lib/assets/icons/yarn_color.svg?raw';
	import bunIcon from '$lib/assets/icons/bun_color.svg?raw';
	import PixelBlast from '$components/pixel-blast.svelte';

	// states
	let shellCommand: string = $state('npm install --save-dev lapikit');
	let possibility: string = $state('components');
	let hasCopied: boolean = $state(false);

	let shellList = {
		npm: 'npm install --save-dev lapikit',
		yarn: 'yarn add -D lapikit',
		bun: 'bun add -D lapikit'
	};
	let possibilities = ['components', 'api', 'hooks', 'themes', 'actions'];

	$effect(() => {
		let index = possibilities.indexOf(possibility);

		const interval = setInterval(() => {
			index = (index + 1) % possibilities.length;
			possibility = possibilities[index];
		}, 3500);

		return () => clearInterval(interval);
	});

	function handleCopy(value: string) {
		hasCopied = true;
		copyToClipboard(value);
		setTimeout(() => {
			hasCopied = false;
		}, 2000);
	}
</script>

<div style="position:absolute; inset:0; z-index:0;">
	<PixelBlast
		pixelSize={6}
		colorRGB="167,139,250"
		threshold={0.35}
		noiseScale={0.006}
		evolveSpeed={0.00034}
	/>
</div>

<section>
	<div>
		<div>
			<kit:chip size="xs">
				{#snippet prepend()}
					<span class="dot"></span>
				{/snippet}
				This app was made with Lapikit</kit:chip
			>
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
			<div>
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
			<div class="code-command-wrapper">
				<kit:btn onclick={() => handleCopy(shellCommand)}>
					{#snippet prepend()}
						<kit:icon><Terminal /></kit:icon>
					{/snippet}
					{shellCommand}
					{#snippet append()}
						<kit:icon color={hasCopied && 'success'}>
							{#if hasCopied}
								<Check />
							{:else}
								<Copy />
							{/if}
						</kit:icon>
					{/snippet}
				</kit:btn>
				<div>
					<kit:btn
						onclick={() => (shellCommand = shellList['npm'])}
						active={shellList['npm'] === shellCommand}
						size="xs"
						variant="text"
					>
						{#snippet prepend()}
							<kit:icon>
								{@html npmIcon}
							</kit:icon>
						{/snippet}
						npm
					</kit:btn>
					<kit:btn
						onclick={() => (shellCommand = shellList['yarn'])}
						active={shellList['yarn'] === shellCommand}
						size="xs"
						variant="text"
					>
						{#snippet prepend()}
							<kit:icon>
								{@html yarnIcon}
							</kit:icon>
						{/snippet}
						yarn
					</kit:btn>
					<kit:btn
						onclick={() => (shellCommand = shellList['bun'])}
						active={shellList['bun'] === shellCommand}
						size="xs"
						variant="text"
					>
						{#snippet prepend()}
							<kit:icon>
								{@html bunIcon}
							</kit:icon>
						{/snippet}
						bun
					</kit:btn>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
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

		& > div {
			display: grid;
			max-width: 1538px;
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

		.code-command-wrapper {
			display: grid;
			gap: 8px;
		}

		p.paragraphe-ws {
			max-width: 80%;
			margin: 0 auto;
			font-size: 22px;
			font-weight: 200;
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
