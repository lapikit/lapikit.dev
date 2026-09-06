<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/components';

	// assets
	import { Check, OctagonAlert, Pen, X } from 'lucide-svelte';
	import LapikitLogo from '$lib/assets/images/lapikit.webp';
	import MeltUI from '$lib/assets/images/melt-ui.webp';
	import ShadcnSvelte from '$lib/assets/images/shadcn-svelte.webp';
	import Skeleton from '$lib/assets/images/skeleton.webp';
	import { nbComponents, nbHooks } from '$lib/constants';

	// states
	let onlyDisplay = $state(1);

	let result = [
		{
			title: 'Lapikit',
			logo: LapikitLogo,
			values: [
				[nbComponents, 'yes', nbHooks],
				['yes', 'yes', 'yes', 'yes', 'yes', '27 / 1', 'yes'],
				['yes', 'yes', 'Bi-Monthly']
			]
		},
		{
			title: 'Skeleton',
			logo: Skeleton,
			values: [
				[42, 'yes', 'no'],
				['yes', 'no', 'yes', 'partial', 'yes', '0 / 32', 'yes'],
				['yes', 'yes', 'Bi-Monthly']
			]
		},
		{
			title: 'Shadcn Svelte',
			logo: ShadcnSvelte,
			values: [
				[62, 'yes', 2],
				['yes', 'no', 'yes', 'no', 'yes', '25 / 4', 'yes'],
				['yes', 'yes', 'Bi-Monthly']
			]
		},
		{
			title: 'Melt UI',
			logo: MeltUI,
			values: [
				[18, 'yes', 'no'],
				['partial', 'no', 'yes', 'partial', 'yes', '10 / 5', 'yes'],
				['yes', 'yes', 'Monthly']
			]
		}
	];

	let content = [
		{
			text: 'Features and possibility',
			subtext: "<a href='/'>test with sepcifique link for test UI</a>",
			subject: ['Svelte Components', 'Theming supports', 'Hooks and actions']
		},
		{
			text: 'Environnements',
			subject: [
				'Runes support',
				'No Tailwind dependances',
				'Tailwind support',
				'UnoCss support',
				'CSS standard support',
				'Dependencies dev/build',
				'Eslint support'
			]
		},
		{
			text: 'Integration and support',
			subtext: "<a href='/'>test with sepcifique link for test UI</a>",
			subject: ['CLI integrated', 'Full open and free', 'Release cadence']
		}
	];
</script>

