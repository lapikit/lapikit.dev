<script lang="ts">
	import FooterApp from '$lib/components/footer-app.svelte';
	import NavbarApp from '$lib/components/navbar-app.svelte';

	let { children } = $props();
</script>

<NavbarApp />

{@render children()}

<FooterApp />
