<script lang="ts">
	import type { DropdownTriggerModel, DropdownTriggerProps } from 'lapikit/components';
	import { ChevronDown } from 'lucide-svelte';
</script>

<kit:dropdown openOnHover closeOnClick>
	{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
		<kit:btn variant="outline" is="button" active={open} {...props}>
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
