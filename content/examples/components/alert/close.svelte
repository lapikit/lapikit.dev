<script lang="ts">
	import { X } from 'lucide-svelte';
</script>

<kit:alert tone="info" closable>
	{#snippet close()}
		<kit:icon size="sm"><X /></kit:icon>
	{/snippet}
	Custom close button with an icon from lucide-svelte.
</kit:alert>
