<script lang="ts" module>
	let sidebarScrollTop = 0;
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { getBreadcrumbs } from '$lib';
	import { capitalize } from '$lib/utils';

	// Components
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import { Menu } from 'lucide-svelte';

	let sidebarEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (sidebarEl) sidebarEl.scrollTop = sidebarScrollTop;
	});

	beforeNavigate(() => {
		if (sidebarEl) sidebarScrollTop = sidebarEl.scrollTop;
	});

	let {
		children,
		title,
		category
	}: {
		children?: Snippet;
		title?: string;
		category?: string;
	} = $props();

	const nav = getContext<{ open: boolean; toggle: () => void }>('nav');

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
	let year: number = new Date().getFullYear();
</script>

<div class="grid">
	<div class="min-w-0">
		<kit:toolbar class="sticky! top-16 z-50 lg:hidden!">
			<kit:btn onclick={() => nav.toggle()} aria-label="open navigation">
				{#snippet prepend()}
					<kit:icon>
						<Menu />
					</kit:icon>
				{/snippet}

				Menu
			</kit:btn>

			<kit:spacer />
		</kit:toolbar>

		<article>
			<header>
				<Breadcrumbs items={breadcrumbs} />

				{#if category}
					<div class="kit-prose-section">{category}</div>
				{/if}
				{#if title}
					<h1 class="kit-prose-title">{capitalize(title)}</h1>
				{/if}
			</header>

			<div class="kit-prose">
				{@render children?.()}
			</div>
		</article>
	</div>
</div>
