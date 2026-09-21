<script lang="ts">
	import { setContext } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	// modules
	import NavbarDocs from '$lib/components/navbar-docs.svelte';
	import DrawerDocs from '$lib/components/navbar-drawer-docs.svelte';

	let { children } = $props();

	// states
	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();
	let layoutEl: HTMLDivElement | undefined = $state();
	let year: number = new Date().getFullYear();

	afterNavigate(({ type }) => {
		if (type !== 'popstate' && layoutEl) layoutEl.scrollTop = 0;
	});

	setContext('nav', {
		get open() {
			return navOpen;
		},
		toggle() {
			navOpen = !navOpen;
		}
	});
</script>

<NavbarDocs />

<div class="layout transition-lapikit" bind:this={layoutEl}>
	<DrawerDocs bind:open={navOpen} bind:el={sidebarEl} side="left" />

	<div class="content transition-lapikit">
		{@render children()}

		<footer>
			Copyright © 2025 - {year} Lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				style="color: var(--kit-accent)">MIT License</a
			>
			- Developed by
			<a href="https://nycolaide.dev" target="_blank" style="color: var(--kit-accent)">Nycolaide</a>
		</footer>
	</div>
</div>

<style>
	.layout {
		display: grid;
		height: calc(100dvh - 64px);
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas: 'content';
		background: var(--kit-color-surface-1);
		overflow-x: auto;
	}

	.content {
		grid-area: content;
		background: var(--kit-color-surface);
		border-top-left-radius: 36px;
		border-top-right-radius: 36px;
	}

	footer {
		grid-area: footer;
		max-width: calc(700px + var(--app-spacing-x-page) * 2 + 20rem);
		margin: 0 var(--app-spacing-x-page) var(--app-spacing-y-page-bottom);
	}

	@media (min-width: 1023px) {
		.layout {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-rows: 1fr auto;
			grid-template-areas: 'drawer content';
		}

		.layout > :global(.drawer--persistent) {
			grid-area: drawer;
		}

		.content {
			border-top-left-radius: 36px;
			border-top-right-radius: 0;
		}
	}

	@media (min-width: 1460px) {
		footer {
			width: 100%;
			margin: 0 auto var(--app-spacing-y-page-bottom);
		}
	}
</style>
