<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/components';

	// modules
	import Sheet from './sheet.svelte';

	// assets
	import { Pen } from 'lucide-svelte';

	// data
	import { tableHome, tableHomeList } from '../../../../content/app/libs';

	// states
	let onlyDisplay = $state(1);
</script>

<div class="datatable">
	<div class="datatable-head">
		<div></div>
		{#each tableHomeList as { title, logo }, indexResult (indexResult)}
			<div class="node-element" class:hidden-col={indexResult != 0 && onlyDisplay != indexResult}>
				<img src={logo} alt={title} loading="lazy" />
				<p>{title}</p>
			</div>
		{/each}
	</div>
	<div class="datatable-caption">
		<div></div>
		{#each tableHomeList as items, indexResult (items)}
			{#if indexResult == 0}
				<div></div>
			{:else}
				<div class:hidden-col={indexResult != 0 && onlyDisplay != indexResult}>
					<kit:dropdown closeOnClick>
						{#snippet activator({ open, toggle }: ModelDropdownProps)}
							<kit:btn
								icon
								active={open}
								onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
								rounded="full"
								size="sm"
								class="hidden_btn"
							>
								<kit:icon><Pen /></kit:icon>
							</kit:btn>
						{/snippet}

						<kit:list density="compact" size="xs">
							{#each tableHomeList as { title }, index (title)}
								{#if index != 0}
									<kit:list-item
										active={onlyDisplay === index}
										onclick={() => (onlyDisplay = index)}
									>
										{title}
									</kit:list-item>
								{/if}
							{/each}
						</kit:list>
					</kit:dropdown>
				</div>
			{/if}
		{/each}
	</div>

	{#each tableHome as { text, subject }, index (index)}
		<div class="datatable-th">
			<div>
				<p>{text}</p>
			</div>
		</div>

		{#each subject as element, indexElement (indexElement)}
			<div class="datatable-tr">
				<div>
					<p>{element}</p>
				</div>
				{#each tableHomeList as items, indexResult (indexResult)}
					{@const value = items.values[index][indexElement]}

					<div class:hidden-col={indexResult != 0 && onlyDisplay != indexResult}>
						<Sheet {value} />
					</div>
				{/each}
			</div>
		{/each}
	{/each}

	<div class="datatable-footer">
		<div></div>
		{#each tableHomeList as _, indexResult (_)}
			<div class:hidden-col={indexResult != 0 && onlyDisplay != indexResult}></div>
		{/each}
	</div>
	<div style:margin-top="15px">
		<p class="muted-text text-sm">**The data is based on values available as of September 2026</p>
	</div>
</div>

<style lang="scss">
	.datatable {
		--datatable-border-color: var(--kit-color-border);
		--datatable-border-radius: 10px;
		--datatable-border-width: 1px;

		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		position: relative;

		.node-element {
			grid-template-rows: 38px auto;
			gap: 6px;
			border-top: var(--datatable-border-width) solid var(--datatable-border-color);
			border-left: var(--datatable-border-width) solid var(--datatable-border-color);
			border-right: var(--datatable-border-width) solid var(--datatable-border-color);
			border-top-left-radius: var(--datatable-border-radius);
			border-top-right-radius: var(--datatable-border-radius);

			img {
				width: fit-content;
				height: 38px;
				margin: 0 auto;
				border-radius: 8px;
			}

			p {
				font-weight: 700;
				font-size: 10.5px;
				line-height: 1;
			}
		}

		> div {
			display: grid;
			grid-template-columns: 1fr 50px 50px;
			column-gap: 4px;
			row-gap: 4px;
			overflow: hidden;

			> div {
				width: 100%;
				display: grid;
				margin: 0 auto;
				align-items: center;
				padding: 8px;

				&:nth-child(2) {
					--datatable-border-color: var(--kit-color-accent);
					--datatable-border-width: 2px;
					background-color: color-mix(in oklab, var(--kit-color-accent), transparent 92%);
				}

				p {
					font-size: 12px;
				}
			}
		}

		.datatable-head {
			> div {
				justify-content: center;
				text-align: center;
			}
		}

		.datatable-caption {
			> div {
				justify-content: center;
				text-align: center;

				&:not(:nth-child(1)) {
					border-left: var(--datatable-border-width) solid var(--datatable-border-color);
					border-right: var(--datatable-border-width) solid var(--datatable-border-color);
				}
			}
		}

		.datatable-th {
			grid-template-columns: 1fr;
			border: 2px solid var(--datatable-border-color);
			border-right: var(--datatable-border-width) solid var(--datatable-border-color);
			border-top-left-radius: var(--datatable-border-radius);
			border-bottom-left-radius: var(--datatable-border-radius);

			p {
				font-weight: 700;
			}
		}

		.datatable-tr {
			overflow-wrap: break-word;
			word-break: break-word;
			white-space: normal;
			hyphens: auto;

			> div:not(:nth-child(1)) {
				border-left: var(--datatable-border-width) solid var(--datatable-border-color);
				border-right: var(--datatable-border-width) solid var(--datatable-border-color);
				justify-content: center;
			}
		}

		.datatable-footer {
			> div:not(:nth-child(1)) {
				min-height: 10px;
				border-left: var(--datatable-border-width) solid var(--datatable-border-color);
				border-right: var(--datatable-border-width) solid var(--datatable-border-color);
				border-bottom: var(--datatable-border-width) solid var(--datatable-border-color);
				border-bottom-left-radius: var(--datatable-border-radius);
				border-bottom-right-radius: var(--datatable-border-radius);
			}
		}

		@media (max-width: 460px) {
			.hidden-col {
				display: none;
			}
		}

		@media (min-width: 460px) {
			> div {
				display: grid;
				grid-template-columns: 1fr 50px 50px 50px 50px;
			}

			.datatable-caption {
				display: none;
			}
		}

		@media (min-width: 580px) {
			--datatable-border-radius: 12px;

			> div {
				display: grid;
				grid-template-columns: 1fr 60px 60px 60px 60px;

				> div {
					p {
						font-size: 13px;
					}
				}
			}

			.datatable-caption {
				display: none;
			}

			.node-element {
				p {
					font-size: 12.5px;
				}
			}
		}

		@media (min-width: 680px) {
			> div {
				display: grid;
				grid-template-columns: 1fr 80px 80px 80px 80px;

				> div {
					padding: 12px;
					p {
						font-size: 14px;
					}
				}
			}

			.node-element {
				grid-template-rows: 54px auto;

				img {
					height: 54px;
				}
				p {
					font-size: 13.5px;
				}
			}
		}

		@media (min-width: 780px) {
			> div {
				display: grid;
				grid-template-columns: 1fr 100px 100px 100px 100px;

				> div {
					padding: 16px;
					p {
						font-size: 16px;
					}
				}
			}

			.node-element {
				grid-template-rows: 62px auto;

				img {
					height: 62px;
				}
				p {
					font-size: 14.5px;
				}
			}
		}
	}
</style>
