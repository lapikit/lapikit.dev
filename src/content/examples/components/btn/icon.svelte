<script lang="ts">
	import { Search, Bell, Settings, Plus } from 'lucide-svelte';
</script>

<div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
	<kit:btn icon>
		<kit:icon><Search /></kit:icon>
	</kit:btn>
	<kit:btn icon variant="outline">
		<kit:icon><Bell /></kit:icon>
	</kit:btn>
	<kit:btn icon variant="text">
		<kit:icon><Settings /></kit:icon>
	</kit:btn>
	<kit:btn icon size="lg">
		<kit:icon><Plus /></kit:icon>
	</kit:btn>
</div>
