<script lang="ts">
	import { page } from '$app/state';

	import DocsNav from '$lib/components/docs/docs-nav.svelte';
	import FadeTransition from '$lib/components/sheet/fade-transition.svelte';
	import SheetSpacer from '$lib/components/sheet/sheet-spacer.svelte';

	let { children } = $props();
</script>

<div class="docs-shell">
	<div class="docs-shell-frame">
		<aside class="docs-shell-sidebar">
			<DocsNav />
		</aside>

		<div class="docs-shell-content">
			<FadeTransition url={page.url.pathname}>
				{@render children()}
			</FadeTransition>
		</div>
	</div>
</div>

<SheetSpacer innerTop />

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.docs-shell {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;
		padding: 0 var(--lapikit-spacing-block);
	}

	.docs-shell-frame {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		border-inline: var(--lapikit-border);

		@include up(lg) {
			grid-template-columns: 280px minmax(0, 1fr);
		}
	}

	.docs-shell-sidebar {
		display: none;

		@include up(lg) {
			display: block;
			position: sticky;
			top: var(--header-height);
			align-self: start;
			height: calc(100dvh - var(--header-height));
			border-inline-end: var(--lapikit-border);
		}
	}

	.docs-shell-content {
		min-width: 0;
		min-height: calc(100dvh - var(--header-height));
	}
</style>
