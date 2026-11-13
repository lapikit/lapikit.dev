<script lang="ts">
	import { npmState } from '$lib/state/npm.svelte';

	import SheetSpacer from '$lib/components/sheet/sheet-spacer.svelte';
	import Hero from './_home/hero.svelte';
	import Stats from './_home/stats.svelte';
	import Lili from './_home/lili.svelte';
	import Showcase from './_home/showcase.svelte';
	import Theming from './_home/theming.svelte';
	import Comparison from './_home/comparison.svelte';
	import Faq from './_home/faq.svelte';
	import Community from './_home/community.svelte';
	import CallToAction from './_home/call-to-action.svelte';

	const sections = [Stats, Lili, Showcase, Theming, Comparison, Faq, Community, CallToAction];

	const version = $derived(npmState.version.latest);
</script>

<main>
	<SheetSpacer />
	<Hero {version} />

	{#each sections as Section, index (index)}
		<SheetSpacer noBorder />
		<Section />
	{/each}

	<SheetSpacer noBorder />
</main>
