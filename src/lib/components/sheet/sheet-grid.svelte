<script lang="ts">
	import type { Snippet } from 'svelte';

	type Columns = { base?: number; md?: number; lg?: number; xl?: number };

	let {
		columns = {},
		children
	}: {
		columns?: Columns;
		children: Snippet;
	} = $props();

	const base = $derived(columns.base ?? 1);
	const md = $derived(columns.md ?? base);
	const lg = $derived(columns.lg ?? md);
	const xl = $derived(columns.xl ?? lg);
</script>

<div
	class="sheet-grid"
	style:--columns={base}
	style:--columns-md={md}
	style:--columns-lg={lg}
	style:--columns-xl={xl}
>
	{@render children()}
</div>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.sheet-grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		gap: var(--lapikit-border-width);
		background-color: var(--lapikit-border-color);

		> :global(*) {
			background-color: var(--kit-color-surface);
		}

		@include up(md) {
			grid-template-columns: repeat(var(--columns-md), minmax(0, 1fr));
		}

		@include up(lg) {
			grid-template-columns: repeat(var(--columns-lg), minmax(0, 1fr));
		}

		@include up(xl) {
			grid-template-columns: repeat(var(--columns-xl), minmax(0, 1fr));
		}
	}

	:global(.sheet-grid + .sheet-grid) {
		border-top: var(--lapikit-border);
	}
</style>
