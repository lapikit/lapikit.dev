<script lang="ts">
	import { Tag, X, CircleCheck } from 'lucide-svelte';

	let tags = $state(['Svelte', 'TypeScript', 'CSS']);

	function remove(tag: string) {
		tags = tags.filter((t) => t !== tag);
	}
</script>

<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	<kit:chip variant="outline">
		{#snippet prepend()}
			<kit:icon size="sm"><Tag /></kit:icon>
		{/snippet}
		Label
	</kit:chip>

	<kit:chip variant="filled">
		{#snippet prepend()}
			<kit:icon size="sm"><CircleCheck /></kit:icon>
		{/snippet}
		Verified
	</kit:chip>

	{#each tags as tag}
		<kit:chip variant="outline">
			{tag}
			{#snippet append()}
				<kit:btn icon variant="text" density="compact" size="xs" onclick={() => remove(tag)}>
					<kit:icon size="sm"><X /></kit:icon>
				</kit:btn>
			{/snippet}
		</kit:chip>
	{/each}
</div>
