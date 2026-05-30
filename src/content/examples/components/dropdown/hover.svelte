<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	import type { ModelDropdownProps, ModelDropdownHandleProps } from 'lapikit/labs/components';
</script>

<kit:dropdown openOnHover closeOnClick>
	{#snippet activator({ open, toggle }: ModelDropdownProps, handleMouse: ModelDropdownHandleProps)}
		<kit:btn
			variant="outline"
			is="button"
			active={open}
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
			onmouseenter={(e: MouseEvent) => handleMouse('open', e.currentTarget as HTMLElement)}
			onmouseleave={() => handleMouse('close', null)}
		>
			Hover me
			{#snippet append()}
				<kit:icon size="sm"><ChevronDown /></kit:icon>
			{/snippet}
		</kit:btn>
	{/snippet}

	<kit:list>
		<kit:list-item is="button">Option 1</kit:list-item>
		<kit:list-item is="button">Option 2</kit:list-item>
		<kit:list-item is="button">Option 3</kit:list-item>
	</kit:list>
</kit:dropdown>
