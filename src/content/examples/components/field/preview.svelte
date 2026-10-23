<script lang="ts">
	let country = $state('');
</script>

<div style="max-width: 360px;">
	<kit:field
		variant="outline"
		message="The field wraps any control: here a native select."
		persistentMessage
		clearable
		dirty={country !== ''}
		onclear={() => (country = '')}
	>
		{#snippet children(control: {
			id: string;
			'aria-describedby': string | undefined;
			'aria-invalid': true | undefined;
			disabled: boolean;
		})}
			<select
				{...control}
				bind:value={country}
				style="flex: 1; border: 0; background: none; font: inherit; color: inherit; outline: none;"
			>
				<option value="" disabled>Choose a country</option>
				<option value="fr">France</option>
				<option value="be">Belgium</option>
				<option value="ch">Switzerland</option>
			</select>
		{/snippet}
	</kit:field>
</div>
