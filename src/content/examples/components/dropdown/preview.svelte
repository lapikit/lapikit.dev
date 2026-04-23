<script lang="ts">
	import { Settings, User, LogOut, ChevronDown } from 'lucide-svelte';
</script>

<kit:dropdown closeOnClick>
	{#snippet activator(model)}
		<kit:btn
			variant="outline"
			is="button"
			active={model.open}
			onclick={(e) => model.toggle(e.currentTarget)}
		>
			Account
			{#snippet append()}
				<kit:icon size="sm"><ChevronDown /></kit:icon>
			{/snippet}
		</kit:btn>
	{/snippet}

	<kit:list>
		<kit:list-item is="button">
			{#snippet prepend()}<kit:icon><User /></kit:icon>{/snippet}
			Profile
		</kit:list-item>
		<kit:list-item is="button">
			{#snippet prepend()}<kit:icon><Settings /></kit:icon>{/snippet}
			Settings
		</kit:list-item>
		<kit:list-item is="button">
			{#snippet prepend()}<kit:icon><LogOut /></kit:icon>{/snippet}
			Sign out
		</kit:list-item>
	</kit:list>
</kit:dropdown>
