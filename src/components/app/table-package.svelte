<script lang="ts">
	// assets
	import { BadgeCheck, Check, ChevronDown, OctagonAlert, Pen, User, X } from 'lucide-svelte';
	import LapikitLogo from '$lib/assets/images/lapikit.webp';
	import SvelteLogo from '$lib/assets/images/svelte.webp';
	import type { ModelDropdownProps } from 'lapikit/components';
	import TablePackageRepl from './table-package-repl.svelte';
	import GetStarted from './get-started.svelte';

	// states
	let onlyDisplay = $state(1);

	let result = [
		{
			title: 'package 1',
			logo: LapikitLogo,
			values: [
				['yes', 'yes', '0 / 26', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'yes', 18, 'yes', 'no', 59, 'yes', 'partial', 'yes', 'no', 'partial']
			]
		},
		{
			title: 'package 2',
			logo: SvelteLogo,
			values: [
				['yes', 'yes', '13 / 43', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'yes', 'no', 18, 32, 'yes', 34, 'partial', 'yes', 'no', 'partial']
			]
		},
		{
			title: 'package 3',
			logo: SvelteLogo,
			values: [
				['no', 'no', '34 / 43', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'no', 'no', 18, 22, 'yes', 'nop', 'yes', 'yes', 'no', 'yes']
			]
		},
		{
			title: 'package 4',
			logo: SvelteLogo,
			values: [
				['no', 'no', '12 / 9', 'no', 'no'],
				['yes', 'yes'],
				['yes', 'partial', 'no', 9, 23, 'yes', 12, 'partial', 'yes', 'no', 'partial']
			]
		}
	];

	let content = [
		{
			text: 'Section table',
			subtext: "<a href='/'>test with sepcifique link for test UI</a>",
			subject: [
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit'
			]
		},
		{
			text: 'Section table 2',
			subject: [
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit'
			]
		},
		{
			text: 'Section table 3',
			subtext: "<a href='/'>test with sepcifique link for test UI</a>",
			subject: [
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit',
				'Discover the power to develop with lapikit'
			]
		}
	];

	const validArg = ['Arg1', 'Arg2', 'Arg3', 'Arg4'];
</script>

<section>
	<div>
		<div class="layout_grid_2_column">
			<div>
				<h2>Why Lapikit ?</h2>
				<p class="paragraphe-ws">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi culpa odit, quisquam
					reprehenderit sunt officiis necessitatibus! Aliquid quod odit esse. Perferendis repellat
					reiciendis molestias est! Eveniet sint quaerat consequatur facere?
				</p>

				<ul>
					{#each validArg as argument (argument)}
						<li>
							<kit:icon color="success"><BadgeCheck /></kit:icon>
							{@html argument}
						</li>
					{/each}
				</ul>
			</div>
			<div class="picture_on_grid">
				<TablePackageRepl />
			</div>
		</div>
		<div class="layout_grid_2_column">
			<div>
				<GetStarted />
			</div>
			<div>
				<h2>Why Lapikit ?</h2>
				<p class="paragraphe-ws">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi culpa odit, quisquam
					reprehenderit sunt officiis necessitatibus! Aliquid quod odit esse. Perferendis repellat
					reiciendis molestias est! Eveniet sint quaerat consequatur facere?
				</p>

				<ul>
					{#each validArg as argument (argument)}
						<li>
							<kit:icon color="success"><BadgeCheck /></kit:icon>
							{@html argument}
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="plan_embed">
			<div class="table_plan_head">
				<div></div>
				{#each result as { title, logo }, indexResult}
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
				{#each result as items, indexResult}
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
									{#each result as { title }, index}
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

			{#each content as { text, subtext, subject }, index}
				<div class="table_plan_section">
					<div>
						<p>{text}</p>
						{#if subtext}
							<span>
								{@html subtext}
							</span>
						{/if}
					</div>
					{#each result as _, indexResult}
						<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}></div>
					{/each}
				</div>

				{#each subject as element, indexElement}
					<div class="table_plan">
						<div>{element}</div>
						{#each result as items, indexResult}
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
				{#each result as _, indexResult}
					<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}></div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 8.75rem;
		padding-bottom: 8.75rem;

		> div {
			display: grid;
			max-width: 1538px;
			gap: 20px;
			margin: 0 auto;
			padding-left: 24px;
			padding-right: 24px;
		}

		@media (min-width: 767px) {
			> div {
				padding-left: 40px;
				padding-right: 40px;
			}
		}

		h2 {
			font-size: 24px;
			line-height: 1;
			width: fit-content;
		}

		p.paragraphe-ws {
			max-width: 80%;
			/* margin: 0 auto; */
		}

		.layout_grid_2_column {
			display: grid;
			grid-template-columns: 1fr;
			margin-bottom: 20px;

			> div {
				display: grid;
				gap: 20px;

				ul > li {
					display: flex;
					align-items: center;
					gap: 10px;
					margin-bottom: 10px;
				}

				&.picture_on_grid {
					display: none;
				}
			}

			@media (min-width: 640px) {
				gap: 40px;

				h2 {
					font-size: 48px;
					line-height: 1;
				}
			}

			@media (min-width: 867px) {
				grid-template-columns: 1fr 1fr;
				margin-bottom: 40px;

				> div {
					display: grid !important;
				}
			}
		}
	}
	.plan_embed {
		$border-color-section: var(--kit-color-fill);
		$border-color-lapikit: var(--kit-color-accent);

		width: 100%;
		position: relative;

		> div {
			display: grid;
			column-gap: 4px;
			row-gap: 4px;
			grid-template-columns: 1.5fr minmax(118px, 118px) minmax(118px, 118px);

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
				grid-template-rows: 125px;
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
						grid-template-rows: 80px auto;
						align-items: center;

						p {
							font-weight: 800;
						}

						img {
							width: 54px;
							margin: 0 auto;
						}
					}
				}
			}

			&.table_plan {
				column-gap: 4px;
				grid-template-columns: 2fr minmax(118px, 118px) minmax(118px, 118px);
			}
			&.table_plan > div {
				padding-top: 20px;
				padding-bottom: 20px;

				&:nth-child(1) {
					padding-left: 20px;
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
					padding-top: 20px;
					padding-bottom: 20px;

					&:nth-child(1) {
						padding-left: 20px;
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
					padding-left: 20px;
					padding-top: 20px;
					padding-bottom: 20px;

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
</style>
