<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
	<kit:card elevation="3">
		<kit:card-title>Elevation</kit:card-title>
		<kit:card-content> Elevation effect on component card </kit:card-content>
	</kit:card>

	<kit:card onclick={() => alert('hey !')} elevation={{ base: 2, hover: 4 }}>
		<kit:card-title>Elevation hover</kit:card-title>
		<kit:card-content> Effect elevation basic and hover </kit:card-content>
	</kit:card>
</div>
