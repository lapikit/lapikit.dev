<script lang="ts">
	import { Upload, ChevronDown, ArrowRight } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn>
		{#snippet prepend()}
			<kit:icon><Upload /></kit:icon>
		{/snippet}
		Upload
	</kit:btn>

	<kit:btn variant="outline">
		Options
		{#snippet append()}
			<kit:icon><ChevronDown /></kit:icon>
		{/snippet}
	</kit:btn>

	<kit:btn variant="text">
		Continue
		{#snippet append()}
			<kit:icon><ArrowRight /></kit:icon>
		{/snippet}
	</kit:btn>
</div>
