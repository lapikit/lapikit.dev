<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BreadcrumbItem } from '$lib/@types';

	let { items = [] }: { items?: BreadcrumbItem[] } = $props();
</script>

{#if items.length > 1}
	<nav aria-label="Breadcrumb">
		<ol class="flex flex-wrap items-center gap-2 text-sm">
			{#each items as item, index (`${item.href ?? item.label}-${index}`)}
				<li>
					{#if index === items.length - 1}
						<span aria-current="page">{item.label}</span>
					{:else if item.href}
						<a href={resolve(item.href)}>{item.label}</a>
					{:else}
						<span>{item.label}</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}
