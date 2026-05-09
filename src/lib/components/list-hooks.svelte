<script lang="ts">
	import { docsNavigation } from '$lib';

	let { key = 'Essentials' }: { key: string } = $props();

	const hooks = docsNavigation.find((section) => section.label === key)?.pages ?? [];
</script>

<kit:list density="comfortable">
	{#each hooks as { label, url, description } (label)}
		<kit:list-item href={url}>
			<div class="gap-0.25rem flex flex-col">
				<span class="font-bold">{label}</span>
				{#if description}
					<span>{description}</span>
				{/if}
			</div>
		</kit:list-item>
	{/each}
</kit:list>
