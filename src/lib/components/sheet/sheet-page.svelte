<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import type { MarkdownHeading } from '$lib/types';
	import { capitalize, slugify } from '$lib/utils';

	import SheetArticle from '$lib/components/sheet/sheet-article.svelte';
	import SheetBreadcrumbs from '$lib/components/sheet/sheet-breadcrumbs.svelte';

	let {
		title,
		category,
		summary = [],
		children
	}: {
		title?: string;
		category?: string;
		summary?: MarkdownHeading[];
		children: Snippet;
	} = $props();

	const breadcrumbs = $derived(page.data.breadcrumbs);
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
	</header>
{/snippet}

<main>
	<SheetArticle {title} {summary} header={pageHeader}>
		{@render children()}
	</SheetArticle>
</main>
