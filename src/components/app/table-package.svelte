<script lang="ts">
	import TablePackageFormat from './table-package-format.svelte';

	let result = [
		{
			title: 'package 1',
			values: [
				['yes', 'yes', '0 / 26', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'yes', 18, 'yes', 'no', 59, 'yes', 'partial', 'yes', 'no', 'partial']
			]
		},
		{
			title: 'package 2',
			values: [
				['yes', 'yes', '13 / 43', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'yes', 'no', 18, 32, 'yes', 34, 'partial', 'yes', 'no', 'partial']
			]
		},
		{
			title: 'package 3',
			values: [
				['no', 'no', '34 / 43', 'yes', 'no'],
				['partial', 'partial'],
				['yes', 'no', 'no', 18, 22, 'yes', 'nop', 'yes', 'yes', 'no', 'yes']
			]
		},
		{
			title: 'package 4',
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

	let onlyDisplay = $state(1);

	// let questions = [
	// 	'Design system support',
	// 	'Styles variables',
	// 	'Components',
	// 	'Utils',
	// 	'Tailwind or UnoCSS required',
	// 	'Dependencies (prod/dev)',
	// 	'Release cadences',
	// 	'Open source and Free'
	// ];
</script>

<!-- <table>
	<thead>
		<tr>
			<th></th>
			{#each packages as { title }}
				<th>{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<tr class="section_table">
			<td colspan="10"> Features </td>
		</tr>
		<tr class="sub_section_table">
			<td colspan="10">
				<p>Section table</p>
				<span><a href="/">test with sepcifique link for test UI</a></span>
			</td>
		</tr>
		{#each questions as question, index}
			<tr>
				<td>{question}</td>
				{#each packages as { values }}
					<td>{values[index]}</td>
				{/each}
			</tr>
		{/each}
	</tbody> -->
<!-- </table> -->

<kit:toolbar>
	{#each result as { title }, index}
		{#if index != 0}
			<kit:btn onclick={() => (onlyDisplay = index)}>{title}</kit:btn>
		{/if}
	{/each}
</kit:toolbar>

<div class="plan_embed">
	<div class="table_plan_head">
		<div></div>

		{#each result as { title }, indexResult}
			<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}>
				<p>{title}</p>
			</div>
		{/each}

		<!-- {#each result as { title }}
			<div><p>{title}</p></div>
		{/each} -->
	</div>
	<div class="table_plan_subhead">
		<div>Features</div>
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
		</div>

		{#each subject as element, indexElement}
			<div class="table_plan">
				<div>{element}</div>
				{#each result as items, indexResult}
					<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}>
						{items.values[index][indexElement]}
					</div>
				{/each}
			</div>
		{/each}
	{/each}

	<div class="table_plan_footer">
		<div></div>

		{#each result as items, indexResult}
			<div class:table_hidden_content={indexResult != 0 && onlyDisplay != indexResult}></div>
		{/each}
	</div>
</div>

<style lang="scss">
	.plan_embed {
		width: 100%;
		position: relative;

		> div {
			display: grid;
			column-gap: 4px;
			row-gap: 4px;
			grid-template-columns: 1.5fr minmax(118px, 118px) minmax(118px, 118px);
			margin-top: 0px;
			//margin-bottom: -0.8125rem;
			padding-bottom: 0px;

			&.table_plan_head {
				grid-template-rows: 100px;

				> div:not(:nth-child(1)) {
					display: flex;
					justify-content: center;
					flex-direction: column;
					border-radius: 12px 12px 0 0;
					border-top: 1px solid cyan;
					border-left: 1px solid red;
					border-right: 1px solid red;
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
					border-left: 1px solid red;
					border-right: 1px solid red;
				}
			}

			&.table_plan_subhead {
				padding-top: 20px;
				padding-bottom: 20px;
				padding-left: 20px;

				> div {
					font-size: var(--kit-font-xl);
					font-weight: 800;
					line-height: 1;
				}
			}
			&.table_plan_section {
				border-left: 1px solid orange;
				border-bottom: 1px solid blue;
				border-top: 1px solid blue;
				border-radius: 12px 0 0 12px;

				> div:nth-child(1) {
					grid-area: span 1 / span 3 / span 1 / span 3;
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
					border-left: 1px solid red;
					border-right: 1px solid red;
				}
			}

			&.table_plan_footer {
				min-height: 26px;
				> div:not(:nth-child(1)) {
					border-left: 1px solid red;
					border-right: 1px solid red;
					border-bottom: 1px solid blue;
					border-radius: 0 0 12px 12px;
				}
			}
		}

		@media (max-width: 766px) {
			.table_hidden_content {
				display: none !important;
			}
		}

		@media (min-width: 767px) {
			> div {
				grid-template-columns:
					1.5fr minmax(118px, 118px) minmax(118px, 118px) minmax(118px, 118px)
					minmax(118px, 118px);

				&.table_plan {
					grid-template-columns:
						1.5fr minmax(118px, 118px) minmax(118px, 118px) minmax(118px, 118px)
						minmax(118px, 118px);
				}
			}
		}
	}
	/* table {
		tbody {
			tr {
				border-bottom: 1px solid black;
				td {
					padding-top: 20px;
					padding-bottom: 20px;
				}

				td:not(:nth-child(1)):not(:nth-child(2)) {
					border-left: 1px solid black;
					border-right: 1px solid black;
				}

				td:nth-child(1) {
					border-left: 1px solid orange;
				}
				td:nth-child(2) {
					border-left: 1px solid red;
					border-right: 1px solid red;
				}
			}
		}
	} */
</style>
