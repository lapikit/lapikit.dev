<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, ArrowUpRight, ListCollapse, SunMoon } from 'lucide-svelte';

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
	{#each pages as { label, url, description, symbol, preview } (label)}
		<kit:card href={url} variant="outline" class="summary-section-card">
			<span class="summary-section-preview" aria-hidden="true">
				{#if preview}
					<span class="summary-section-from">{preview.from}</span>
					<kit:icon size="xs" class="summary-section-arrow"><ArrowRight /></kit:icon>
					<span class="summary-section-to">{preview.to}</span>
				{:else if symbol}
					{@const Icon = symbol_icons[symbol]}
					{#if Icon}
						<kit:icon size="lg" class="summary-section-symbol"><Icon /></kit:icon>
					{:else}
						<span class="summary-section-to">{symbol}</span>
					{/if}
				{/if}
			</span>
			<span class="summary-section-name">{label}</span>
			<span class="summary-section-description">{description}</span>
			<span class="summary-section-more">
				Documentation
				<kit:icon size="xs"><ArrowUpRight /></kit:icon>
			</span>
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
		gap: 10px;
		padding: 14px;
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

	.summary-section-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		min-height: 112px;
		margin-bottom: 6px;
		border-radius: 10px;
		background-color: color-mix(in oklab, var(--kit-color-fill), transparent 50%);
		font-size: var(--text-xl);

		:global(.summary-section-arrow) {
			color: var(--kit-color-text-muted);
		}

		:global(.summary-section-symbol) {
			--kit-icon-size-lg: 2rem;
			color: var(--kit-color-accent);
		}
	}

	.summary-section-from {
		color: var(--kit-color-text-muted);
	}

	.summary-section-to {
		font-weight: 700;
		color: var(--kit-color-text);
	}

	.summary-section-name {
		font-size: var(--text-md);
		font-weight: 700;
		color: var(--kit-color-text);
		padding-inline: 4px;
	}

	.summary-section-description {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		padding-inline: 4px;
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.summary-section-more {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 4px;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--kit-color-text);
	}

	.summary-section :global(.summary-section-card:is(:hover, :focus-visible) .summary-section-more) {
		color: var(--kit-color-accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.summary-section :global(.summary-section-card) {
			transition: none;
		}
	}
</style>
