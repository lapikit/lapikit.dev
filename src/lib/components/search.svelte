<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { DocSummary } from '$lib/@types';
	import { manifestPage } from '$lib/constants';
	import { capitalize } from '$lib/utils';
	import {
		CornerDownLeft,
		Gavel,
		GitFork,
		Puzzle,
		Search,
		SquareFunction,
		StickyNote,
		ToolCase,
		VectorSquare
	} from 'lucide-svelte';

	let {
		open = $bindable(false)
	}: {
		open?: boolean;
	} = $props();

	const listboxId = $props.id();
	const categoryIcons: Record<string, typeof Puzzle> = {
		Components: Puzzle,
		Essentials: ToolCase,
		'Stores and Hooks': SquareFunction,
		'Extra Topics': VectorSquare,
		Release: GitFork,
		Terms: Gavel
	};

	let query: string = $state('');
	let selectedIndex: number = $state(0);
	let inputRef: HTMLInputElement | null = $state(null);
	let listboxRef: HTMLElement | null = $state(null);

	const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

	const searchablePages = manifestPage.filter(
		(page) => page.path.pathname !== '/' && page.state !== 'deprecated'
	);

	const trimmedQuery = $derived(query.trim());

	const results = $derived.by(() => {
		const q = normalize(trimmedQuery);
		if (!q) return [];

		return searchablePages.filter((page) => {
			const haystack = [page.title, page.category, page.head?.title, ...(page.keywords ?? [])]
				.filter(Boolean)
				.map((s) => normalize(s as string));

			return haystack.some((s) => s.includes(q));
		});
	});

	const optionId = (index: number) => `${listboxId}-${index}`;

	$effect(() => {
		void results;
		selectedIndex = 0;
	});

	$effect(() => {
		if (open) requestAnimationFrame(() => inputRef?.focus());
	});

	function handleKeydown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			open = !open;
			return;
		}

		if (!open || results.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				select((selectedIndex + 1) % results.length);
				break;
			case 'ArrowUp':
				event.preventDefault();
				select((selectedIndex - 1 + results.length) % results.length);
				break;
			case 'Enter':
				event.preventDefault();
				navigateTo(results[selectedIndex]);
				break;
		}
	}

	function select(index: number) {
		selectedIndex = index;
		requestAnimationFrame(() => {
			listboxRef?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
		});
	}

	$effect(() => {
		if (!open) query = '';
	});

	function handleClose() {
		open = false;
	}

	function navigateTo(page: DocSummary) {
		handleClose();
		goto(resolve(page.path.pathname as Pathname));
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<kit:dialog
	bind:open
	size="lg"
	position="top"
	space="12dvh"
	rounded="lg"
	color="surface"
	elevation="3"
	classContent="search-dialog"
	aria-label="Search the documentation"
>
	<div class="search-field">
		<kit:icon class="search-field-icon"><Search /></kit:icon>
		<input
			bind:this={inputRef}
			bind:value={query}
			type="text"
			role="combobox"
			placeholder="Search the documentation"
			autocomplete="off"
			spellcheck="false"
			aria-label="Search the documentation"
			aria-expanded={results.length > 0}
			aria-controls={listboxId}
			aria-activedescendant={results.length ? optionId(selectedIndex) : undefined}
		/>
		<kit:btn
			variant="outline"
			size="sm"
			density="compact"
			rounded="md"
			class="search-close"
			aria-label="Close search"
			onclick={handleClose}
		>
			Esc
		</kit:btn>
	</div>

	{#if results.length > 0}
		<ul bind:this={listboxRef} id={listboxId} class="search-results" role="listbox">
			{#each results as result, index (result.path.pathname)}
				{@const Icon = categoryIcons[result.category ?? ''] ?? StickyNote}
				<li id={optionId(index)} role="option" aria-selected={index === selectedIndex}>
					<a
						class="search-result"
						href={resolve(result.path.pathname as Pathname)}
						tabindex="-1"
						onclick={handleClose}
						onmouseenter={() => (selectedIndex = index)}
					>
						<span class="search-result-icon" aria-hidden="true">
							<kit:icon size="sm"><Icon /></kit:icon>
						</span>
						<span class="search-result-body">
							<span class="search-result-title"
								>{capitalize(result.head?.title ?? result.title)}</span
							>
							{#if result.head?.description}
								<span class="search-result-text">{result.head.description}</span>
							{/if}
						</span>
						{#if result.category}
							<span class="search-result-category">{result.category}</span>
						{/if}
						<span class="search-result-enter" aria-hidden="true">
							<kit:icon size="xs"><CornerDownLeft /></kit:icon>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="search-empty" role="status">
			{#if trimmedQuery}
				No results for “<strong>{trimmedQuery}</strong>”.
			{:else}
				// Type to search components, guides and hooks.
			{/if}
		</p>
	{/if}

	<footer class="search-footer" aria-hidden="true">
		<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
		<span><kbd>↵</kbd> open</span>
		<span><kbd>Esc</kbd> close</span>
	</footer>
</kit:dialog>

<style lang="scss">
	:global(div.kit-dialog__content.search-dialog) {
		display: flex;
		flex-direction: column;
		padding: 0;
		border: var(--lapikit-border);
		overflow: hidden;
	}

	.search-field {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		border-bottom: var(--lapikit-border);

		:global(.search-field-icon) {
			flex-shrink: 0;
			color: var(--kit-color-text-muted);
		}

		input {
			flex: 1;
			min-width: 0;
			height: 40px;
			padding: 0;
			border: 0;
			background: none;
			color: var(--kit-color-text);
			font: inherit;
			font-size: var(--text-lg);
			outline: none;

			&::placeholder {
				color: var(--kit-color-text-muted);
			}
		}

		:global(.search-close) {
			flex-shrink: 0;
			font-family: var(--font-mono);
			font-size: var(--text-xs);
		}
	}

	.search-results {
		max-height: min(420px, 60dvh);
		margin: 0;
		padding: 8px;
		overflow-y: auto;
		list-style: none;
	}

	.search-result {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: var(--kit-shape-md);
		color: var(--kit-color-text);
		text-decoration: none;

		[aria-selected='true'] > & {
			background-color: var(--kit-color-surface-1);

			.search-result-icon {
				background-color: var(--kit-color-accent);
				color: var(--kit-color-on-accent);
			}

			.search-result-enter {
				opacity: 1;
			}
		}
	}

	.search-result-icon {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: var(--kit-shape-sm);
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 88%);
		color: var(--kit-color-accent);
	}

	.search-result-body {
		display: grid;
		flex: 1;
		min-width: 0;
		gap: 2px;
	}

	.search-result-title {
		font-weight: 600;
	}

	.search-result-text {
		overflow: hidden;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.search-result-category {
		display: none;
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;

		@media (min-width: 640px) {
			display: block;
		}
	}

	.search-result-enter {
		flex-shrink: 0;
		color: var(--kit-color-text-muted);
		opacity: 0;
	}

	.search-empty {
		margin: 0;
		padding: 32px 16px;
		color: var(--kit-color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-align: center;

		strong {
			color: var(--kit-color-text);
			font-weight: 600;
		}
	}

	.search-footer {
		display: none;
		gap: 16px;
		padding: 10px 16px;
		border-top: var(--lapikit-border);
		color: var(--kit-color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);

		@media (min-width: 640px) {
			display: flex;
		}

		span {
			display: inline-flex;
			align-items: center;
			gap: 4px;
		}
	}

	kbd {
		display: inline-grid;
		place-items: center;
		min-width: 20px;
		height: 20px;
		padding: 0 4px;
		border: 1px solid var(--kit-color-border);
		border-radius: var(--kit-shape-xs);
		background-color: var(--kit-color-surface-1);
		font-family: inherit;
		font-size: inherit;
	}
</style>