<section>
	<div class="plan_embed">
		<div class="table_plan_head">
			<div></div>
			{#each result as { title, logo }, indexResult (indexResult)}
				<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}>
					<div class="table_plan_head_content">
						<img src={logo} alt={title} loading="lazy" />
						<p>{title}</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="table_plan_subhead">
			<div>Features</div>
			{#each result as items, indexResult (items)}
				<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}>
					{#if indexResult != 0}
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

							<kit:list>
								{#each result as { title }, index (title)}
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
					{/if}
				</div>
			{/each}
		</div>

		{#each content as { text, subtext, subject }, index (index)}
			<div class="table_plan_section">
				<div>
					<p>{text}</p>
					{#if subtext}
						<span>
							{@html subtext}
						</span>
					{/if}
				</div>
				{#each result as _, indexResult (_)}
					<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}></div>
				{/each}
			</div>

			{#each subject as element, indexElement (indexElement)}
				<div class="table_plan">
					<div>{element}</div>
					{#each result as items, indexResult (indexResult)}
						{@const value = items.values[index][indexElement]}
						<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}>
							{#if value == 'yes'}
								<kit:tooltip label="Supported">
									<kit:icon color="success">
										<Check />
									</kit:icon>
								</kit:tooltip>
							{:else if value == 'no'}
								<kit:tooltip label="Unsupported">
									<kit:icon color="error">
										<X />
									</kit:icon>
								</kit:tooltip>
							{:else if value == 'partial'}
								<kit:tooltip label="Partial supported">
									<kit:icon color="warning">
										<OctagonAlert />
									</kit:icon>
								</kit:tooltip>
							{:else}
								{value}
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		{/each}

		<div class="table_plan_footer">
			<div></div>
			{#each result as _, indexResult (_)}
				<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}></div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 8.75rem;
		padding-bottom: 8.75rem;
		max-width: 1538px;
		margin: 0 auto;
		padding-left: 24px;
		padding-right: 24px;
	}

	.plan_embed {
		$border-color-section: var(--kit-color-fill);
		$border-color-lapikit: var(--kit-color-accent);
		--table_plan_head-template-row: 80px;
		--table_plan_head_content-template-row: 56px auto;
		--plan_embed_div-template-columns: 1.5fr minmax(80px, 80px) minmax(80px, 80px);
		--table_plan-template-columns: 2fr minmax(80px, 80px) minmax(80px, 80px);
		--table_plan-div-padding: 10px;
		--table_plan_section-div-padding: 10px;
		--table_plan_subhead-div-padding: 10px;
		--logo-size: 30px;
		--font-size: 12px;

		width: 100%;
		position: relative;
		gap: 0;

		> div {
			display: grid;
			column-gap: 4px;
			row-gap: 4px;
			grid-template-columns: var(--plan_embed_div-template-columns);

			&.table_plan_head > div:nth-child(2),
			&.table_plan_subhead > div:nth-child(2),
			&.table_plan_section > div:nth-child(2),
			&.table_plan > div:nth-child(2),
			&.table_plan_footer > div:nth-child(2) {
				background-color: color-mix(in oklab, var(--kit-color-accent), transparent 88%);
			}

			&.table_plan_head > div:nth-child(n + 3),
			&.table_plan_subhead > div:nth-child(n + 3),
			&.table_plan_section > div:nth-child(n + 3),
			&.table_plan > div:nth-child(n + 3),
			&.table_plan_footer > div:nth-child(n + 3) {
				background-color: var(--kit-color-surface);
			}

			&.table_plan_head {
				grid-template-rows: var(--table_plan_head-template-row);
				> div:not(:nth-child(1)) {
					text-align: center;
					display: flex;
					justify-content: center;
					flex-direction: column;
					border-radius: 12px 12px 0 0;
					border-top: 1px solid $border-color-section;
					border-left: 1px solid $border-color-section;
					border-right: 1px solid $border-color-section;
					&:nth-child(2) {
						border-top: 2px solid $border-color-lapikit;
						border-left: 2px solid $border-color-lapikit;
						border-right: 2px solid $border-color-lapikit;
					}
					.table_plan_head_content {
						width: fit-content;
						margin: 0 auto;
						display: grid;
						grid-template-rows: var(--table_plan_head_content-template-row);
						align-items: center;

						p {
							font-weight: 800;
							font-size: var(--font-size);
						}

						img {
							width: var(--logo-size);
							margin: 0 auto;
							border-radius: 8px;
						}
					}
				}
			}

			&.table_plan {
				column-gap: 4px;
				grid-template-columns: var(--table_plan-template-columns);
				font-size: var(--font-size);
			}
			&.table_plan > div {
				padding-top: var(--table_plan-div-padding);
				padding-bottom: var(--table_plan-div-padding);

				&:nth-child(1) {
					padding-left: var(--table_plan-div-padding);
				}
				&:not(:nth-child(1)) {
					display: flex;
					align-items: center;
					justify-content: center;
					border-left: 1px solid $border-color-section;
					border-right: 1px solid $border-color-section;
				}

				&:nth-child(2) {
					border-left: 2px solid $border-color-lapikit;
					border-right: 2px solid $border-color-lapikit;
				}
			}

			&.table_plan_subhead {
				> div {
					display: flex;
					align-items: center;
					font-size: var(--kit-font-xl);
					font-weight: 800;
					line-height: 1;
					padding-top: var(--table_plan_subhead-div-padding);
					padding-bottom: var(--table_plan_subhead-div-padding);

					&:nth-child(1) {
						padding-left: var(--table_plan_subhead-div-padding);
					}

					&:not(:nth-child(1)) {
						border-left: 1px solid $border-color-section;
						border-right: 1px solid $border-color-section;
						justify-content: center;
					}

					&:nth-child(2) {
						border-left: 2px solid $border-color-lapikit;
						border-right: 2px solid $border-color-lapikit;
					}
				}
			}
			&.table_plan_section {
				border-left: 2px solid $border-color-section;
				border-bottom: 2px solid $border-color-section;
				border-top: 2px solid $border-color-section;
				border-radius: 12px 0 0 12px;

				> div:nth-child(1) {
					padding-left: var(--table_plan_section-div-padding);
					padding-top: var(--table_plan_section-div-padding);
					padding-bottom: var(--table_plan_section-div-padding);

					p {
						font-size: var(--kit-font-xl);
						font-weight: 800;
						line-height: 1;
					}

					span {
						font-size: var(--kit-font-xs);
						color: var(--kit-color-text-muted);
					}
				}

				> div:not(:nth-child(1)) {
					border-left: 1px solid $border-color-section;
					border-right: 1px solid $border-color-section;
				}

				> div:nth-child(2) {
					border-left: 2px solid $border-color-lapikit;
					border-right: 2px solid $border-color-lapikit;
				}
			}

			&.table_plan_footer {
				min-height: 26px;
				> div:not(:nth-child(1)) {
					border-left: 1px solid $border-color-section;
					border-right: 1px solid $border-color-section;
					border-bottom: 1px solid $border-color-section;
					border-radius: 0 0 12px 12px;

					&:nth-child(2) {
						border-left: 2px solid $border-color-lapikit;
						border-right: 2px solid $border-color-lapikit;
						border-bottom: 2px solid $border-color-lapikit;
					}
				}
			}
		}

		@media (max-width: 866px) {
			.table_hidden_content {
				display: none !important;
			}
		}

		@media (min-width: 867px) {
			> div {
				grid-template-columns:
					1.5fr minmax(118px, 118px) minmax(118px, 118px) minmax(118px, 118px)
					minmax(118px, 118px);

				&.table_plan {
					grid-template-columns:
						1.5fr minmax(118px, 118px) minmax(118px, 118px) minmax(118px, 118px)
						minmax(118px, 118px);
				}

				:global(.hidden_btn) {
					display: none;
				}
			}
		}
	}

	@media (min-width: 680px) {
		.plan_embed {
			--table_plan_head-template-row: 125px !important;
			--table_plan_head_content-template-row: 80px auto !important;
			--plan_embed_div-template-columns: 1.5fr minmax(118px, 118px) minmax(118px, 118px) !important;
			--table_plan-template-columns: 2fr minmax(118px, 118px) minmax(118px, 118px) !important;
			--table_plan-div-padding: 20px !important;
			--table_plan_section-div-padding: 20px !important;
			--table_plan_subhead-div-padding: 20px !important;
			--logo-size: 54px !important;
			--font-size: 16px !important;
		}
	}
</style>
