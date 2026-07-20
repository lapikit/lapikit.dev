<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { getBreadcrumbs } from '$lib';
	import { capitalize, slugify } from '$lib/utils';
	// Components
	import Breadcrumbs from '../components/breadcrumbs.svelte';

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
</script>

<main>
	<article class="kit-prose transition-lapikit">
		<header>
			<Breadcrumbs items={breadcrumbs} />

			{#if category}
				<div class="kit-prose-section">{category}</div>
			{/if}
			{#if title}
				<h1 id={slugify(title)} class="kit-prose-title">
					{capitalize(title)}
				</h1>
			{/if}
		</header>

		{@render children?.()}
	</article>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin: var(--lpk-page-padding-top) var(--lpk-page-padding-side) var(--lpk-page-padding-bottom);
		gap: 1rem 2rem;
		max-width: calc(700px + var(--lpk-page-padding-side) * 2 + 20rem);
	}

	article {
		width: 100%;
	}

	@media (min-width: 1260px) {
		main {
			grid-template-columns: calc(var(--md-max-width + 20rem));
			grid-template-rows: 1fr auto;
			align-items: start;
		}

		@media (min-width: 1460px) {
			main {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>
