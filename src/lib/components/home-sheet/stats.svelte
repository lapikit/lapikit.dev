<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { nbComponents } from '$lib/router';
	import { npmState } from '$lib/stores/npm.svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';

	type Stat = { value: string; label: string; path?: Pathname };

	const stats: Stat[] = $derived([
		{ value: String(nbComponents), label: 'Svelte components', path: '/docs/components' },
		{ value: npmState.downloads || '—', label: 'Downloads on npm' },
		{ value: npmState.version.latest || '—', label: 'Latest release', path: '/docs/changelog' },
		{ value: 'MIT', label: 'Free and open source' }
	]);
</script>

<SheetSection labelledby="stats-title">
	<h2 id="stats-title" class="sr-only">Lapikit in numbers</h2>

	<SheetGrid columns={{ base: 2, lg: 4 }}>
		{#each stats as { value, label, path } (label)}
			<dl class="stat">
				<dt class="stat-label">
					{#if path}
						<a href={resolve(path)}>{label}</a>
					{:else}
						{label}
					{/if}
				</dt>
				<dd class="stat-value">{value}</dd>
			</dl>
		{/each}
	</SheetGrid>
</SheetSection>

<style lang="scss">
	.stat {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		gap: 8px;
		padding: var(--sheet-cell-padding);
	}

	.stat-value {
		font-size: var(--text-6xl);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.stat-label a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 4px;
		transition: text-decoration-color 0.2s ease;

		&:hover,
		&:focus-visible {
			color: var(--kit-color-text);
			text-decoration-color: currentColor;
		}
	}
</style>
