<script lang="ts">
	import { Star } from 'lucide-svelte';
</script>

<div id="bento-counter">
	<kit:card class="card-integrations" density="comfortable">
		<kit:card-content>
			<kit:chip>
				<kit:icon><Star /></kit:icon>
			</kit:chip>
		</kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Integrations</kit:card-title>
			<kit:card-content>Use your favorites builder with lapikit</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-customize" density="comfortable">
		<kit:card-content> </kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Customize</kit:card-title>
			<kit:card-content>Support themes and design system with global variables</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-components" density="comfortable">
		<kit:card-title class="lpk-title-2xl"> Components</kit:card-title>
		<kit:card-container>
			<div class="counter">25</div>
			<kit:card-content>Optimized for svelte and sveltekit</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-hooks" density="comfortable">
		<kit:card-content>
			<div class="counter">3</div>
		</kit:card-content>
		<kit:card-container>
			<kit:card-title class="lpk-title-2xl">Hooks and actions</kit:card-title>
			<kit:card-content>More utils for facility your developpment</kit:card-content>
		</kit:card-container>
	</kit:card>
	<kit:card class="card-opensource" density="comfortable">
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
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(180px, auto);
		gap: 1rem;
		grid-template-areas:
			'integrations components hooks     opensource'
			'customize    components lowdeps   lowdeps';
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
</style>
