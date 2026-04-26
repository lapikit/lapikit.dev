<div
	style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; align-items: start;"
>
	{#each ['cover', 'contain', 'fill'] as f (f)}
		<div>
			<kit:aspect-ratio ratio="1/1" fit={f}>
				<img src="https://picsum.photos/seed/lapikit/800/450" alt="" />
			</kit:aspect-ratio>
			<p style="text-align: center; font-size: 0.8rem; margin-top: 0.375rem; opacity: 0.6;">{f}</p>
		</div>
	{/each}
</div>
