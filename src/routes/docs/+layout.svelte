<script lang="ts">
	import { page } from '$app/state';

	// modules
	import DrawerDocs from '$lib/components/navbar-drawer-docs.svelte';
	import FadeTransition from '$lib/components/animations/fade-transition.svelte';
	import { getNavContext } from '$lib/stores/nav.svelte';

	let { children } = $props();

	// states
	const nav = getNavContext();
	let sidebarEl: HTMLDivElement | undefined = $state();
</script>

<div class="layout">
	<DrawerDocs bind:open={nav.open} bind:el={sidebarEl} side="left" />

	<div class="content">
		<FadeTransition url={page.url.pathname}>
			{@render children()}
		</FadeTransition>
	</div>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas: 'content';
		background: var(--kit-color-surface-1);
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
