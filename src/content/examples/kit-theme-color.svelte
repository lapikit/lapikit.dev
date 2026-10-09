<script lang="ts">
	const colors = {
		surface: ['hsl(0 0% 100%)', 'hsl(240 3% 11%)'],
		'surface-1': ['hsl(240 15% 96.5%)', 'hsl(240 2% 17.5%)'],
		'surface-2': ['hsl(240 10% 93%)', 'hsl(240 1.5% 23%)'],
		'surface-3': ['hsl(0 0% 100%)', 'hsl(240 1.5% 28%)'],
		text: ['hsl(222 20% 10%)', 'hsl(0 0% 100%)'],
		'text-muted': ['hsl(220 10% 40%)', 'hsl(240 3% 56%)'],
		'text-subtle': ['hsl(220 8% 58%)', 'hsl(240 2.5% 38%)'],
		'text-disabled': ['hsl(220 5% 76%)', 'hsl(240 1.5% 25%)'],
		fill: ['hsl(240 8% 93%)', 'hsl(240 2.5% 24%)'],
		'fill-hover': ['hsl(240 4% 91%)', 'hsl(240 2.5% 28%)'],
		'fill-active': ['hsl(240 4% 88%)', 'hsl(240 2.5% 31%)'],
		border: ['hsl(220 16% 88%)', 'hsl(240 2% 26%)'],
		shadow: ['hsl(240 3% 11%)', 'hsl(240 3% 11%)'],
		accent: ['hsl(220 90% 56%)', 'hsl(220 85% 65%)'],
		'on-accent': ['hsl(0 0% 100%)', 'hsl(240 3% 11%)'],
		success: ['hsl(145 50% 38%)', 'hsl(145 50% 50%)'],
		'on-success': ['hsl(0 0% 100%)', 'hsl(240 3% 11%)'],
		warning: ['hsl(35 80% 45%)', 'hsl(35 85% 58%)'],
		'on-warning': ['hsl(222 20% 10%)', 'hsl(240 3% 11%)'],
		error: ['hsl(5 65% 48%)', 'hsl(5 70% 60%)'],
		'on-error': ['hsl(0 0% 100%)', 'hsl(240 3% 11%)'],
		info: ['hsl(205 60% 42%)', 'hsl(205 65% 58%)'],
		'on-info': ['hsl(0 0% 100%)', 'hsl(240 3% 11%)'],
		focus: ['hsl(35 90% 56%)', 'hsl(35 90% 62%)']
	};

	const entries = Object.entries(colors);
	const lists = [
		{ title: 'Light', index: 0 },
		{ title: 'Dark', index: 1 }
	];
</script>

<div class="color-lists">
	{#each lists as list (list.index)}
		<div class="color-list">
			<span class="color-list-title">{list.title}</span>
			<ul>
				{#each entries as [name, values] (name)}
					<li>
						<kit:sheet
							class="color-swatch"
							rounded="sm"
							elevation="2"
							style="background-color: {values[list.index]}"><span></span></kit:sheet
						>
						<div class="color-label">
							<code>--kit-color-{name}</code>
							<span class="text-xs">{values[list.index]}</span>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style lang="scss">
	.color-lists {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 2rem;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.color-list-title {
		display: block;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	li :global(.color-swatch) {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
	}

	code {
		border: 0;
		font-size: 14px;
	}

	.color-label {
		display: flex;
		flex-direction: column;
	}
</style>
