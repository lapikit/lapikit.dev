<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav>
	<a href={resolve('/')}>home</a>
	<a href={resolve('/sitemap.xml')} target="_blank">sitemap.xml</a>
	<a href={resolve('/terms')}>terms</a>
	<a href={resolve('/theme-builder')}>theme builder</a>
	<a href={resolve('/docs')}>docs</a>
</nav>

{@render children()}
