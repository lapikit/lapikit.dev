<script lang="ts">
	let open = $state(false);
</script>

<kit:btn onclick={() => (open = true)}>Open persistent dialog</kit:btn>

<kit:dialog bind:open persistent>
	<h3 style="margin: 0 0 0.5rem;">Unsaved changes</h3>
	<p style="margin: 0 0 1.25rem; opacity: 0.7;">
		Clicking outside won't close this dialog. You must choose an action.
	</p>
	<div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
		<kit:btn variant="text" onclick={() => (open = false)}>Discard</kit:btn>
		<kit:btn onclick={() => (open = false)}>Save</kit:btn>
	</div>
</kit:dialog>
