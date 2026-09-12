<script lang="ts">
	//assets
	import { Minus, PictureInPicture2, X } from 'lucide-svelte';

	const codeData = [
		{ content: '<kit:btn s-class_padding="8px">', lapikit: true, indent: 0 },
		{
			content: 'Button s-class',
			indent: 1
		},
		{
			content: '</kit:btn>',
			lapikit: true,
			indent: 0
		},
		{ content: '<kit:btn s-style_background="purple">', lapikit: true, indent: 0 },
		{
			content: 'Button s-style',
			indent: 1
		},
		{
			content: '</kit:btn>',
			lapikit: true,
			indent: 0
		}
	];

	const htmlData = [
		{ content: '<button class="kit-btn padding-8px">', lapikit: true, indent: 0 },
		{
			content: 'Button s-class',
			indent: 1
		},
		{
			content: '</button>',
			lapikit: true,
			indent: 0
		},
		{ content: '<button', lapikit: true, indent: 0 },
		{ content: 'class="kit-btn"', indent: 1 },
		{ content: 'style="background: purple;"', indent: 1 },
		{ content: '>', lapikit: true, indent: 0 },
		{
			content: 'Button s-style',
			indent: 1
		},
		{
			content: '</button>',
			lapikit: true,
			indent: 0
		}
	];
</script>

<kit:card id="home-preview-directive" background="surface-2">
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
			{#each htmlData as { content, indent, lapikit }, index (index)}
				<div class="line-code">
					<span class="line-number">{index + 1}</span>
					<span class:is-lapikit={lapikit} style:padding-left={16 * indent + 'px'}>{content}</span>
				</div>
			{/each}
		</kit:card-content>
	</kit:card-container>
</kit:card>

<style lang="scss">
	:global(#home-preview-directive) {
		border-color: var(--kit-color-border);
		border-style: solid;
		border-width: 1px;
		pointer-events: none;
		font-size: 12px;
		height: fit-content;
		max-width: 540px;
		margin-left: auto;

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
			margin-right: auto;
		}

		@media (min-width: 720px) {
			:global(.kit-card-container) {
				grid-template-columns: minmax(0, 1fr);
			}
		}

		@media (min-width: 1100px) {
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
