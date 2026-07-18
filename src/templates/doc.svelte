<script lang="ts" module>
	import blockquote from '$components/markdown/blockquote.svelte';
	let sidebarScrollTop = 0;
	export { blockquote };
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { mount, unmount, onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import EnumChip from '../components/enum-chip.svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../routes/docs/[...slug]/$types';
	import { docsNavigation, getBreadcrumbs } from '$lib';
	import type { ModelDropdownProps } from 'lapikit/components';
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
	// Components
	import TableOfContent from '../components/table-of-content.svelte';
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import { ChevronDown, ChevronLeft, ChevronRight, Menu, TextAlignStart } from 'lucide-svelte';
	import { capitalize } from '$lib/utils';
	import Aside from '$components/aside/aside.svelte';

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

	let sidebarEl: HTMLDivElement | undefined = $state();
	// const nav = getContext<{ open: boolean; toggle: () => void }>('nav');

	onMount(() => {
		if (sidebarEl) sidebarEl.scrollTop = sidebarScrollTop;
	});

	beforeNavigate(() => {
		if (sidebarEl) sidebarScrollTop = sidebarEl.scrollTop;
	});

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
	<article class="kit-prose" use:enhanceEnumChips>
		<header>
			<Breadcrumbs items={breadcrumbs} />

			{#if category}
				<div class="kit-prose-section">{category}</div>
			{/if}
			{#if title}
				<h1 class="kit-prose-title">{capitalize(title)}</h1>
			{/if}
		</header>

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

		{@render children?.()}

		{#if data.prevDoc || data.nextDoc}
			<footer>
				<kit:toolbar>
					{#if data.prevDoc}
						<kit:btn href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}>
							{#snippet prepend()}
								<kit:icon>
									<ChevronLeft />
								</kit:icon>
							{/snippet}
							{capitalize(data.prevDoc.title)}
						</kit:btn>
					{/if}
					<kit:spacer />
					{#if data.nextDoc}
						<kit:btn href={resolve('/docs/[...slug]', { slug: data.nextDoc.slug })}>
							{#snippet append()}
								<kit:icon>
									<ChevronRight />
								</kit:icon>
							{/snippet}
							{capitalize(data.nextDoc.title)}
						</kit:btn>
					{/if}
				</kit:toolbar>
			</footer>
		{/if}
	</article>

	<aside>
		<kit:card class="table-of-content-wrapper">
			<kit:card-content>
				<kit:card-title>On this page</kit:card-title>
				<TableOfContent {summary} />
			</kit:card-content>
		</kit:card>
	</aside>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin: var(--lpk-page-padding-top) var(--lpk-page-padding-side) var(--lpk-page-padding-bottom);
		gap: 1rem 2rem;
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
			display: initial;
			position: sticky;
			top: 95px;
		}

		main :global(.kit-prose-summary) {
			display: none;
		}
	}
</style>
