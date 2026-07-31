<script lang="ts">
	import LapikitLogo from '$lib/assets/images/lapikit.webp?enhanced';
	import SvelteLogo from '$lib/assets/images/svelte.webp?enhanced';

	// states
	let shellCommand: string = $state('npm install -D lapikit');

	let shellList = {
		npm: 'npm install --save-dev lapikit',
		yarn: 'yarn add -D lapikit',
		bun: 'bun add -D lapikit'
	};
</script>

<section>
	<div>
		<div>
			<kit:chip size="xs">This app was made with Lapikit</kit:chip>
			<div class="headline_hero">
				<enhanced:img src={LapikitLogo} alt="Lapikit logo" class="no-select w-9.5 min-w-9.5" />
				<h1>Simple, optimized components for Svelte</h1>
				<enhanced:img src={SvelteLogo} alt="Lapikit logo" class="no-select w-9.5 min-w-9.5" />
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
	}
</style>
