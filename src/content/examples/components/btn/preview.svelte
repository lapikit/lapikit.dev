<script lang="ts">
	import { Download, Mail } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn color="accent">Default</kit:btn>
	<kit:btn variant="filled" color="accent">Filled</kit:btn>
	<kit:btn variant="outline" color="accent">Outline</kit:btn>
	<kit:btn variant="text" color="accent">Text</kit:btn>
	<kit:btn variant="filled" color="accent">
		{#snippet prepend()}
			<kit:icon><Download /></kit:icon>
		{/snippet}
		Download
	</kit:btn>
	<kit:btn variant="outline" color="accent">
		{#snippet append()}
			<kit:icon><Mail /></kit:icon>
		{/snippet}
		Contact
	</kit:btn>
</div>
