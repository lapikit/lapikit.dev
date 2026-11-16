<div style="display: flex; align-items: center; gap: 0.75rem;">
	{#each [1, 2, 3, 4] as n (n)}
		<kit:avatar>
			<img src="/examples/avatar-{n}.webp" alt="" />
		</kit:avatar>
	{/each}
</div>
