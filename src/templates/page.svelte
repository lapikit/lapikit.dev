<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import type { MarkdownHeading } from '$lib/@types';
	import { capitalize, slugify } from '$lib/utils';
	import { getBreadcrumbs } from '$lib/breadcrumbs';

	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();

	// components
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import TableOfContent from '../components/table-of-content.svelte';

	// icon
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
	<article class="kit-prose transition-lapikit">
		<header>
			<Breadcrumbs items={breadcrumbs} />

			{#if category}
				<div class="kit-prose-section">{category}</div>
			{/if}
			{#if title}
				<h1 id={slugify(title)} class="kit-prose-title">
					{capitalize(title)}
				</h1>
			{/if}
		</header>

		{#if summary.length > 0}
			<kit:accordion size="sm" class="kit-prose-summary">
				<kit:accordion-item
					index={0}
					open={accordion.values.includes(0)}
					toggle={accordion.toggle}
					style="--kit-accordion-item-bg: transparent;"
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

<style>
	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin: var(--lpk-page-padding-top) var(--lpk-page-padding-side) var(--lpk-page-padding-bottom);
		gap: 1rem 2rem;
		max-width: calc(700px + var(--lpk-page-padding-side) * 2 + 20rem);
		min-height: calc(
			100dvh - 64px - var(--lpk-page-padding-top) - var(--lpk-page-padding-bottom) - 88px
		);
	}

	main > aside {
		display: none;
	}

	@media (min-width: 1260px) {
		main {
			grid-template-columns: minmax(0, 1fr) 20rem;
			grid-template-rows: auto 1fr;
			align-items: start;
		}

		main > aside {
			display: flex;
			height: 100%;
			width: 100%;
			position: relative;
		}

		main :global(.kit-prose-summary) {
			display: none;
		}

		main :global(.table-of-content-wrapper) {
			display: grid;
			grid-template-rows: auto 1fr;
			max-height: calc(
				100vh - (75px + var(--lpk-page-padding-top) + var(--lpk-page-padding-bottom))
			);
			position: sticky;
			top: var(--lpk-page-padding-top);
			height: fit-content;
			width: 100%;
		}

		main :global(.table-of-content-wrapper .kit-card-content) {
			overflow-y: auto;
		}

		@media (min-width: 1460px) {
			main {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>
