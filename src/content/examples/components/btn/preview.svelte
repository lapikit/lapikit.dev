<script lang="ts">
	import { Download, Mail } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn>Default</kit:btn>
	<kit:btn variant="filled">Filled</kit:btn>
	<kit:btn variant="outline">Outline</kit:btn>
	<kit:btn variant="text">Text</kit:btn>
	<kit:btn variant="filled">
		{#snippet prepend()}
			<kit:icon><Download /></kit:icon>
		{/snippet}
		Download
	</kit:btn>
	<kit:btn variant="outline">
		{#snippet append()}
			<kit:icon><Mail /></kit:icon>
		{/snippet}
		Contact
	</kit:btn>
</div>
