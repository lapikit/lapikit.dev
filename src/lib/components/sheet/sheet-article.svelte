<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { DropdownTriggerModel, DropdownTriggerProps } from 'lapikit/components';
	import type { MarkdownHeading } from '$lib/@types';
	import { capitalize, slugify } from '$lib/utils';

	import { ChevronDown, TextAlignStart } from 'lucide-svelte';

	import TableOfContent from '$lib/components/sheet/table-of-content.svelte';

	const noop: Action = () => {};

	let {
		title,
		summary = [],
		header,
		footer,
		promo,
		enhance = noop,
		children
	}: {
		title?: string;
		summary?: MarkdownHeading[];
		header: Snippet;
		footer?: Snippet;
		promo?: Snippet<[compact: boolean]>;
		enhance?: Action;
		children?: Snippet;
	} = $props();

	let activeSlug = $state<string | null>(null);

	const hasToc = $derived(summary.length > 0);
	const headings = $derived(
		new Map([
			...(title ? [[slugify(title), title] as const] : []),
			...summary.map(({ slug, value }) => [slug, value] as const)
		])
	);
	const activeLabel = $derived(activeSlug ? headings.get(activeSlug) : undefined);
</script>

<div class="sheet-article">
	<div class="sheet-article-grid" class:has-toc={hasToc}>
		{#if hasToc}
			<div class="sheet-article-bar">
				<kit:dropdown closeOnClick elevation="2" class="sheet-article-bar-menu">
					{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
						<kit:btn variant="text" density="compact" active={open} {...props}>
							{#snippet prepend()}
								<kit:icon size="sm"><TextAlignStart /></kit:icon>
							{/snippet}
							On this page
							{#snippet append()}
								<kit:icon size="sm"><ChevronDown /></kit:icon>
							{/snippet}
						</kit:btn>
					{/snippet}

					<div class="sheet-article-bar-toc">
						<TableOfContent {title} {summary} />
					</div>
				</kit:dropdown>

				{#if activeLabel}
					<span class="sheet-article-bar-current" aria-hidden="true">
						{capitalize(activeLabel)}
					</span>
				{/if}
			</div>
		{/if}

		<article class="prose sheet-article-body" use:enhance>
			{@render header()}
			{@render children?.()}
		</article>

		{#if hasToc}
			<aside class="sheet-article-toc">
				<div class="sheet-article-toc-sticky">
					<div class="sheet-article-toc-nav">
						<p class="sheet-article-toc-title">On this page</p>
						<TableOfContent {title} {summary} bind:activeSlug />
					</div>

					{#if promo}
						<div class="sheet-article-toc-promo">
							{@render promo(false)}
						</div>
					{/if}
				</div>
			</aside>
		{/if}

		{#if promo}
			<div class="sheet-article-promo">
				{@render promo(true)}
			</div>
		{/if}

		{#if footer}
			<div class="sheet-article-footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.sheet-article {
		--toc-bar-height: 48px;

		container-type: inline-size;
	}

	.sheet-article-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--lapikit-border-width);
		background-color: var(--lapikit-border-color);

		> * {
			background-color: var(--kit-color-surface);
		}
	}

	.sheet-article-bar {
		position: sticky;
		top: var(--header-height);
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
		height: var(--toc-bar-height);
		padding-inline: 8px var(--sheet-cell-padding);
		background-color: color-mix(in oklab, var(--kit-color-surface), transparent 10%);
		backdrop-filter: blur(12px);
	}

	.sheet-article-bar-current {
		overflow: hidden;
		padding-inline-start: 12px;
		border-inline-start: 1px solid var(--kit-color-border);
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sheet-article-bar-toc {
		width: min(21rem, calc(100vw - 2rem));
		max-height: min(60vh, 480px);
		overflow-y: auto;
	}

	.sheet-article-body {
		width: 100%;
		padding: var(--sheet-cell-padding);
	}

	.sheet-article-toc {
		display: none;
	}

	.sheet-article-toc-sticky {
		position: sticky;
		top: var(--header-height);
		display: flex;
		flex-direction: column;
		max-height: calc(100dvh - var(--header-height));
	}

	.sheet-article-toc-nav {
		display: grid;
		align-content: start;
		gap: 12px;
		min-height: 0;
		padding: 24px;
		overflow-y: auto;
	}

	.sheet-article-toc-promo {
		flex-shrink: 0;
		border-block: var(--lapikit-border);
	}

	.sheet-article-toc-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.sheet-article-toc,
	.sheet-article-bar-toc {
		:global(.kit-list-item) {
			height: auto;
			min-height: 32px;
			padding-block: 6px;
			white-space: normal;
			line-height: 1.35;
		}

		:global(.truncate) {
			overflow: visible;
			white-space: normal;
		}
	}

	@container (min-width: 720px) {
		.sheet-article-body {
			padding: clamp(2rem, 1rem + 2vw, 3rem) var(--sheet-cell-padding);
		}
	}

	@container (min-width: 1150px) {
		.sheet-article-grid.has-toc {
			grid-template-columns: minmax(0, 1fr) 18rem;
		}

		.sheet-article-bar {
			display: none;
		}

		.sheet-article-toc {
			display: block;
		}

		.has-toc .sheet-article-promo {
			display: none;
		}

		.sheet-article-footer {
			grid-column: 1 / -1;
		}
	}
</style>
