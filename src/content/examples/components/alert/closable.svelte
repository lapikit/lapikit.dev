<script lang="ts">
	let open = $state(true);
</script>

<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	<kit:alert tone="warning" closable bind:open>
		Dismiss this alert by clicking the close button.
	</kit:alert>

	{#if !open}
		<kit:btn onclick={() => (open = true)}>Restore alert</kit:btn>
	{/if}
</div>
