<div
	style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; align-items: start;"
>
	{#each [['16/9', 'alpine'], ['4/3', 'forest'], ['1/1', 'city'], ['9/16', 'seaside']] as [r, seed] (r)}
		<div>
			<kit:aspect-ratio ratio={r}>
				<img src="/examples/{seed}.webp" alt="" />
			</kit:aspect-ratio>
			<p style="text-align: center; font-size: 0.8rem; margin-top: 0.375rem; opacity: 0.6;">{r}</p>
		</div>
	{/each}
</div>
