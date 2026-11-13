<script lang="ts">
	const options = ['Design', 'Engineering', 'Product'];
	let filters = $state<string[]>(['Design']);
	let sort = $state('recent');

	function toggle(option: string) {
		filters = filters.includes(option)
			? filters.filter((value) => value !== option)
			: [...filters, option];
	}
</script>

<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	{#each options as option (option)}
		<kit:chip
			input
			type="checkbox"
			label={option}
			variant="outline"
			checked={filters.includes(option)}
			onchange={() => toggle(option)}
		/>
	{/each}

	{#each ['recent', 'popular'] as value (value)}
		<kit:chip
			input
			type="radio"
			name="sort"
			{value}
			label={value}
			variant="tonal"
			color="accent"
			checked={sort === value}
			onchange={() => (sort = value)}
		/>
	{/each}
</div>

<p>Filters: {filters.join(', ') || 'none'}, sort: {sort}</p>
