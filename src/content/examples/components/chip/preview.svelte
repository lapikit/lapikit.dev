<script lang="ts">
	const filters = ['All', 'Design', 'Engineering', 'Product', 'Marketing'];
	let active = $state('All');
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
	{#each filters as f}
		<kit:chip
			is="button"
			variant={active === f ? 'filled' : 'outline'}
			onclick={() => (active = f)}
		>
			{f}
		</kit:chip>
	{/each}
</div>
