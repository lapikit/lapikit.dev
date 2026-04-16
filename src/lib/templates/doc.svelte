<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../../routes/docs/[...slug]/$types';
	import { docsNavigation, getBreadcrumbs } from '$lib';
	import type { ModelDropdownProps } from 'lapikit/labs/components';

	// Components
	import TableOfContent from '$lib/components/table-of-content.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Drawer from '$lib/components/drawer.svelte';
	import { ChevronDown, ChevronRight, Menu } from 'lucide-svelte';

	let navOpen = $state(false);

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

<div class="grid md:grid-cols-[250px_1fr_250px]">
	<Drawer bind:open={navOpen} side="left">
		<nav>
			{#each docsNavigation as { label, icon, pages } (label)}
				<kit:list density="compact" nav>
					<kit:list-item>
						{#snippet prepend()}
							<kit:icon>
								{@html icon}
							</kit:icon>
						{/snippet}
						{label}
					</kit:list-item>

					{#each pages as page (page.label)}
						{#if 'url' in page}
							<kit:list-item href={resolve(page.url)} onclick={() => (navOpen = false)}>
								{page.label}
							</kit:list-item>
						{:else}
							<kit:list-item onclick={() => (navOpen = false)}>
								{page.label}
							</kit:list-item>
						{/if}
					{/each}
				</kit:list>
			{/each}
		</nav>
	</Drawer>

	<div>
		<kit:toolbar>
			<kit:btn onclick={() => (navOpen = true)} aria-label="open navigation">
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
		<Breadcrumbs items={breadcrumbs} />
		<article>
			<div class="kit-prose">
				{@render children?.()}
			</div>

			<kit:toolbar>
				{#if data.prevDoc}
					<a href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}>
						<span>Previous</span>
						<span>← {data.prevDoc.title}</span>
					</a>
				{/if}
				<kit:spacer />
				{#if data.nextDoc}
					<a href={resolve('/docs/[...slug]', { slug: data.nextDoc.slug })}>
						<span>Next</span>
						<span>{data.nextDoc.title} →</span>
					</a>
				{/if}
			</kit:toolbar>
		</article>
	</div>

	<div>
		<TableOfContent {summary} />
	</div>
</div>
