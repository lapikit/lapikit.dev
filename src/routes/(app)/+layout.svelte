<script lang="ts">
	import NavbarApp from '$lib/components/navbar-app.svelte';

	let { children } = $props();
</script>

<NavbarApp />

{@render children()}
