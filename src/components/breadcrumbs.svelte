<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BreadcrumbItem } from '$lib/@types';
	import { capitalize } from '$lib/utils';
	import { ChevronRight } from 'lucide-svelte';

	let { items = [] }: { items?: BreadcrumbItem[] } = $props();
</script>

{#if items.length > 1}
	<nav aria-label="Breadcrumb">
		<ol class="flex flex-wrap items-center gap-2 text-sm">
			{#each items as item, index (`${item.href ?? item.label}-${index}`)}
				<li class="flex items-center gap-2">
					{#if index === items.length - 1}
						<span aria-current="page">{capitalize(item.label)}</span>
					{:else if item.href}
						<a href={resolve(item.href)} class="underline">{capitalize(item.label)}</a>
						<kit:icon> <ChevronRight /></kit:icon>
					{:else}
						<span>{capitalize(item.label)}</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	nav {
		--md-max-width: 720px;
		--md-space-xl: 2rem;
		--md-space-lg: 1.5rem;

		max-width: var(--md-max-width);
		margin: 0 auto;
		padding: var(--md-space-xl) var(--md-space-lg);
	}
</style>
