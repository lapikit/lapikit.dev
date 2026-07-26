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

<table>
	<thead>
		<tr>
			<th></th>
			{#each packages as { title }}
				<th>{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each questions as question, index}
			<tr>
				<td>{question}</td>
				{#each packages as { values }}
					<td>{values[index]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
