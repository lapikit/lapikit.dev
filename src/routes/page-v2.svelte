<script lang="ts">
	import BentoCounter from '$components/app/bento-counter.svelte';
	import Discover from '$components/app/discover.svelte';
	import ExploreBanner from '$components/app/explore-banner.svelte';
	import Faq from '$components/app/faq.svelte';
	import Hero from '$components/app/hero.svelte';
	import LapikitComponents from '$components/app/lapikit-components.svelte';
	import PreviewFooter from '$components/app/preview-footer.svelte';
	import PreviewNavbar from '$components/app/preview-navbar.svelte';
	import TablePackage from '$components/app/table-package.svelte';
	import Testimonials from '$components/app/testimonials.svelte';
	import ClickSpark from '$components/click-spark.svelte';
</script>

<ClickSpark sparkColor="hsl(220 90% 56%)" sparkCount={8} sparkRadius={20} duration={500} />

<PreviewNavbar />

<Hero />

<BentoCounter />

<Discover />

<!-- <LapikitComponents /> -->

<TablePackage />

<Testimonials />

<Faq />

<ExploreBanner />

<PreviewFooter />
