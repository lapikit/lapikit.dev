<script lang="ts">
	import { page } from '$app/state';
	import { mount, unmount } from 'svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	import type { DocSummary, MarkdownHeading } from '$lib/types';
	import { capitalize, slugify } from '$lib/utils';

	import EnumChip from './enum-chip.svelte';
	import SheetArticle from '$lib/components/sheet/sheet-article.svelte';
	import SheetBreadcrumbs from '$lib/components/sheet/sheet-breadcrumbs.svelte';
	import DocsPager from './docs-pager.svelte';
	import SponsorCard from './sponsor-card.svelte';
	import PageActions from './page-actions.svelte';
	import PageMeta from './page-meta.svelte';

	type DocLink = ComponentProps<typeof DocsPager>['prev'];

	let {
		doc,
		summary = [],
		prev = null,
		next = null,
		children
	}: {
		doc: DocSummary;
		summary?: MarkdownHeading[];
		prev?: DocLink;
		next?: DocLink;
		children: Snippet;
	} = $props();

	const breadcrumbs = $derived(page.data.breadcrumbs);
	const deprecated = $derived(doc.state === 'deprecated');
	const hasPager = $derived(!deprecated && !!(prev || next));

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

		{#if doc.category && !deprecated}
			<div class="markdown-section">{doc.category}</div>
		{/if}
		<h1 id={slugify(doc.title)} class="markdown-title">
			{capitalize(doc.title)}
		</h1>
		<PageActions {doc} />
		{#if deprecated}
			<kit:alert tone="warning">
				This feature is deprecated and is no longer supported. Check out the new features and
				improvements in the documentation.
			</kit:alert>
		{/if}
	</header>
{/snippet}

{#snippet pager()}
	<DocsPager {prev} {next} />
{/snippet}

{#snippet sponsor(compact: boolean)}
	<SponsorCard {compact} />
{/snippet}

<main>
	<SheetArticle
		title={doc.title}
		{summary}
		header={pageHeader}
		footer={hasPager ? pager : undefined}
		promo={sponsor}
		enhance={enhanceEnumChips}
	>
		{@render children()}
		<PageMeta {doc} />
	</SheetArticle>
</main>
