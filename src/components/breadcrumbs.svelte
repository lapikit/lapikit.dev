<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BreadcrumbItem } from '$lib/@types';
	import { capitalize } from '$lib/utils';
	import { ChevronRight, House } from 'lucide-svelte';

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
						{#if item.label === 'Home'}
							<kit:icon size="sm"> <House /></kit:icon>
							<kit:icon size="sm"> <ChevronRight /></kit:icon>
						{:else}
							<a href={resolve(item.href)} class="underline">{capitalize(item.label)}</a>
							<kit:icon size="sm"> <ChevronRight /></kit:icon>
						{/if}
					{:else}
						<span>{capitalize(item.label)}</span>
						<kit:icon size="sm"> <ChevronRight /></kit:icon>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	nav ol {
		padding-left: 0;
	}

	nav ol a {
		color: var(--kit-color-text);
	}
</style>
