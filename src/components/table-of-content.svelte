<script lang="ts">
	import { onMount } from 'svelte';
	import type { MarkdownHeading } from '$lib/@types';
	import { capitalize, slugify } from '$lib/utils';
	import { page } from '$app/state';

	let {
		title,
		summary = [],
		inner = false
	}: { title?: string; summary?: MarkdownHeading[]; inner?: boolean } = $props();

	const isChangelog = $derived(page.url.pathname.includes('changelog'));
	const summaryItems = $derived(
		summary.filter((item) => item.depth >= 1 && item.depth <= (isChangelog ? 2 : 3))
	);
	const titleSlug = $derived(title ? slugify(title) : null);

	let activeSlug = $state<string | null>(null);

	// Active item = last heading whose top has crossed a line 35% down the viewport.
	const ACTIVE_LINE_RATIO = 0.35;

	onMount(() => {
		const updateActiveSlug = () => {
			const slugs = [titleSlug, ...summaryItems.map((item) => item.slug)].filter(
				(slug): slug is string => !!slug
			);
			const headings = slugs
				.map((slug) => document.getElementById(slug))
				.filter((el): el is HTMLElement => el !== null);

			const activeLine = window.innerHeight * ACTIVE_LINE_RATIO;

			let current: string | null = null;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top <= activeLine) {
					current = heading.id;
				} else {
					break;
				}
			}
			activeSlug = current ?? headings[0]?.id ?? null;
		};

		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				updateActiveSlug();
				ticking = false;
			});
		};

		const scrollTarget: EventTarget = inner
			? (document.querySelector('.layout') ?? window)
			: window;

		updateActiveSlug();
		scrollTarget.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		return () => {
			scrollTarget.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

{#if summaryItems.length > 0}
	<nav aria-label="Table of contents">
		<kit:list size="xs" variant="text" nav>
			{#if title}
				<kit:list-item
					href={`#${titleSlug}`}
					class={`depth-1`}
					active={activeSlug === titleSlug}
					color={activeSlug === titleSlug && 'accent'}
				>
					<span class="truncate">{capitalize(title)}</span>
				</kit:list-item>
			{/if}

			{#each summaryItems as item (item.slug)}
				<kit:list-item
					href={`#${item.slug}`}
					class={`depth-${item.depth}`}
					active={activeSlug === item.slug}
					color={activeSlug === item.slug && 'accent'}
				>
					<span class="truncate">{capitalize(item.value)}</span>
				</kit:list-item>
			{/each}
		</kit:list>
	</nav>
{/if}

<style>
	:global(.depth-1) span {
		padding-left: 0rem;
	}

	:global(.depth-2) span {
		padding-left: 0.5rem;
	}

	:global(.depth-3) span {
		padding-left: 1rem;
	}
</style>
