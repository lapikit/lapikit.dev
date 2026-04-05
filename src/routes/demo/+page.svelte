<script lang="ts">
	//import { resolve } from '$app/paths';

	//import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import ConsentMode from '$lib/components/consent-mode.svelte';
	import Search from '$lib/components/search.svelte';
</script>

<header>
	<!--<p><a href={resolve('/')}>{siteName}</a></p>-->
	<!--<p>{siteDescription}</p>-->
</header>

<main id="content">
	<!--<Breadcrumbs items={breadcrumbs} />-->
	<Search />

	<enhanced:img
		src="$lib/assets/images/demo.webp"
		alt="gnome test"
		sizes="100vw"
		fetchpriority="high"
		loading="eager"
	/>
</main>

<ConsentMode />
