<script lang="ts" module>
	export { default as blockquote } from '$lib/components/markdown/blockquote.svelte';
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { mount, unmount } from 'svelte';
	import type { Snippet } from 'svelte';

	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../routes/docs/[...slug]/$types';
	import { getBreadcrumbs } from '$lib/breadcrumbs';
	import { capitalize, slugify } from '$lib/utils';

	import EnumChip from '$lib/components/docs/enum-chip.svelte';
	import SheetArticle from '$lib/components/sheet/sheet-article.svelte';
	import SheetBreadcrumbs from '$lib/components/sheet/sheet-breadcrumbs.svelte';
	import DocsPager from '$lib/components/docs/docs-pager.svelte';
	import SponsorCard from '$lib/components/docs/sponsor-card.svelte';
	import PageActions from '$lib/components/docs/page-actions.svelte';
	import PageMeta from '$lib/components/docs/page-meta.svelte';

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
	const deprecated = $derived(data?.doc?.state === 'deprecated');
	const hasPager = $derived(!deprecated && !!(data.prevDoc || data.nextDoc));

	function parseEnumValues(chip: HTMLElement) {
		try {
			const values = JSON.parse(chip.dataset.values ?? '[]');
			return Array.isArray(values) ? values : null;
		} catch {
			return null;
		}
	}

	function enhanceEnumChips(node: HTMLElement) {
		const chips = node.querySelectorAll<HTMLElement>('.enum-chip[data-values]');
		const instances: Array<ReturnType<typeof mount>> = [];

		for (const chip of chips) {
			const values = parseEnumValues(chip);
			if (!values) continue;

			const placeholder = document.createElement('span');
			chip.replaceWith(placeholder);
			instances.push(mount(EnumChip, { target: placeholder, props: { values } }));
		}

		return {
			destroy() {
				for (const instance of instances) unmount(instance);
			}
		};
	}
</script>

{#snippet pageHeader()}
	<header>
		<SheetBreadcrumbs items={breadcrumbs} />

		{#if category && !deprecated}
			<div class="markdown-section">{category}</div>
		{/if}
		{#if title}
			<h1 id={slugify(title)} class="markdown-title">
				{capitalize(title)}
			</h1>
		{/if}
		<PageActions doc={data.doc} />
		{#if deprecated}
			<kit:alert tone="warning">
				This feature is deprecated and is no longer supported. Check out the new features and
				improvements in the documentation.
			</kit:alert>
		{/if}
	</header>
{/snippet}

{#snippet pager()}
	<DocsPager prev={data.prevDoc} next={data.nextDoc} />
{/snippet}

{#snippet sponsor(compact: boolean)}
	<SponsorCard {compact} />
{/snippet}

<main>
	<SheetArticle
		{title}
		{summary}
		header={pageHeader}
		footer={hasPager ? pager : undefined}
		promo={sponsor}
		enhance={enhanceEnumChips}
	>
		{@render children?.()}
		<PageMeta doc={data.doc} />
	</SheetArticle>
</main>
