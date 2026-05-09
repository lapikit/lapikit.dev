<script lang="ts" module>
	let sidebarScrollTop = 0;
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { mount, unmount, onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import EnumChip from '$lib/components/enum-chip.svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import type { PageData } from '../../routes/docs/[...slug]/$types';
	import { docsNavigation, getBreadcrumbs } from '$lib';
	import type { ModelDropdownProps } from 'lapikit/labs/components';

	// Components
	import TableOfContent from '$lib/components/table-of-content.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Drawer from '$lib/components/drawer.svelte';
	import { ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-svelte';
	import { capitalize } from '$lib/utils';

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
	let year: number = new Date().getFullYear();
</script>

<div class="grid md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_250px]">
	<Drawer bind:open={navOpen} bind:el={sidebarEl} side="left">
		<nav>
			{#each docsNavigation as { label, icon, pages } (label)}
				<kit:list density="compact" size="sm" nav>
					<kit:list-item>
						{#snippet prepend()}
							<kit:icon>
								{#if typeof icon === 'string'}
									{@html icon}
								{:else}
									{@const Icon = icon}
									<Icon />
								{/if}
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
		<kit:toolbar class="sticky! top-16 z-1 lg:hidden!">
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

			<div class="kit-prose" use:enhanceEnumChips>
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
		</article>

		<footer>
			Copyright © 2025 - {year} Lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				style="color: var(--kit-accent)">MIT License</a
			>
			- Developed by
			<a href="https://nycolaide.dev" target="_blank" style="color: var(--kit-accent)">Nycolaide</a>
		</footer>
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

	footer {
		max-width: 720px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}
</style>
