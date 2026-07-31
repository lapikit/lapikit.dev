<script lang="ts">
	// assets
	import LapikitLogo from '$lib/assets/images/lapikit.webp?enhanced';
	import SvelteLogo from '$lib/assets/images/svelte.webp?enhanced';

	// states
	let shellCommand: string = $state('npm install -D lapikit');
	let possibility: string = $state('components');

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
</script>

<section>
	<div>
		<div>
			<kit:chip size="xs">This app was made with Lapikit</kit:chip>
			<div class="headline_hero">
				<h1>
					<div>
						<enhanced:img src={LapikitLogo} alt="Lapikit logo" class="no-select w-9.5 min-w-9.5" />
						Simple, optimized
					</div>
					<div class="tilted-box">
						<span class="possibility">
							{possibility}
						</span>
					</div>

					<div>
						for Svelte
						<enhanced:img src={SvelteLogo} alt="Lapikit logo" class="no-select w-9.5 min-w-9.5" />
					</div>
				</h1>
			</div>
			<p>
				A library of accessible, high-performance, versatile components that let you develop fast,
				fully customizable interfaces.
			</p>
			<p>
				<kit:chip>svelte</kit:chip> and <kit:chip>sveltekit</kit:chip>
			</p>
			<div>
				<kit:btn>Discover the power</kit:btn>
				<kit:btn>Install Guide</kit:btn>
			</div>
			<div>
				<kit:btn>{shellCommand}</kit:btn>
				<div>
					<kit:btn onclick={() => (shellCommand = shellList['npm'])}>npm</kit:btn>
					<kit:btn onclick={() => (shellCommand = shellList['yarn'])}>yarn</kit:btn>
					<kit:btn onclick={() => (shellCommand = shellList['bun'])}>bun</kit:btn>
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
		padding-top: 75px;
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
			}
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

		/* .tilted-box {
			display: inline-block;
			transform: rotate(-3deg);
			overflow: hidden;
			height: 1.5em;
			padding: 0.5rem 1rem;
			background: #222;
			color: #fff;
			border-radius: 6px;
		}

		.track {
			transition: transform 0.4s ease;
		}

		.possibility {
			height: 1.5em;
			line-height: 1.5em;
		} */
		p.paragraphe-ws {
			max-width: 80%;
			margin: 0 auto;
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
</style>
