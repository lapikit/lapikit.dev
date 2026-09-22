<script lang="ts">
	import { setContext } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	// modules
	import NavbarDocs from '$lib/components/navbar-docs.svelte';
	import DrawerDocs from '$lib/components/navbar-drawer-docs.svelte';
	import FadeTransition from '$lib/components/animations/fade-transition.svelte';
	import FooterDocs from '$lib/components/footer-docs.svelte';

	let { children } = $props();

	// states
	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();
	let layoutEl: HTMLDivElement | undefined = $state();

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

<div class="layout" bind:this={layoutEl}>
	<DrawerDocs bind:open={navOpen} bind:el={sidebarEl} side="left" />

	<div class="content">
		<FadeTransition url={page.url.pathname}>
			{@render children()}

			<FooterDocs />
		</FadeTransition>
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
</style>
