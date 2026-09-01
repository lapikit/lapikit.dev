<script lang="ts">
	const codeData = [
		{ content: "<script lang='ts'>", indent: 0 },
		{
			content: "const data = ['Performant', 'Customize', 'Advanced', 'Explore'];",
			indent: 1
		},
		{
			content: '<&#92;script>',
			indent: 0
		},
		{
			content: '',
			indent: 0
		},
		{
			content: '<kit:list density="compact">',
			lapikit: true,
			indent: 0
		},
		{
			content: '{#each data as item (item)}',
			indent: 1
		},
		{
			content: '<kit:list-item>{item}</kit:list-item>',
			lapikit: true,
			indent: 2
		},
		{
			content: '{/each}',
			indent: 1
		},
		{
			content: '</kit:list>',
			lapikit: true,
			indent: 0
		}
	];
</script>

<kit:card id="home-preview-code">
	<kit:card-actions>
		<kit:btn size="xs">your-component.svelte</kit:btn>
		<kit:btn size="xs" variant="text">table.svelte</kit:btn>
	</kit:card-actions>
	<kit:separator />
	<kit:card-container>
		<kit:card-content>
			<ul>
				<li>your-project/</li>
				<li class="span-2">.svelte-kit/</li>
				<li class="span-2">src/</li>
				<li class="span-3">components/</li>
				<li class="span-4 selected-item">your-component.svelte</li>
				<li class="span-4">table.svelte</li>
				<li class="span-3">routes/</li>
				<li class="span-4">+page.svelte</li>
				<li class="span-3">app.html</li>
				<li>package.json</li>
			</ul>
		</kit:card-content>
		<kit:card-content>
			{#each codeData as { content, indent, lapikit }, index (index)}
				<div class="line-code">
					<div>{index}</div>
					<div class:is-lapikit={lapikit} style:padding-left={16 * indent + 'px'}>{content}</div>
				</div>
			{/each}
		</kit:card-content>
	</kit:card-container>
	<kit:separator />
	<kit:card-actions>
		<span>Simply exemple</span> <kit:spacer /> <span>Lapikit power !</span>
	</kit:card-actions>
</kit:card>

<style lang="scss">
	:global(#home-preview-code) {
		border-color: var(--kit-color-border);
		border-style: solid;
		border-width: 1px;
		pointer-events: none;
		font-size: 12px;
		height: fit-content;

		:global(.kit-card-container) {
			display: grid;
			grid-template-columns: 168px minmax(0, 1fr);
			gap: 20px;

			:global(.kit-card-content:last-child) {
				text-wrap: nowrap;
				overflow: hidden;
			}
		}

		ul {
			li {
				opacity: 0.65;
				padding-top: 4px;
				padding-bottom: 4px;

				&.span-2 {
					padding-left: 16px;
				}

				&.span-3 {
					padding-left: 24px;
				}

				&.span-4 {
					padding-left: 36px;
				}

				&.selected-item {
					opacity: 1 !important;
					color: var(--kit-color-accent);
					background-color: color-mix(in oklab, var(--kit-color-accent) 10%, transparent 30%);
				}
			}
		}

		.line-code {
			display: flex;
			gap: 10px;

			> div:first-child {
				opacity: 0.35;
				text-align: center;
			}

			> div:last-child {
				opacity: 0.65;
			}
		}

		.is-lapikit {
			font-weight: 600;
			opacity: 1 !important;
		}

		span {
			text-transform: uppercase;
			opacity: 0.3;
			font-weight: 800;
		}
	}
</style>
