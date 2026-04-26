<script lang="ts" module>
	let sidebarScrollTop = 0;
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../../routes/docs/[...slug]/$types';
	import { docsNavigation, getBreadcrumbs } from '$lib';
	import type { ModelDropdownProps } from 'lapikit/labs/components';

	// Components
	import TableOfContent from '$lib/components/table-of-content.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Drawer from '$lib/components/drawer.svelte';
	import { ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-svelte';

	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (sidebarEl) sidebarEl.scrollTop = sidebarScrollTop;
	});

	beforeNavigate(() => {
		if (sidebarEl) sidebarScrollTop = sidebarEl.scrollTop;
	});

	let {
		children,
		summary = [],
		data
	}: {
		children?: Snippet;
		summary?: MarkdownHeading[];
		data: PageData;
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
</script>

<div class="grid md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_250px]">
	<Drawer bind:open={navOpen} bind:el={sidebarEl} side="left">
		<nav>
			{#each docsNavigation as { label, icon, pages } (label)}
				<kit:list density="compact" size="sm" nav>
					<kit:list-item>
						{#snippet prepend()}
							<kit:icon>
								{@html icon}
							</kit:icon>
						{/snippet}
						{label}
					</kit:list-item>

					{#each pages as page (page.label)}
						<kit:list-item
							href={page.url}
							onclick={() => (navOpen = false)}
							active={normalizedPath === page.url}
						>
							{page.label}
						</kit:list-item>
					{/each}
				</kit:list>
			{/each}
		</nav>
	</Drawer>

	<div class="min-w-0">
		<kit:toolbar class="sticky! top-16 z-50 lg:hidden!">
			<kit:btn class="md:hidden!" onclick={() => (navOpen = true)} aria-label="open navigation">
				{#snippet prepend()}
					<kit:icon>
						<Menu />
					</kit:icon>
				{/snippet}

				Menu
			</kit:btn>

			<kit:spacer />

			<kit:dropdown>
				{#snippet activator({ toggle, open }: ModelDropdownProps)}
					<kit:btn onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}>
						On this page

						{#snippet append()}
							<kit:icon>
								{#if open}
									<ChevronDown />
								{:else}
									<ChevronRight />
								{/if}
							</kit:icon>
						{/snippet}
					</kit:btn>
				{/snippet}
				<TableOfContent {summary} />
			</kit:dropdown>
		</kit:toolbar>

		<article>
			<Breadcrumbs items={breadcrumbs} />

			<div class="kit-prose">
				{@render children?.()}
			</div>

			<kit:toolbar classContent="pagination-docs">
				{#if data.prevDoc}
					<kit:btn href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}>
						{#snippet prepend()}
							<kit:icon>
								<ChevronLeft />
							</kit:icon>
						{/snippet}
						{data.prevDoc.title}
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
						{data.nextDoc.title}
					</kit:btn>
				{/if}
			</kit:toolbar>
		</article>
	</div>

	<div
		class="hidden lg:sticky lg:top-16 lg:z-auto lg:block lg:h-[calc(100vh-64px)] lg:overflow-y-auto"
	>
		<TableOfContent {summary} />
	</div>
</div>

<style>
	:global(.pagination-docs) {
		--md-max-width: 720px;
		--md-space-xl: 2rem;
		--md-space-lg: 1.5rem;

		max-width: var(--md-max-width);
		margin: 0 auto;
		padding: var(--md-space-xl) var(--md-space-lg);
	}

	@media (min-width: 1407px) {
		:global(.kit-repl) {
			width: 120%;
			margin-left: -10%;
		}
	}
</style>
