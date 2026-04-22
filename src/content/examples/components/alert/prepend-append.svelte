<script lang="ts">
	import { ShieldCheck, ExternalLink } from 'lucide-svelte';
</script>

<kit:alert tone="success">
	{#snippet prepend()}
		<kit:icon><ShieldCheck /></kit:icon>
	{/snippet}

	Your account is verified and secure.

	{#snippet append()}
		<button style="display: inline-flex; align-items: center; gap: 0.25rem; white-space: nowrap; background: none; border: none; color: inherit; cursor: pointer; padding: 0; font: inherit;">
			Details <kit:icon size="sm"><ExternalLink /></kit:icon>
		</button>
	{/snippet}
</kit:alert>
