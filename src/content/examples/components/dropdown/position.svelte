<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; padding: 3rem 0;">
	{#each ['top', 'bottom', 'left', 'right'] as pos}
		<kit:dropdown position={pos} closeOnClick>
			{#snippet activator(model)}
				<kit:btn
					variant="outline"
					is="button"
					active={model.open}
					onclick={(e) => model.toggle(e.currentTarget)}
				>
					{pos}
				</kit:btn>
			{/snippet}
			<kit:list>
				<kit:list-item is="button">Item A</kit:list-item>
				<kit:list-item is="button">Item B</kit:list-item>
				<kit:list-item is="button">Item C</kit:list-item>
			</kit:list>
		</kit:dropdown>
	{/each}
</div>
