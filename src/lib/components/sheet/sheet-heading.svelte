<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		eyebrow,
		description,
		level = 2,
		align = 'start',
		children
	}: {
		id?: string;
		eyebrow?: string;
		description?: Snippet;
		level?: 1 | 2 | 3;
		align?: 'start' | 'center';
		children: Snippet;
	} = $props();
</script>

<header class="sheet-heading" data-align={align}>
	{#if eyebrow}
		<p class="sheet-heading-eyebrow">{eyebrow}</p>
	{/if}

	<svelte:element this={`h${level}`} {id} class="sheet-heading-title" data-level={level}>
		{@render children()}
	</svelte:element>

	{#if description}
		<p class="sheet-heading-description">{@render description()}</p>
	{/if}
</header>

<style lang="scss">
	.sheet-heading {
		display: grid;
		gap: 16px;
		max-width: 64ch;

		&[data-align='center'] {
			margin: 0 auto;
			text-align: center;
			justify-items: center;
		}
	}

	.sheet-heading-eyebrow {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--kit-color-accent);
	}

	.sheet-heading-title {
		font-family: var(--kit-font);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.03em;
		text-wrap: balance;
		font-size: var(--text-5xl);

		&[data-level='1'] {
			font-size: var(--text-display);
			letter-spacing: -0.045em;
			line-height: 0.95;
		}

		&[data-level='3'] {
			font-size: var(--text-2xl);
		}
	}

	.sheet-heading-description {
		font-size: var(--text-lead);
		line-height: 1.55;
		color: var(--kit-color-text-muted);
		text-wrap: pretty;

		:global(code) {
			font-family: var(--font-mono);
			font-size: 0.9em;
			color: var(--kit-color-text);
		}
	}
</style>
