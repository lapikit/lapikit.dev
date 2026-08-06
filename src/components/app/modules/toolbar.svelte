<script lang="ts">
	import {
		Link2,
		Paperclip,
		Pen,
		TextAlignCenter,
		TextAlignEnd,
		TextAlignJustify,
		TextAlignStart
	} from 'lucide-svelte';
</script>

<kit:toolbar density="compact">
	<kit:btn icon size="sm">
		<kit:icon><Pen /></kit:icon>
	</kit:btn>
	<kit:separator orientation="vertical" />
	<kit:btn icon size="sm">
		<kit:icon><TextAlignStart /></kit:icon>
	</kit:btn>
	<kit:btn icon size="sm">
		<kit:icon><TextAlignJustify /></kit:icon>
	</kit:btn>
	<kit:btn icon size="sm">
		<kit:icon><TextAlignEnd /></kit:icon>
	</kit:btn>
	<kit:btn icon size="sm">
		<kit:icon><TextAlignCenter /></kit:icon>
	</kit:btn>
	<kit:spacer />
	<kit:btn icon size="sm">
		<kit:icon><Paperclip /></kit:icon>
	</kit:btn>
	<kit:btn icon size="sm">
		<kit:icon><Link2 /></kit:icon>
	</kit:btn>
</kit:toolbar>
