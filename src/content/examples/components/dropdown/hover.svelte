<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
</script>

<kit:dropdown openOnHover closeOnClick>
	{#snippet activator(model, handleMouse)}
		<kit:btn
			variant="outline"
			is="button"
			active={model.open}
			onclick={(e) => model.toggle(e.currentTarget)}
			onmouseenter={(e) => handleMouse('open', e.currentTarget)}
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
