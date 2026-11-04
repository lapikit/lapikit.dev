<script lang="ts">
	import type { Component } from 'svelte';

	import SheetSpacer from '$lib/components/modules/sheet-spacer.svelte';
	import Hero from './hero.svelte';
	import Stats from './stats.svelte';
	import Lili from './lili.svelte';
	import Showcase from './showcase.svelte';
	import Theming from './theming.svelte';
	import Comparison from './comparison.svelte';
	import Faq from './faq.svelte';
	import Community from './community.svelte';
	import CallToAction from './call-to-action.svelte';

	let { version = '' }: { version?: string } = $props();

	const sections: Component[] = [
		Stats,
		Lili,
		Showcase,
		Theming,
		Comparison,
		Faq,
		Community,
		CallToAction
	];
</script>

<main class="home-sheet">
	<SheetSpacer innerBottom />
	<Hero {version} />

	{#each sections as Section, index (index)}
		<SheetSpacer innerTop innerBottom />
		<Section />
	{/each}

	<SheetSpacer innerTop />
</main>
