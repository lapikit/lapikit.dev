<script lang="ts" module>
	let sidebarScrollTop = 0;
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

	// Components
	import TableOfContent from '../components/table-of-content.svelte';
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import { ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-svelte';
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
	const nav = getContext<{ open: boolean; toggle: () => void }>('nav');

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

<kit:toolbar rounded="0">
	<kit:btn onclick={() => nav.toggle()} aria-label="open navigation">
		{#snippet prepend()}
			<kit:icon>
				<Menu />
			</kit:icon>
		{/snippet}

		Menu
	</kit:btn>
</kit:toolbar>

<main>
	<Breadcrumbs items={breadcrumbs} />

	<article>
		{@render children?.()}

		<footer>footer article</footer>
	</article>

	<Aside />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas:
			'breadcrumb'
			'article'
			'aside';
		gap: 1rem 2rem;
		max-width: 72rem;
		margin-inline: auto;
		padding-inline: 1rem;
	}

	main > :global(nav) {
		grid-area: breadcrumb;
	}

	main > article {
		grid-area: article;
	}

	main > :global(aside) {
		grid-area: aside;
	}

	@media (min-width: 64rem) {
		main {
			grid-template-columns: minmax(0, 1fr) 20rem;
			grid-template-rows: auto 1fr;
			grid-template-areas:
				'breadcrumb aside'
				'article    aside';
			align-items: start;
		}
	}
</style>
