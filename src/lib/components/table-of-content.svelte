<script lang="ts">
	import { onMount } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import { TextQuote } from 'lucide-svelte';
	import { capitalize } from '$lib/utils';
	import { page } from '$app/state';

	let { summary = [] }: { summary?: MarkdownHeading[] } = $props();

	const isChangelog = $derived(page.url.pathname.includes('changelog'));
	const summaryItems = $derived(
		summary.filter((item) => item.depth >= 1 && item.depth <= (isChangelog ? 2 : 3))
	);

	let activeSlug = $state<string | null>(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSlug = entry.target.id;
					}
				}
			},
			{ rootMargin: '0px 0px -80% 0px', threshold: 0 }
		);

		const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
		headings.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

{#if summaryItems.length > 0}
	<nav aria-label="Table of contents">
		<kit:list density="compact" size="xs">
			<kit:list-item class="hidden! lg:flex!">
				{#snippet prepend()}
					<kit:icon>
						<TextQuote />
					</kit:icon>
				{/snippet}
				<span class="font-semibold">On this page</span>
			</kit:list-item>

			{#each summaryItems as item (item.slug)}
				<kit:tooltip label={item.value}>
					<kit:list-item
						href={`#${item.slug}`}
						class={`depth-${item.depth} ${activeSlug === item.slug ? 'underline!' : ''}`}
					>
						<span class="truncate">{capitalize(item.value)}</span>
					</kit:list-item>
				</kit:tooltip>
			{/each}
		</kit:list>
	</nav>
{/if}

<style>
	:global(.depth-1) span {
		padding-left: 0.25rem;
	}

	:global(.depth-2) span {
		padding-left: 0.75rem;
	}

	:global(.depth-3) span {
		padding-left: 1.25rem;
	}
</style>
