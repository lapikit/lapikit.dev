<script lang="ts">
	let email = $state('');
	let hasError = $derived(email.length > 0 && !email.includes('@'));
</script>

<div style="max-width: 360px; display: flex; flex-direction: column; gap: 1rem;">
	<kit:textfield
		bind:value={email}
		placeholder="Email address"
		type="email"
		message="We'll never share your email."
		persistentMessage
		error={hasError}
		errorMessage="Please enter a valid email address."
	/>
	<kit:textfield
		placeholder="Username"
		message="3–20 characters"
		max={20}
		counter
		persistentMessage
	/>
</div>
