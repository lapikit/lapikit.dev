<script lang="ts">
	// assets
	import { Check, OctagonAlert, X } from 'lucide-svelte';

	let { value }: { value?: unknown } = $props();
</script>

{#if value == 'yes'}
	<kit:tooltip label="Supported">
		<div class="success">
			<kit:icon color="success">
				<Check />
			</kit:icon>
		</div>
	</kit:tooltip>
{:else if value == 'no'}
	<kit:tooltip label="Unsupported">
		<div class="error">
			<kit:icon color="error">
				<X />
			</kit:icon>
		</div>
	</kit:tooltip>
{:else if value == 'partial'}
	<kit:tooltip label="Partial supported">
		<div class="warning">
			<kit:icon color="warning">
				<OctagonAlert />
			</kit:icon>
		</div>
	</kit:tooltip>
{:else}
	<p>{value}</p>
{/if}

<style lang="scss">
	div {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		--kit-icon-current-size: 12px;
		margin: 0 auto;

		&.success {
			background-color: color-mix(in oklab, var(--kit-color-success) 20%, transparent 100%);
		}

		&.error {
			background-color: color-mix(in oklab, var(--kit-color-error) 20%, transparent 100%);
		}

		&.warning {
			background-color: color-mix(in oklab, var(--kit-color-warning) 20%, transparent 100%);
		}
	}

	p {
		width: fit-content;
		margin: 0 auto;
		font-size: 12px;
	}

	@media (min-width: 580px) {
		p,
		div {
			--kit-icon-current-size: 12px;
			font-size: 13px;
		}
	}

	@media (min-width: 680px) {
		p {
			font-size: 14px;
		}

		div {
			--kit-icon-current-size: 14px;
			width: 25px;
			height: 25px;
		}
	}

	@media (min-width: 780px) {
		p {
			font-size: 16px;
		}

		div {
			--kit-icon-current-size: 16px;
			width: 30px;
			height: 30px;
		}
	}
</style>
