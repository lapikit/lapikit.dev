<script lang="ts">
	import { Bold, Italic, Underline } from 'lucide-svelte';
</script>

<div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
	<kit:toolbar>
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Bold /></kit:icon>{/snippet}
		</kit:btn>
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Italic /></kit:icon>{/snippet}
		</kit:btn>
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Underline /></kit:icon>{/snippet}
		</kit:btn>
	</kit:toolbar>

	<kit:toolbar orientation="vertical">
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Bold /></kit:icon>{/snippet}
		</kit:btn>
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Italic /></kit:icon>{/snippet}
		</kit:btn>
		<kit:btn variant="text" size="sm" icon>
			{#snippet prepend()}<kit:icon><Underline /></kit:icon>{/snippet}
		</kit:btn>
	</kit:toolbar>
</div>
