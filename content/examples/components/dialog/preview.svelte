<script lang="ts">
	let open = $state(false);
</script>

<kit:btn onclick={() => (open = true)}>Open dialog</kit:btn>

<kit:dialog bind:open>
	<h3 style="margin: 0 0 0.5rem;">Confirm action</h3>
	<p style="margin: 0 0 1.25rem; opacity: 0.7;">
		Are you sure you want to continue? This action cannot be undone.
	</p>
	<div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
		<kit:btn variant="text" onclick={() => (open = false)}>Cancel</kit:btn>
		<kit:btn onclick={() => (open = false)}>Confirm</kit:btn>
	</div>
</kit:dialog>
