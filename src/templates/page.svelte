<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import type { MarkdownHeading } from '$lib/@types';
	import { capitalize, slugify } from '$lib/utils';
	import { getBreadcrumbs } from '$lib/breadcrumbs';

	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();

	// modules
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import TableOfContent from '$lib/components/table-of-content.svelte';

	// assets
	import { TextAlignStart } from 'lucide-svelte';

	let {
		title,
		category,
		children,
		summary = []
	}: {
		title?: string;
		category?: string;
		children?: Snippet;
		summary?: MarkdownHeading[];
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
</script>

<main>
	<article class="markdown">
		<header>
			<Breadcrumbs items={breadcrumbs} />

			{#if category}
				<div class="markdown-section">{category}</div>
			{/if}
			{#if title}
				<h1 id={slugify(title)} class="markdown-title">
					{capitalize(title)}
				</h1>
			{/if}
		</header>

		{#if summary.length > 0}
			<kit:accordion size="sm" class="markdown-summary">
				<kit:accordion-item
					index={0}
					open={accordion.values.includes(0)}
					toggle={accordion.toggle}
					background="transparent"
					color="text-muted"
				>
					{#snippet activator()}
						<kit:icon>
							<TextAlignStart />
						</kit:icon>

						On this page
					{/snippet}

					<aside>
						<TableOfContent {summary} />
					</aside>
				</kit:accordion-item>
			</kit:accordion>
		{/if}

		{@render children?.()}
	</article>

	{#if summary.length > 0}
		<aside>
			<kit:card class="table-of-content-wrapper" density="comfortable">
				<kit:card-title s-style_font-size="18px">On this page</kit:card-title>
				<kit:card-content>
					<TableOfContent {summary} />
				</kit:card-content>
			</kit:card>
		</aside>
	{/if}
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin: var(--app-spacing-y-page-top) var(--app-spacing-x-page) var(--app-spacing-y-page-bottom);
		gap: 1rem 2rem;
		max-width: calc(700px + var(--app-spacing-x-page) * 2 + 20rem);
		min-height: calc(
			100dvh - 64px - var(--app-spacing-y-page-top) - var(--app-spacing-y-page-bottom) - 88px
		);

		> aside {
			display: none;
		}

		@media (min-width: 1260px) {
			grid-template-columns: minmax(0, 1fr) 20rem;
			grid-template-rows: auto 1fr;
			align-items: start;

			> aside {
				display: flex;
				height: 100%;
				width: 100%;
				position: relative;
			}

			:global(.markdown-summary) {
				display: none;
			}

			:global(.table-of-content-wrapper) {
				display: grid;
				grid-template-rows: auto 1fr;
				max-height: calc(
					100vh - (75px + var(--app-spacing-y-page-top) + var(--app-spacing-y-page-bottom))
				);
				position: sticky;
				top: 112px;
				height: fit-content;
				width: 100%;

				:global(.kit-card-content) {
					overflow-y: auto;
				}
			}

			@media (min-width: 1460px) {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>
