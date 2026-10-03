<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BreadcrumbItem } from '$lib/@types';
	import { capitalize } from '$lib/utils';
	import { ChevronRight, House } from 'lucide-svelte';

	let { items = [] }: { items?: BreadcrumbItem[] } = $props();
</script>

{#if items.length > 1}
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol class="breadcrumb__list">
			{#each items as item, index (`${item.href ?? item.label}-${index}`)}
				<li class="breadcrumb__item">
					{#if index === items.length - 1}
						<span aria-current="page">{capitalize(item.label)}</span>
					{:else if item.href}
						{#if item.label === 'Home'}
							<kit:btn icon size="sm" variant="text" href={resolve('/')}>
								<kit:icon size="sm"> <House /></kit:icon>
							</kit:btn>

							<kit:icon size="sm"> <ChevronRight /></kit:icon>
						{:else}
							<a href={resolve(item.href)} class="breadcrumb__link">{capitalize(item.label)}</a>
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

<style lang="scss">
	.breadcrumb {
		&__list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem;
			margin: 0;
			padding-left: 0;
			list-style: none;
			font-size: 0.875rem;
			line-height: 1.25rem;
		}

		&__item {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		&__link {
			color: var(--kit-color-text);
			text-decoration: underline;

			&:visited {
				color: var(--kit-color-text) !important;
			}
		}
	}
</style>
