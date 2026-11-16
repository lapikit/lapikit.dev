<script lang="ts">
	import { CircleCheck, Info, TriangleAlert, CircleX } from 'lucide-svelte';
</script>

<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	<kit:alert tone="info">
		{#snippet prepend()}
			<kit:icon><Info /></kit:icon>
		{/snippet}
		Your session will expire in 10 minutes. Save your work.
	</kit:alert>

	<kit:alert tone="success">
		{#snippet prepend()}
			<kit:icon><CircleCheck /></kit:icon>
		{/snippet}
		Changes saved successfully.
	</kit:alert>

	<kit:alert tone="warning">
		{#snippet prepend()}
			<kit:icon><TriangleAlert /></kit:icon>
		{/snippet}
		This action cannot be undone.
	</kit:alert>

	<kit:alert tone="error">
		{#snippet prepend()}
			<kit:icon><CircleX /></kit:icon>
		{/snippet}
		Failed to connect to the server. Please try again.
	</kit:alert>
</div>
