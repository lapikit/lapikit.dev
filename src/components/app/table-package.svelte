<script lang="ts">
	let packages = [
		{ title: 'pkg1', values: ['yes', 'yes', 19, 2, 'open', '0 / 26', 'Monthly', 'yes'] },
		{ title: 'pkg2', values: ['tailwind', 'yes', 29, 'No', 'yes', '28 / 11', 'Monthly', 'yes'] },
		{ title: 'pkg3', values: ['tailwind', 'yes', 59, 'No', 'yes', '4 / 26', 'Monthly', 'yes'] },
		{ title: 'pkg4', values: ['tailwind', 'yes', 18, 5, 'No', '4 / 39', 'Monthly', 'yes'] }
	];

	let questions = [
		'Design system support',
		'Styles variables',
		'Components',
		'Utils',
		'Tailwind or UnoCSS required',
		'Dependencies (prod/dev)',
		'Release cadences',
		'Open source and Free'
	];
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

<div class="plan_embed">
	<div class="table_plan_head">
		<div></div>
		<div>pk1</div>
		<div>pk2</div>
		<!-- <div>pk3</div>
		<div>pk4</div> -->
	</div>
	<div class="table_plan_section">
		<div>Features</div>
	</div>
	<div class="table_plan_section">
		<div>
			<p>Section table</p>
			<span><a href="/">test with sepcifique link for test UI</a></span>
		</div>
	</div>

	<div class="table_plan">
		<div>Tailwind or UnoCSS required</div>
		<div>yes</div>
		<div>yes</div>
		<!-- <div>yes</div>
		<div>yes</div> -->
	</div>
	<div class="table_plan">
		<div>Tailwind or UnoCSS required</div>
		<div>yes</div>
		<div>yes</div>
		<!-- <div>yes</div>
		<div>yes</div> -->
	</div>
	<div class="table_plan">
		<div>Tailwind or UnoCSS required</div>
		<div>yes</div>
		<div>yes</div>
		<!-- <div>yes</div>
		<div>yes</div> -->
	</div>
	<div class="table_plan">
		<div>Tailwind or UnoCSS required</div>
		<div>yes</div>
		<div>yes</div>
		<!-- <div>yes</div>
		<div>yes</div> -->
	</div>

	<div class="table_plan_section">
		<div>
			<p>Section table 2</p>
			<span><a href="/">test with sepcifique link for test UI</a></span>
		</div>
	</div>

	<div class="table_plan">
		<div>Tailwind or UnoCSS required</div>
		<div>yes</div>
		<div>yes</div>
		<!-- <div>yes</div>
		<div>yes</div> -->
	</div>

	<div class="table_plan_footer">
		<div></div>
		<div></div>
		<div></div>
		<!-- <div>yes</div>
		<div>yes</div> -->
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
			margin-bottom: -0.8125rem;
			padding-bottom: 0px;

			&.table_plan_head {
				grid-template-rows: 100px;

				> div:not(:nth-child(1)) {
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

				&:not(:nth-child(1)) {
					border-left: 1px solid red;
					border-right: 1px solid red;
				}
			}

			&.table_plan_section {
				border-left: 1px solid orange;
				border-bottom: 1px solid blue;
				border-top: 1px solid blue;
				border-radius: 12px 0 0 12px;

				> div:nth-child(1) {
					grid-area: span 1 / span 3 / span 1 / span 3;
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

			/* &:not(.table_plan_head) > div {
				padding-top: 20px;
				padding-bottom: 20px;
			}

			&:not(.table_plan_head) > div:nth-child(1) {
				border-left: 1px solid orange;
				border-bottom: 1px solid blue;
				border-top: 1px solid blue;
				border-radius: 12px 0 0 12px;
			}

			&.table_plan_head > div:not(:nth-child(1)) {
				border-top: 1px solid pink;
				border-left: 1px solid purple;
				border-right: 1px solid purple;
				border-radius: 12px 12px 0 0;
			} */
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
