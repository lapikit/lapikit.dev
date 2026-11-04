<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { PageData } from '../routes/docs/[...slug]/$types';
	import { getBreadcrumbs } from '$lib/breadcrumbs';
	import { capitalize, slugify } from '$lib/utils';

	import SheetArticle from '$lib/components/sheet/sheet-article.svelte';
	import SheetBreadcrumbs from '$lib/components/sheet/sheet-breadcrumbs.svelte';
	import DocsPager from '$lib/components/docs/docs-pager.svelte';
	import SponsorCard from '$lib/components/docs/sponsor-card.svelte';
	import PageActions from '$lib/components/docs/page-actions.svelte';
	import PageMeta from '$lib/components/docs/page-meta.svelte';

	let {
		children,
		title,
		category,
		data
	}: {
		children?: Snippet;
		title?: string;
		category?: string;
		data: PageData;
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
	const hasPager = $derived(data?.doc?.state !== 'deprecated' && !!(data.prevDoc || data.nextDoc));
</script>

{#snippet pageHeader()}
	<header>
		<SheetBreadcrumbs items={breadcrumbs} />

		{#if category}
			<div class="markdown-section">{category}</div>
		{/if}
		{#if title}
			<h1 id={slugify(title)} class="markdown-title">
				{capitalize(title)}
			</h1>
		{/if}
		<PageActions doc={data.doc} />
	</header>
{/snippet}

{#snippet pager()}
	<DocsPager prev={data.prevDoc} next={data.nextDoc} />
{/snippet}

{#snippet sponsor(compact: boolean)}
	<SponsorCard {compact} />
{/snippet}

<main>
	<SheetArticle {title} header={pageHeader} footer={hasPager ? pager : undefined} promo={sponsor}>
		{@render children?.()}
		<PageMeta doc={data.doc} />
	</SheetArticle>
</main>
