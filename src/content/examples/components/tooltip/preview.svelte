<script lang="ts">
	import { Info } from 'lucide-svelte';
</script>

<div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
	<kit:tooltip label="I'm a tooltip">
		<kit:btn>Hover me</kit:btn>
	</kit:tooltip>

	<kit:tooltip label="More information">
		<kit:icon><Info /></kit:icon>
	</kit:tooltip>
</div>
