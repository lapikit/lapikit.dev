<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { SearchEntry } from '$lib/@types';
	import { docsMetadata } from '$lib/registry';

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
	const bestMatch = $derived(results[0]);
	const resultCountLabel = $derived(
		results.length === 1 ? '1 element' : `${results.length} elements`
	);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!bestMatch) {
			return;
		}

		query = '';
		await goto(resolve('/docs/[...slug]', { slug: bestMatch.slug }));
	}

	function clearQuery() {
		query = '';
	}

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
</script>

<section aria-labelledby="docs-search-title">
	<form role="search" onsubmit={handleSubmit}>
		<label for="docs-search-input">Search</label>

		<div>
			<input
				id="docs-search-input"
				name="q"
				type="search"
				bind:value={query}
				placeholder="Ex. button, hooks, creating a project"
				autocomplete="off"
				enterkeyhint="go"
			/>

			{#if query}
				<button type="button" onclick={clearQuery}>Clear</button>
			{/if}

			<button type="submit" disabled={!bestMatch}>Open</button>
		</div>
	</form>

	{#if query}
		<div aria-live="polite">
			{#if results.length > 0}
				<p>{resultCountLabel}</p>

				<ul>
					{#each results as result (result.path)}
						<li>
							<a
								href={resolve('/docs/[...slug]', { slug: result.slug })}
								class:active={normalizedPath === result.path}
								aria-current={normalizedPath === result.path ? 'page' : undefined}
							>
								<span>{result.section}</span>
								<strong>{result.title}</strong>
								<span>{result.description}</span>
								<code>{result.path}</code>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No pages match this search.</p>
			{/if}
		</div>
	{/if}
</section>
