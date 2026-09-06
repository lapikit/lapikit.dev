<script lang="ts">
	import Chart from './modules/chart.svelte';

	// asset
	import CustomizeCover from '$lib/assets/images/bento-card-themes.png';
	import ComponentsCover from '$lib/assets/images/bento-card-components.png';
	import ViteJsIcon from '$lib/assets/icons/vite.js.svg?raw';
	import RollupIcon from '$lib/assets/icons/rollup.js.svg?raw';
	import WebpackIcon from '$lib/assets/icons/webpack.svg?raw';
	import { nbComponents, nbHooks, urlLapikitLicense } from '$lib/constants';
</script>

<div id="bento-counter">
	<kit:card
		href="/docs/getting-started"
		class="card-integrations"
		density="comfortable"
		color="bento-on-integration"
		background="bento-integration"
	>
		<kit:card-content>
			<kit:btn icon>
				<kit:icon size="xl">{@html ViteJsIcon}</kit:icon>
			</kit:btn>
			<kit:tooltip label="Coming soon">
				<kit:btn icon disabled>
					<kit:icon size="xl">{@html RollupIcon}</kit:icon>
				</kit:btn>
			</kit:tooltip>
			<kit:tooltip label="Coming soon">
				<kit:btn icon disabled>
					<kit:icon size="xl">{@html WebpackIcon}</kit:icon>
				</kit:btn>
			</kit:tooltip>
		</kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Integrations</kit:card-title>
			<kit:card-content>Use your favorites builder with lapikit</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card
		class="card-customize"
		href="/docs/customize"
		density="comfortable"
		s-style_background-image={`url(${CustomizeCover})`}
		s-style_background-size="cover"
		s-style_background-position="center"
	>
		<kit:card-content> </kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Customize</kit:card-title>
			<kit:card-content>Support themes and design system with global variables</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card
		class="card-components"
		href="/docs/components"
		density="comfortable"
		s-style_background-image={`url(${ComponentsCover})`}
		s-style_background-size="cover"
		s-style_background-position="center"
	>
		<!-- <enhanced:img src={ComponentsCover} alt="Components cover" class="components-cover" /> -->
		<kit:card-title class="lpk-title-2xl"> Components</kit:card-title>
		<kit:card-container>
			<div class="counter">{nbComponents}</div>
			<kit:card-content>Optimized for svelte and sveltekit</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card
		class="card-hooks"
		href="/docs/hooks"
		density="comfortable"
		color="bento-on-integration"
		background="bento-hooks"
	>
		<kit:card-content>
			<div class="counter">{nbHooks}</div>
		</kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Hooks and actions</kit:card-title>
			<kit:card-content>More utils for facility your developpment</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-opensource" href={urlLapikitLicense} density="comfortable">
		<Chart />
		<kit:card-content> </kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Open Source</kit:card-title>
			<kit:card-content>Lapikit is 100% Open Source. <br /> Use license MIT</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-lowdeps" density="comfortable">
		<kit:card-content> </kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Low dependencies for long support</kit:card-title>
			<kit:card-content>
				It is developed using 67 external packages 54% fewer than the other major component
				libraries to ensure better support and security.</kit:card-content
			>
		</kit:card-container>
	</kit:card>
</div>

<style>
	#bento-counter {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: minmax(180px, auto);
		gap: 1rem;
		grid-template-areas:
			'integrations'
			'components  '
			'customize   '
			'hooks       '
			'opensource  '
			'lowdeps     ';
		max-width: 1538px;
		margin: -50px auto 0;
		padding-left: 24px;
		padding-right: 24px;
	}

	#bento-counter > :global(.card-integrations),
	#bento-counter > :global(.card-customize),
	#bento-counter > :global(.card-hooks),
	#bento-counter > :global(.card-opensource),
	#bento-counter > :global(.card-lowdeps) {
		display: grid;
		grid-template-rows: 1fr auto;
	}

	#bento-counter > :global(.card-components) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	#bento-counter > :global(.card-opensource .kit-card-container) {
		position: relative;
		z-index: 1;
	}

	.counter {
		font-size: calc(var(--kit-font-xl) * 3.5);
	}

	/* grid area */
	#bento-counter > :global(.card-integrations) {
		grid-area: integrations;
	}
	#bento-counter > :global(.card-components) {
		grid-area: components;
	}
	#bento-counter > :global(.card-hooks) {
		grid-area: hooks;
	}
	#bento-counter > :global(.card-opensource) {
		grid-area: opensource;
	}
	#bento-counter > :global(.card-customize) {
		grid-area: customize;
	}
	#bento-counter > :global(.card-lowdeps) {
		grid-area: lowdeps;
	}

	@media (min-width: 500px) {
		#bento-counter {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: minmax(180px, auto);
			gap: 1rem;
			grid-template-areas:
				'integrations customize '
				'components   components'
				'opensource   hooks     '
				'lowdeps      lowdeps   ';
		}
	}

	@media (min-width: 730px) {
		#bento-counter {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: minmax(180px, auto);
			gap: 1rem;
			grid-template-areas:
				'integrations customize   hooks'
				'components   components  components'
				'opensource      lowdeps     lowdeps';
		}
	}

	@media (min-width: 1024px) {
		#bento-counter {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: minmax(180px, auto);
			gap: 1rem;
			grid-template-areas:
				'integrations components hooks     opensource'
				'customize    components lowdeps   lowdeps';
		}
	}
</style>
