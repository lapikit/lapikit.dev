<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Table from './modules/table.svelte';

	let showFullTable: boolean = $state(false);
</script>

<div class="table-clip" class:is-collapsed={!showFullTable}>
	<Table />
</div>

<div class="toggle" class:on-fade={!showFullTable}>
	<kit:btn
		onclick={() => (showFullTable = !showFullTable)}
		rounded="lg"
		color="surface"
		background="text"
	>
		{#if showFullTable}
			Show less
		{:else}
			Show all 13 rows
		{/if}

		{#snippet append()}
			<kit:icon>
				{#if showFullTable}
					<ChevronUp />
				{:else}
					<ChevronDown />
				{/if}
			</kit:icon>
		{/snippet}
	</kit:btn>
</div>

<style lang="scss">
	.table-clip {
		--clip-height: 640px;
		--fade-height: 200px;
		position: relative;

		:global(section) {
			padding: 0;
			max-width: none;
		}

		&.is-collapsed {
			max-height: var(--clip-height);
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				inset-inline: 0;
				bottom: 0;
				height: var(--fade-height);
				background: linear-gradient(
					to bottom,
					transparent,
					var(--kit-card-bg, var(--kit-color-surface-1))
				);
				pointer-events: none;
			}
		}
	}

	.toggle {
		--clip-height: 640px;
		--fade-height: 200px;
		display: flex;
		justify-content: center;
		margin-top: 18px;

		&.on-fade {
			position: relative;
			z-index: 1;
			margin-top: calc(var(--fade-height) / -2);
		}
	}
</style>
