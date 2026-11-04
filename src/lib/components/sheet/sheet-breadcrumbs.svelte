<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BreadcrumbItem } from '$lib/@types';
	import { capitalize } from '$lib/utils';

	import { House } from 'lucide-svelte';

	let { items = [] }: { items?: BreadcrumbItem[] } = $props();

	const HOME = 'Home';
</script>

{#if items.length > 1}
	<nav class="sheet-breadcrumbs" aria-label="Breadcrumb" data-prose-skip>
		<ol>
			{#each items as { label, href }, index (`${href ?? label}-${index}`)}
				{@const current = index === items.length - 1}
				<li>
					{#if current}
						<span class="sheet-breadcrumbs-current" aria-current="page">{capitalize(label)}</span>
					{:else if href && label === HOME}
						<a class="sheet-breadcrumbs-link" href={resolve('/')} aria-label={HOME}>
							<kit:icon size="xs"><House /></kit:icon>
						</a>
					{:else if href}
						<a class="sheet-breadcrumbs-link" href={resolve(href)}>{capitalize(label)}</a>
					{:else}
						<span>{capitalize(label)}</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style lang="scss">
	.sheet-breadcrumbs ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 0;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1.5;
		color: var(--kit-color-text-muted);
	}

	li {
		display: inline-flex;
		align-items: center;
	}

	li + li::before {
		content: '/';
		margin-inline: 10px;
		color: var(--kit-color-border);
	}

	.sheet-breadcrumbs-link {
		display: inline-flex;
		align-items: center;
		color: inherit;
		text-decoration: none;
		transition: color 0.15s ease;

		&:hover,
		&:focus-visible {
			color: var(--kit-color-accent);
		}
	}

	.sheet-breadcrumbs-current {
		color: var(--kit-color-text);
	}
</style>
