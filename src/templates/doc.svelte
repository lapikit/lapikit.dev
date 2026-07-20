<script lang="ts" module>
	import blockquote from '$components/markdown/blockquote.svelte';
	export { blockquote };
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { mount, unmount } from 'svelte';
	import type { Snippet } from 'svelte';
	import EnumChip from '../components/enum-chip.svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../routes/docs/[...slug]/$types';
	import { getBreadcrumbs } from '$lib';
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
	// Components
	import TableOfContent from '../components/table-of-content.svelte';
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import { ChevronLeft, ChevronRight, TextAlignStart } from 'lucide-svelte';
	import { capitalize, slugify } from '$lib/utils';

	function enhanceEnumChips(node: HTMLElement) {
		const chips = node.querySelectorAll<HTMLElement>('.enum-chip[data-values]');
		const instances: Array<ReturnType<typeof mount>> = [];

		for (const chip of chips) {
			try {
				const values = JSON.parse(chip.dataset.values ?? '[]');
				const placeholder = document.createElement('span');
				chip.replaceWith(placeholder);
				instances.push(mount(EnumChip, { target: placeholder, props: { values } }));
			} catch {
				// ignore malformed data-values
			}
		}

		return {
			destroy() {
				for (const instance of instances) unmount(instance);
			}
		};
	}

	let {
		children,
		summary = [],
		title,
		category,
		data
	}: {
		children?: Snippet;
		summary?: MarkdownHeading[];
		title?: string;
		category?: string;
		data: PageData;
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
</script>

<main>
	<article class="kit-prose transition-lapikit" use:enhanceEnumChips>
		<header>
			<Breadcrumbs items={breadcrumbs} />

			{#if data?.doc?.state === 'deprecated'}
				<kit:alert tone="warning">
					This feature is deprecated and is no longer supported. Check out the new features and
					improvements in the documentation.
				</kit:alert>
			{:else}
				{#if category}
					<div class="kit-prose-section">{category}</div>
				{/if}
				{#if title}
					<h1 id={slugify(title)} class="kit-prose-title">
						{capitalize(title)}
					</h1>
				{/if}
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
						<TableOfContent {title} {summary} />
					</aside>
				</kit:accordion-item>
			</kit:accordion>
		{/if}

		{@render children?.()}

		{#if data?.doc?.state !== 'deprecated' && (data.prevDoc || data.nextDoc)}
			<kit:separator />
			<footer class="mt-8 grid sm:flex sm:justify-between">
				{#if data.prevDoc}
					<kit:btn
						variant="text"
						size="sm"
						href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}
					>
						{#snippet prepend()}
							<kit:icon>
								<ChevronLeft />
							</kit:icon>
						{/snippet}
						{capitalize(data.prevDoc.title)}
					</kit:btn>
				{/if}
				{#if data.nextDoc}
					<kit:btn
						variant="text"
						size="sm"
						density="compact"
						href={resolve('/docs/[...slug]', { slug: data.nextDoc.slug })}
					>
						{#snippet append()}
							<kit:icon>
								<ChevronRight />
							</kit:icon>
						{/snippet}
						{capitalize(data.nextDoc.title)}
					</kit:btn>
				{/if}
			</footer>
		{/if}
	</article>

	{#if summary.length > 0}
		<aside>
			<kit:card class="table-of-content-wrapper" density="comfortable">
				<kit:card-title s-style_font-size="18px">On this page</kit:card-title>
				<kit:card-content>
					<TableOfContent {title} {summary} />
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

	article {
		width: 100%;
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
