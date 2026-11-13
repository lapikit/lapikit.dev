<script lang="ts">
	import {
		Bold,
		Italic,
		Underline,
		TextAlignStart,
		TextAlignEnd,
		TextAlignCenter
	} from 'lucide-svelte';
</script>

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
	<kit:separator orientation="vertical" />
	<kit:btn variant="text" size="sm" icon>
		{#snippet prepend()}<kit:icon><TextAlignStart /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm" icon>
		{#snippet prepend()}<kit:icon><TextAlignCenter /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm" icon>
		{#snippet prepend()}<kit:icon><TextAlignEnd /></kit:icon>{/snippet}
	</kit:btn>
</kit:toolbar>
