<script lang="ts">
	let loading = $state(false);

	function simulate() {
		loading = true;
		setTimeout(() => (loading = false), 2000);
	}
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn disabled>Disabled</kit:btn>
	<kit:btn variant="outline" disabled>Disabled</kit:btn>
	<kit:btn active>Active</kit:btn>
	<kit:btn {loading} onclick={simulate}>
		{loading ? 'Loading…' : 'Click me'}
	</kit:btn>
</div>
