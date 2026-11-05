<script lang="ts">
	import { links } from '$lib/constants';

	let { compact = false }: { compact?: boolean } = $props();

	const titleId = $props.id();
	const sponsor = links.buymeacoffee;
</script>

<section class="sponsor-card" class:is-compact={compact} aria-labelledby={titleId}>
	<div class="sponsor-card-inner">
		<div class="sponsor-card-content">
			<p class="sponsor-card-eyebrow">// Support Lapikit</p>
			<p id={titleId} class="sponsor-card-title">Lapikit is free and built in the open.</p>
			<p class="sponsor-card-text">Help the team keep it that way.</p>
		</div>

		<kit:btn
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			color={sponsor._styles.background}
			rounded="md"
			block={!compact}
		>
			{#snippet prepend()}
				<kit:icon>{@html sponsor.icon}</kit:icon>
			{/snippet}
			Buy the team a coffee
		</kit:btn>
	</div>
</section>

<style lang="scss">
	.sponsor-card {
		container-type: inline-size;
		padding: 24px;
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 94%);
		background-image: radial-gradient(
			color-mix(in oklab, var(--kit-color-accent), transparent 75%) 1px,
			transparent 1px
		);
		background-size: 16px 16px;
	}

	.sponsor-card-inner {
		display: grid;
		gap: 16px;
	}

	.sponsor-card-content {
		display: grid;
		gap: 6px;
	}

	.sponsor-card-eyebrow {
		margin: 0 0 4px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-accent);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.sponsor-card-title {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.sponsor-card-text {
		margin: 0;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.sponsor-card.is-compact {
		padding: var(--sheet-cell-padding);
	}

	@container (min-width: 560px) {
		.is-compact .sponsor-card-inner {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: 24px;
		}
	}
</style>
