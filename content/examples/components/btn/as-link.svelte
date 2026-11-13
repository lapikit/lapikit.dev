<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn href="/docs" variant="filled">Go to docs</kit:btn>

	<kit:btn href="/docs" variant="outline">
		Documentation
		{#snippet append()}
			<kit:icon size="sm"><ExternalLink /></kit:icon>
		{/snippet}
	</kit:btn>

	<kit:btn href="/docs" variant="link">Read more</kit:btn>
</div>
