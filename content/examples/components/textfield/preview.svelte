<script lang="ts">
	let name = $state('');
</script>

<div style="max-width: 360px; display: flex; flex-direction: column; gap: 1rem;">
	<kit:textfield bind:value={name} placeholder="Full name" />
	<kit:textfield placeholder="Email address" type="email" />
	<kit:textfield placeholder="Password" type="password" />
</div>
