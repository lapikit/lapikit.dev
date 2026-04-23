<script lang="ts">
	import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-svelte';
</script>

<kit:toolbar>
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><Bold /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><Italic /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><Underline /></kit:icon>{/snippet}
	</kit:btn>
	<kit:separator orientation="vertical" />
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><AlignLeft /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><AlignCenter /></kit:icon>{/snippet}
	</kit:btn>
	<kit:btn variant="text" size="sm">
		{#snippet prepend()}<kit:icon><AlignRight /></kit:icon>{/snippet}
	</kit:btn>
</kit:toolbar>
