<script lang="ts">
	import { page } from '$app/state';

	// modules
	import FooterApp from '$lib/components/footer-app.svelte';
	import NavbarApp from '$lib/components/navbar-app.svelte';
	import FadeTransition from '$lib/components/animations/fade-transition.svelte';

	let { children } = $props();
</script>

<NavbarApp />

<FadeTransition url={page.url.pathname}>
	{@render children()}
</FadeTransition>

<FooterApp />
