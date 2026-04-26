<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/labs/components';
</script>

<div
	style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; padding: 3rem 0;"
>
	{#each ['top', 'bottom', 'left', 'right'] as pos (pos)}
		<kit:dropdown position={pos} closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					variant="outline"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				>
					{pos}
				</kit:btn>
			{/snippet}
			<kit:list>
				<kit:list-item is="button">Item A</kit:list-item>
				<kit:list-item is="button">Item B</kit:list-item>
				<kit:list-item is="button">Item C</kit:list-item>
			</kit:list>
		</kit:dropdown>
	{/each}
</div>
