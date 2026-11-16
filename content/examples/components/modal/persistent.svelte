<script lang="ts">
	let open = $state(false);
</script>

<kit:btn onclick={() => (open = true)}>Open persistent modal</kit:btn>

<kit:modal bind:open persistent>
	<h3 style="margin: 0 0 0.5rem;">Persistent modal</h3>
	<p style="margin: 0 0 1.25rem; opacity: 0.7;">
		Pressing Escape will not close this modal. You must use the button.
	</p>
	<kit:btn onclick={() => (open = false)}>Dismiss</kit:btn>
</kit:modal>
