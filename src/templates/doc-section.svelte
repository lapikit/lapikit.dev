<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { getBreadcrumbs } from '$lib';
	import { capitalize, slugify } from '$lib/utils';
	// Components
	import Breadcrumbs from '../components/breadcrumbs.svelte';
	import type { PageData } from '../routes/docs/[...slug]/$types';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

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

	$effect(() => {
		console.log('GW1 layout section', data);
	});
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

		{#if data?.doc?.state !== 'deprecated' && (data.prevDoc || data.nextDoc)}
			<kit:separator />
			<footer class="mt-8 grid sm:flex sm:justify-between">
				{#if data.prevDoc}
					<kit:btn
						variant="text"
						size="sm"
						href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}
					>
						{#snippet prepend()}
							<kit:icon>
								<ChevronLeft />
							</kit:icon>
						{/snippet}
						{capitalize(data.prevDoc.title)}
					</kit:btn>
				{/if}
				{#if data.nextDoc}
					<kit:btn
						variant="text"
						size="sm"
						density="compact"
						href={resolve('/docs/[...slug]', { slug: data.nextDoc.slug })}
					>
						{#snippet append()}
							<kit:icon>
								<ChevronRight />
							</kit:icon>
						{/snippet}
						{capitalize(data.nextDoc.title)}
					</kit:btn>
				{/if}
			</footer>
		{/if}
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
