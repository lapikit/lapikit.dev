<script lang="ts">
	import { page } from '$app/state';

	// modules
	import FadeTransition from '$lib/components/animations/fade-transition.svelte';

	let { children } = $props();
</script>

<FadeTransition url={page.url.pathname}>
	{@render children()}
</FadeTransition>
