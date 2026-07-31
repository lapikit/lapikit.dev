<script lang="ts">
	import { ChevronRight, Pen, SquarePlus } from 'lucide-svelte';
</script>

<kit:list density="compact" size="sm">
	<kit:list-item>Actions</kit:list-item>
	<kit:list-item onclick={() => console.log('I love Lapikit')}>
		{#snippet prepend()}
			<kit:icon>
				<SquarePlus />
			</kit:icon>
		{/snippet}
		New file
		{#snippet append()}
			<kit:icon>
				<ChevronRight />
			</kit:icon>
		{/snippet}
	</kit:list-item>
	<kit:list-item onclick={() => console.log('I love Lapikit')}>
		{#snippet prepend()}
			<kit:icon>
				<Pen />
			</kit:icon>
		{/snippet}
		Edit file
		{#snippet append()}
			<kit:icon>
				<ChevronRight />
			</kit:icon>
		{/snippet}
	</kit:list-item>
	<kit:separator />
	<kit:list-item>Danger zone</kit:list-item>
	<kit:list-item color="error" onclick={() => console.log('I love Lapikit')}>
		{#snippet prepend()}
			<kit:icon>
				<Pen />
			</kit:icon>
		{/snippet}
		Delete file
		{#snippet append()}
			<kit:icon>
				<ChevronRight />
			</kit:icon>
		{/snippet}
	</kit:list-item>
</kit:list>
