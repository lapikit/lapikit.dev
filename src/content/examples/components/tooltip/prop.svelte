<script lang="ts">
	import { Save, Info } from 'lucide-svelte';
</script>

<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
	<kit:btn icon tooltip="Save"><kit:icon><Save /></kit:icon></kit:btn>
	<kit:btn tooltip={{ label: 'Opens on the right', location: 'right', variant: 'arrow' }}>
		Options
	</kit:btn>
	<kit:chip tooltip="Filter by tag">Svelte</kit:chip>
	<kit:icon tooltip="More information"><Info /></kit:icon>
	<kit:btn disabled tooltip="Fill the form first">Send</kit:btn>
</div>
