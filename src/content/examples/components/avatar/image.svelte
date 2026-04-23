<div style="display: flex; align-items: center; gap: 0.75rem;">
	{#each ['avatar1', 'avatar2', 'avatar3', 'avatar4'] as seed}
		<kit:avatar>
			<img src="https://picsum.photos/seed/{seed}/80/80" alt="" />
		</kit:avatar>
	{/each}
</div>
