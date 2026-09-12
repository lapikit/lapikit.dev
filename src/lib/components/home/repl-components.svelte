<script lang="ts">
	//assets
	import { Minus, PictureInPicture2, X } from 'lucide-svelte';

	const codeData = [
		{ content: "<script lang='ts'>", indent: 0 },
		{ content: '...', indent: 1 },
		{
			content: '<' + '/script>',
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
			content: '<kit:list-item>',
			lapikit: true,
			indent: 2
		},
		{
			content: '{item}',
			indent: 3
		},
		{
			content: '</kit:list-item>',
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

	const compiledData = [
		{ content: "<script lang='ts'>", indent: 0 },
		{ content: 'import {', indent: 1, lapikit: true },
		{ content: 'KitList,', indent: 2, lapikit: true },
		{ content: 'KitListItem', indent: 2, lapikit: true },
		{ content: "} from 'lapikit/components';", indent: 1, lapikit: true },
		{
			content: '',
			indent: 0
		},
		{ content: '...', indent: 1 },
		{
			content: '<' + '/script>',
			indent: 0
		},
		{
			content: '',
			indent: 0
		},
		{
			content: '<KitList density="compact">',
			lapikit: true,
			indent: 0
		},
		{
			content: '{#each data as item (item)}',
			indent: 1
		},
		{ content: '<KitListItem>', lapikit: true, indent: 2 },
		{ content: '{item}', indent: 3 },
		{ content: '</KitListItem>', lapikit: true, indent: 2 },
		{
			content: '{/each}',
			indent: 1
		},
		{
			content: '</KitList>',
			lapikit: true,
			indent: 0
		}
	];
</script>

<kit:card id="home-preview-components" background="surface-2">
	<kit:card-actions>
		<kit:spacer />

		<kit:btn icon size="xs">
			<kit:icon size="xs">
				<Minus />
			</kit:icon>
		</kit:btn>
		<kit:btn icon size="xs">
			<kit:icon size="xs">
				<PictureInPicture2 />
			</kit:icon>
		</kit:btn>
		<kit:btn icon size="xs">
			<kit:icon size="xs">
				<X />
			</kit:icon>
		</kit:btn>
	</kit:card-actions>
	<kit:separator />
	<kit:card-container>
		<kit:card-content>
			{#each codeData as { content, indent, lapikit }, index (index)}
				<div class="line-code">
					<span class="line-number">{index + 1}</span>
					<span class:is-lapikit={lapikit} style:padding-left={16 * indent + 'px'}>{content}</span>
				</div>
			{/each}
		</kit:card-content>

		<kit:card-content>
			{#each compiledData as { content, indent, lapikit }, index (index)}
				<div class="line-code">
					<span class="line-number">{index + 1}</span>
					<span class:is-lapikit={lapikit} style:padding-left={16 * indent + 'px'}>{content}</span>
				</div>
			{/each}
		</kit:card-content>
	</kit:card-container>
</kit:card>

<style lang="scss">
	:global(#home-preview-components) {
		border-color: var(--kit-color-border);
		border-style: solid;
		border-width: 1px;
		pointer-events: none;
		font-size: 12px;
		height: fit-content;
		max-width: 540px;

		:global(.kit-card-container) {
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
			padding-top: 4px;

			:global(.kit-card-content) {
				text-wrap: nowrap;
				overflow: hidden;

				&:last-child {
					background: var(--kit-color-surface-3);
					border-radius: 8px;
				}
			}
		}

		@media (min-width: 560px) {
			:global(.kit-card-container) {
				grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			}
		}

		@media (max-width: 720px) {
			margin-left: auto;
			margin-right: auto;
		}

		@media (min-width: 720px) {
			:global(.kit-card-container) {
				grid-template-columns: minmax(0, 1fr);
			}
		}

		@media (min-width: 960px) {
			:global(.kit-card-container) {
				grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			}
		}
	}

	.line-code {
		display: flex;
		gap: 10px;
		padding-top: 2px;
		padding-bottom: 2px;

		.line-number {
			opacity: 0.35;
			text-align: right;
			min-width: 14px;
			user-select: none;
		}

		> span:last-child {
			opacity: 0.65;
		}
	}

	.is-lapikit {
		font-weight: 600;
		opacity: 1 !important;
		color: var(--kit-color-accent);
	}
</style>
