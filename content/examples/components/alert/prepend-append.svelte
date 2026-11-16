<script lang="ts">
	import { ShieldCheck, ExternalLink } from 'lucide-svelte';
</script>

<kit:alert tone="success" variant="tonal">
	{#snippet prepend()}
		<kit:icon><ShieldCheck /></kit:icon>
	{/snippet}

	Your account is verified and secure.

	{#snippet append()}
		<kit:btn variant="link" color="success">
			Details
			{#snippet append()}
				<kit:icon size="sm"><ExternalLink /></kit:icon>
			{/snippet}
		</kit:btn>
	{/snippet}
</kit:alert>
