<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { MarkdownHeading } from '$lib/@types';

	import { getBreadcrumbs } from '$lib/breadcrumbs';
	import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';

	// components
	import Search from '$lib/components/search.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import TableOfContent from '$lib/components/table-of-content.svelte';

	// svg
	import githubIcon from '$lib/assets/icons/github.svg?raw';

	let {
		children,
		summary = []
	}: {
		children?: Snippet;
		summary?: MarkdownHeading[];
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
	let year: number = new Date().getFullYear();
</script>

<kit:appbar class="sticky! top-0 z-50" classContent="grid gap-4 md:grid-cols-[auto_1fr_auto]">
	<a href={resolve('/')} class="flex items-center gap-2" aria-label="Lapikit Home">
		<enhanced:img
			src="$lib/assets/images/lapikit.webp?w=38"
			alt="lapikit"
			aria-label="Lapikit"
			sizes="100%"
			loading="lazy"
		/>
		<span>Lapikit</span>
	</a>

	<kit:spacer />

	<div class="flex items-center gap-2">
		<Search />
		<kit:btn href={resolve('/docs')} size="lg">Documentation</kit:btn>
		<kit:btn
			icon
			href="https://github.com/lapikit/lapikit"
			target="_blank"
			aria-label="GitHub"
			size="lg"
		>
			{@html githubIcon}
		</kit:btn>
	</div>
</kit:appbar>

<div class="grid grid-cols-[1fr] md:grid-cols-[1fr_250px]">
	<div class="min-w-0">
		<kit:toolbar class="sticky! top-16 z-1 lg:hidden!">
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
	footer {
		max-width: 720px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}
</style>
