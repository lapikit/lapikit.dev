<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { manifestPage } from '$lib/constants';

	// modules
	import SearchBtn from '$lib/components/modules/search-btn.svelte';

	// assets
	import { ArrowLeft, BookMarked } from 'lucide-svelte';
	import mascot from '$lib/assets/favicon.svg';

	const notFound = $derived(page.status === 404);
	const suggestions = $derived(notFound ? getSuggestions(page.url.pathname) : []);

	function getSuggestions(pathname: string) {
		const wanted = lastSegment(pathname);
		if (!wanted) return [];

		return manifestPage
			.filter((doc) => doc.state !== 'deprecated' && doc.path.pathname !== '/')
			.map((doc) => ({ doc, distance: distance(wanted, lastSegment(doc.path.pathname)) }))
			.filter(({ distance }) => distance <= Math.max(2, Math.floor(wanted.length / 3)))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 3)
			.map(({ doc }) => ({
				title: doc.head?.title || doc.title,
				href: resolve(doc.path.pathname as Pathname)
			}));
	}

	function lastSegment(pathname: string) {
		return pathname.replace(/\/$/, '').split('/').pop()?.toLowerCase() ?? '';
	}

	function distance(a: string, b: string) {
		let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

		for (let i = 1; i <= a.length; i++) {
			const current = [i];
			for (let j = 1; j <= b.length; j++) {
				current[j] = Math.min(
					previous[j] + 1,
					current[j - 1] + 1,
					previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
				);
			}
			previous = current;
		}

		return previous[b.length];
	}
</script>

<main class="not-found">
	<img src={mascot} alt="" width="160" height="160" />

	<p class="status">{page.status}</p>
	<h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
	<p class="message">
		{#if notFound}
			This page doesn't exist or has moved. Try the search, or pick up from the docs.
		{:else}
			{page.error?.message ?? 'An unexpected error occurred.'} Please try again in a moment.
		{/if}
	</p>

	{#if suggestions.length > 0}
		<div class="suggestions">
			<p>Did you mean:</p>
			<ul>
				{#each suggestions as suggestion (suggestion.href)}
					<li><a href={suggestion.href}>{suggestion.title}</a></li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="actions">
		<kit:btn density="comfortable" rounded="lg" background="accent" color="on-accent" href="/">
			{#snippet prepend()}
				<kit:icon>
					<ArrowLeft />
				</kit:icon>
			{/snippet}
			Back to home
		</kit:btn>
		<kit:btn density="comfortable" rounded="lg" href="/docs">
			{#snippet prepend()}
				<kit:icon>
					<BookMarked />
				</kit:icon>
			{/snippet}
			Browse the docs
		</kit:btn>
		<SearchBtn />
	</div>
</main>

<style>
	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		min-height: calc(100dvh - 64px);
		padding: var(--app-spacing-y-page-top) var(--app-spacing-x-page)
			var(--app-spacing-y-page-bottom);
		text-align: center;
	}

	img {
		width: 160px;
		height: auto;
		transform: rotate(-6deg);
	}

	.status {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: var(--kit-color-accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3rem);
		line-height: 1.1;
	}

	.message {
		max-width: 480px;
		margin: 0;
		opacity: 0.8;
	}

	.suggestions {
		margin-top: 0.5rem;
	}

	.suggestions p {
		margin: 0 0 0.25rem;
		font-weight: 600;
	}

	.suggestions ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25rem 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.suggestions a {
		color: var(--kit-color-accent);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}
</style>
