<script lang="ts">
	let content = $state('');
	let hasError = $derived(content.length > 0 && !content.includes('@'));
</script>

<div>
	<p>Your email*</p>
	<kit:textfield
		bind:value={content}
		placeholder="Email address"
		type="email"
		error={hasError}
		errorMessage="Please enter a valid email address."
	/>
</div>
