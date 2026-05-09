<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { SearchEntry } from '$lib/@types';
	import { docsMetadata } from '$lib/registry';
	import { capitalize } from '$lib/utils';
	import type { ModelPopoverProps } from 'lapikit/labs/components';
	import { ChevronRight, Search, Puzzle, NotebookText, SquareFunction } from 'lucide-svelte';

	const searchEntries: SearchEntry[] = docsMetadata.map((doc, index) => {
		const title = doc.metadata.title;
		const description =
			getMetadataString(doc.metadata.description) ?? `Open ${title} documentation.`;
		const section = toTitle(doc.section ?? 'documentation');
		const keywords = [title, description, section, ...doc.slugSegments].join(' ');

		return {
			title,
			description,
			path: doc.path,
			slug: doc.slug,
			section,
			order: index,
			normalizedTitle: normalize(title),
			normalizedDescription: normalize(description),
			normalizedPath: normalize(doc.path),
			normalizedSection: normalize(section),
			normalizedKeywords: normalize(keywords)
		};
	});

	let openModal = $state(false);
	let query = $state('');
	const normalizedPath = $derived(
		page.url.pathname === '/' ? '/' : page.url.pathname.replace(/\/$/, '')
	);
	const normalizedQuery = $derived(normalize(query));
	const queryTerms = $derived(normalizedQuery.split(' ').filter(Boolean));
	const results = $derived.by(() => {
		if (!normalizedQuery) {
			return [];
		}

		return searchEntries
			.map((entry) => ({ entry, score: getScore(entry, normalizedQuery, queryTerms) }))
			.filter((candidate) => candidate.score > 0)
			.sort((left, right) => right.score - left.score || left.entry.order - right.entry.order)
			.map((candidate) => candidate.entry)
			.slice(0, 8);
	});
	const resultCountLabel = $derived(
		results.length === 1 ? '1 element' : `${results.length} elements`
	);

	function getScore(entry: SearchEntry, value: string, terms: string[]) {
		if (!terms.every((term) => entry.normalizedKeywords.includes(term))) {
			return 0;
		}

		let score = 0;

		if (entry.normalizedTitle === value) score += 120;
		if (entry.normalizedTitle.startsWith(value)) score += 80;
		if (entry.normalizedTitle.includes(value)) score += 50;
		if (entry.normalizedPath.includes(value)) score += 30;
		if (entry.normalizedSection.includes(value)) score += 20;
		if (entry.normalizedDescription.includes(value)) score += 15;

		for (const term of terms) {
			if (entry.normalizedTitle.includes(term)) score += 12;
			if (entry.normalizedSection.includes(term)) score += 8;
			if (entry.normalizedPath.includes(term)) score += 6;
			if (entry.normalizedDescription.includes(term)) score += 4;
		}

		return score;
	}

	function getMetadataString(value: unknown) {
		return typeof value === 'string' && value.trim() ? value.trim() : undefined;
	}

	function normalize(value: string) {
		return value
			.normalize('NFKD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9/]+/g, ' ')
			.trim()
			.replace(/\s+/g, ' ');
	}

	function toTitle(value: string) {
		return value
			.split(/[-/\s]+/)
			.filter(Boolean)
			.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
			.join(' ');
	}

	$effect(() => {});
</script>

<kit:btn
	class="md:hidden!"
	onclick={() => (openModal = true)}
	size="lg"
	aria-label="Search in documentation"
	icon
>
	<kit:icon><Search /></kit:icon>
</kit:btn>

<kit:popover closeOnClick>
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:textfield
			id="docs-search-input"
			class="docs-search-input hidden! md:block!"
			name="q"
			type="search"
			bind:value={query}
			placeholder="Search..."
			autocomplete="off"
			enterkeyhint="go"
			style="width: 300px;"
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
		>
			{#snippet prependInner()}
				<kit:icon><Search /></kit:icon>
			{/snippet}
		</kit:textfield>
	{/snippet}

	<div class="md:min-w-md">
		{#if query}
			{#if results.length > 0}
				<p class="mx-4 mt-1.5 mb-0">{resultCountLabel}</p>

				<kit:list class="max-w-[92%]">
					{#each results as result (result.path)}
						<kit:list-item
							nav
							href={resolve('/docs/[...slug]', { slug: result.slug })}
							active={normalizedPath === result.path}
						>
							{#snippet prepend()}
								{@const Icon =
									result.section === 'Components'
										? Puzzle
										: result.section === 'Hooks'
											? SquareFunction
											: NotebookText}
								<kit:icon><Icon /></kit:icon>
							{/snippet}
							<div class="flex flex-col truncate">
								<strong>{capitalize(result.title)}</strong>
								<span class="truncate">{capitalize(result.description)}</span>
							</div>

							{#snippet append()}
								<kit:icon><ChevronRight /></kit:icon>
							{/snippet}
						</kit:list-item>
					{/each}
				</kit:list>
			{:else}
				<p class="mx-4 mt-1.5 mb-0">No results found.</p>
			{/if}
		{:else}
			<p class="mx-4 mt-1.5 mb-0">Search in documentation...</p>
		{/if}
	</div>
</kit:popover>

<kit:modal bind:open={openModal} size="md" closeOnEsc closeOnClick position="top">
	<kit:textfield
		id="docs-search-input"
		class="docs-search-input"
		name="q"
		type="search"
		bind:value={query}
		placeholder="Search..."
		autocomplete="off"
		enterkeyhint="go"
	>
		{#snippet prependInner()}
			<kit:icon><Search /></kit:icon>
		{/snippet}
	</kit:textfield>
	<div>
		{#if query}
			{#if results.length > 0}
				<p class="mx-4 mt-1.5 mb-0">{resultCountLabel}</p>

				<kit:list>
					{#each results as result (result.path)}
						<kit:list-item
							nav
							href={resolve('/docs/[...slug]', { slug: result.slug })}
							active={normalizedPath === result.path}
						>
							{#snippet prepend()}
								{@const Icon =
									result.section === 'Components'
										? Puzzle
										: result.section === 'Hooks'
											? SquareFunction
											: NotebookText}
								<kit:icon><Icon /></kit:icon>
							{/snippet}
							<div class="flex flex-col truncate">
								<strong>{capitalize(result.title)}</strong>
								<span class="truncate">{capitalize(result.description)}</span>
							</div>

							{#snippet append()}
								<kit:icon><ChevronRight /></kit:icon>
							{/snippet}
						</kit:list-item>
					{/each}
				</kit:list>
			{:else}
				<p class="mx-4 mt-1.5 mb-0">No results found.</p>
			{/if}
		{:else}
			<p class="mx-4 mt-1.5 mb-0">Search in documentation...</p>
		{/if}
	</div>
</kit:modal>

<style>
	:global(.docs-search-input .kit-textfield__message) {
		display: none !important;
	}
</style>
