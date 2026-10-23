<script lang="ts">
	let opened = $state<string[]>([]);

	function toggle(index: number | string) {
		const key = String(index);
		opened = opened.includes(key) ? opened.filter((value) => value !== key) : [...opened, key];
	}
</script>

<div style="display: flex; flex-direction: column; gap: 1rem;">
	{#each ['filled', 'tonal', 'outline', 'surface', 'text'] as variant (variant)}
		<kit:accordion {variant} color="accent">
			{#each [1, 2] as item (item)}
				<kit:accordion-item
					index={`${variant}-${item}`}
					text={`${variant} — item ${item}`}
					open={opened.includes(`${variant}-${item}`)}
					{toggle}
				>
					Content of the {variant} item {item}.
				</kit:accordion-item>
			{/each}
		</kit:accordion>
	{/each}
</div>
