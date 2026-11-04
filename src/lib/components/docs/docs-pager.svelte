<script lang="ts">
	import { resolve } from '$app/paths';
	import { capitalize } from '$lib/utils';

	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	type DocLink = { slug: string; title: string } | null;

	let { prev, next }: { prev: DocLink; next: DocLink } = $props();
</script>

<nav class="docs-pager" aria-label="Pages">
	<div class="docs-pager-grid">
		{#if prev}
			<a class="docs-pager-link" href={resolve('/docs/[...slug]', { slug: prev.slug })}>
				<span class="docs-pager-label">
					<kit:icon size="sm"><ChevronLeft /></kit:icon>
					Previous
				</span>
				<span class="docs-pager-title">{capitalize(prev.title)}</span>
			</a>
		{/if}
		{#if next}
			<a class="docs-pager-link is-next" href={resolve('/docs/[...slug]', { slug: next.slug })}>
				<span class="docs-pager-label">
					Next
					<kit:icon size="sm"><ChevronRight /></kit:icon>
				</span>
				<span class="docs-pager-title">{capitalize(next.title)}</span>
			</a>
		{/if}
	</div>
</nav>

<style lang="scss">
	.docs-pager {
		container-type: inline-size;
	}

	.docs-pager-grid {
		display: grid;
		gap: var(--lapikit-border-width);
		background-color: var(--lapikit-border-color);
	}

	@container (min-width: 640px) {
		.docs-pager-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.docs-pager-link.is-next {
			grid-column: 2;
		}

		.docs-pager-link:only-child {
			grid-column: 1 / -1;
		}
	}

	.docs-pager-link {
		display: grid;
		gap: 6px;
		padding: var(--sheet-cell-padding);
		background-color: var(--kit-color-surface);
		color: var(--kit-color-text);
		text-decoration: none;
		transition: background-color 0.2s ease;

		&:hover,
		&:focus-visible {
			background-color: var(--kit-color-surface-1);

			.docs-pager-title {
				color: var(--kit-color-accent);
			}
		}

		&.is-next {
			justify-items: end;
			text-align: end;
		}
	}

	.docs-pager-label {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.docs-pager-title {
		font-size: var(--text-lg);
		font-weight: 600;
		transition: color 0.2s ease;
	}
</style>
