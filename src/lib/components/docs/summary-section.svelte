<script lang="ts">
	import { page } from '$app/state';
	import { ListCollapse, SunMoon } from 'lucide-svelte';

	let { key = 'Essentials' }: { key: string } = $props();

	const symbol_icons: Record<string, typeof SunMoon> = {
		'list-collapse': ListCollapse,
		'sun-moon': SunMoon
	};

	const pages = $derived(
		((page.data.navigation ?? []).find((section) => section.label === key)?.pages ?? []).filter(
			({ description }) => description
		)
	);
</script>

<div class="summary-section">
	{#each pages as { label, url, description, symbol } (label)}
		<kit:card href={url} variant="outline" class="summary-section-card">
			{#if symbol}
				{@const Icon = symbol_icons[symbol]}
				<span class="summary-section-symbol" aria-hidden="true">
					{#if Icon}
						<kit:icon><Icon /></kit:icon>
					{:else}
						{symbol}
					{/if}
				</span>
			{/if}
			<span class="summary-section-name">{label}()</span>
			<span class="summary-section-description">{description}</span>
			<span class="summary-section-more" aria-hidden="true">Read the docs →</span>
		</kit:card>
	{/each}
</div>

<style lang="scss">
	.summary-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 10px;
		margin-block: 20px;
	}

	.summary-section :global(.summary-section-card) {
		--kit-card-hover: var(--kit-color-surface);
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		justify-items: start;
		gap: 10px;
		padding: 20px;
		text-decoration: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;

		&:hover,
		&:focus-visible {
			--kit-card-border: var(--kit-color-accent);
			box-shadow: 0 4px 18px -8px color-mix(in oklab, var(--kit-color-accent), transparent 45%);
		}
	}

	.summary-section-symbol {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 90%);
		color: var(--kit-color-accent);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.summary-section-name {
		font-family: var(--font-mono);
		font-size: var(--text-md);
		font-weight: 600;
		color: var(--kit-color-text);
	}

	.summary-section-description {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.summary-section-more {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.summary-section :global(.summary-section-card) {
			transition: none;
		}
	}
</style>
