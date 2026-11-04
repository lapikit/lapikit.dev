<script lang="ts">
	import { Check, Minus, X } from 'lucide-svelte';

	let { value }: { value: string | number } = $props();

	const statuses = {
		yes: { label: 'Supported', icon: Check },
		partial: { label: 'Partially supported', icon: Minus },
		no: { label: 'Not supported', icon: X }
	} as const;

	const status = $derived(
		typeof value === 'string' && value in statuses ? (value as keyof typeof statuses) : undefined
	);
</script>

{#if status}
	{@const { label, icon: Icon } = statuses[status]}
	<span class="comparison-value is-{status}">
		<kit:icon size="sm"><Icon aria-hidden="true" /></kit:icon>
		<span class="sr-only">{label}</span>
	</span>
{:else}
	<span class="comparison-text">{value}</span>
{/if}

<style lang="scss">
	.comparison-value {
		display: inline-grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 999px;
		vertical-align: middle;

		&.is-yes {
			background-color: color-mix(in oklab, var(--kit-color-success), transparent 82%);
			color: var(--kit-color-success);
		}

		&.is-partial {
			background-color: color-mix(in oklab, var(--kit-color-warning), transparent 82%);
			color: var(--kit-color-warning);
		}

		&.is-no {
			color: var(--kit-color-text-muted);
		}
	}

	.comparison-text {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
</style>
