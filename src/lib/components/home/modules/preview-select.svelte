<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/components';

	let { property = $bindable(), list, hasColor = false } = $props();
</script>

<kit:dropdown closeOnClick density="none" elevation="1">
	{#snippet activator({ toggle }: ModelDropdownProps)}
		<button onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}>
			&#123;
			<span>
				{#if hasColor}
					'
					<div class="color-indicator" style:background={`var(--kit-color-${property})`}></div>
					{property}'
				{:else if typeof property === 'string'}
					'{property}'
				{:else}
					{property}
				{/if}
			</span>
			&#125;
		</button>
	{/snippet}

	<kit:list size="xs">
		{#each list as item (item)}
			<kit:list-item onclick={() => (property = item)} active={item === property}>
				{#snippet prepend()}
					{#if hasColor}
						<div class="color-indicator" style:background={`var(--kit-color-${item})`}></div>
					{/if}
				{/snippet}

				{item}
			</kit:list-item>
		{/each}
	</kit:list>
</kit:dropdown>

<style lang="scss">
	span {
		background-color: color-mix(in oklab, var(--kit-color-accent) 12%, transparent 30%);
		border-radius: var(--kit-shape-sm);
	}

	.color-indicator {
		height: 14px;
		width: 14px;
		display: inline-flex;
		border-radius: 4px;
		border: thin solid var(--kit-color-fill);
	}
</style>
