<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { manifestPage } from '$lib';
	import { capitalize } from '$lib/utils';
	import {
		Gavel,
		GitFork,
		Puzzle,
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

	// states
	let query: string = $state('');
	let selectedIndex: number = $state(0);
	let fieldRef: HTMLElement | null = $state(null);

	$effect(() => {
		results; // dépendance
		selectedIndex = 0;
	});

	$effect(() => {
		if (open) {
			requestAnimationFrame(() => {
				fieldRef?.querySelector('input')?.focus();
			});
		}
	});

	const normalize = (str: string) =>
		str
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');

	const searchablePages = manifestPage.filter(
		(page) => page.path.pathname !== '/' && page.state !== 'deprecated'
	);

	const results = $derived.by(() => {
		const q = normalize(query.trim());
		if (!q) return [];

		return searchablePages.filter((page) => {
			const haystack = [page.title, page.category, page.head?.title, ...(page.keywords ?? [])]
				.filter(Boolean)
				.map((s) => normalize(s as string));

			return haystack.some((s) => s.includes(q));
		});
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
				selectedIndex = (selectedIndex + 1) % results.length;
				scrollToSelected();
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = (selectedIndex - 1 + results.length) % results.length;
				scrollToSelected();
				break;
			case 'Enter':
				event.preventDefault();
				navigateTo(results[selectedIndex]);
				break;
		}
	}

	function handleClose() {
		open = false;
		query = '';
	}

	function navigateTo(page: (typeof manifestPage)[number]) {
		handleClose();
		goto(page.path.pathname);
	}

	function scrollToSelected() {
		requestAnimationFrame(() => {
			document
				.querySelector('#search-modal [data-selected="true"]')
				?.scrollIntoView({ block: 'nearest' });
		});
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<kit:modal id="search-modal" bind:open contain size="lg">
	<div class="flex gap-2.5">
		<kit:textfield
			bind:ref={fieldRef}
			type="search"
			placeholder="Search"
			bind:value={query}
			clearable
		/>
		<kit:btn icon density="comfortable">ESC</kit:btn>
	</div>

	{#if results.length > 0}
		<kit:card class="search-result" density="none">
			<kit:list density="comfortable">
				{#each results as result, i}
					<kit:list-item
						class="gap-4!"
						href={result?.path?.pathname}
						active={i === selectedIndex}
						data-selected={i === selectedIndex}
						onclick={() => handleClose()}
						onmouseenter={() => (selectedIndex = i)}
					>
						{#snippet prepend()}
							<kit:icon>
								{#if result?.category === 'Components'}
									<Puzzle />
								{:else if result?.category === 'Essentials'}
									<ToolCase />
								{:else if result?.category === 'Stores and Hooks'}
									<SquareFunction />
								{:else if result?.category === 'Extra Topics'}
									<VectorSquare />
								{:else if result?.category === 'Release'}
									<GitFork />
								{:else if result?.category === 'Terms'}
									<Gavel />
								{:else}
									<StickyNote />
								{/if}
							</kit:icon>
						{/snippet}

						<div class="grid leading-5">
							<span>{capitalize(result?.head?.title)}</span>
							<span class="description">{result?.head?.description}</span>
						</div>
					</kit:list-item>
				{/each}
			</kit:list>
		</kit:card>
	{/if}
</kit:modal>

<style>
	:global(#search-modal.kit-modal__content) {
		--kit-modal-top: 15%;
		--kit-modal-translate-y: -15%;
	}

	:global(.search-result) {
		margin-top: 25px;
		overflow: hidden;
	}

	:global(.search-result .kit-list) {
		max-height: 400px;
		overflow-x: auto;
	}

	span.description {
		color: var(--kit-color-text-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
