<script lang="ts">
	import { Bell, Search } from 'lucide-svelte';
</script>

<kit:appbar rounded="md">
	<span style="font-weight: 700; font-size: 1.1rem; margin-right: auto;">Lapikit</span>

	<nav style="display: flex; gap: 0.25rem;">
		<kit:btn variant="text" density="compact">Docs</kit:btn>
		<kit:btn variant="text" density="compact">Components</kit:btn>
	</nav>

	<span style="display: flex; gap: 0.25rem; margin-left: auto;">
		<kit:btn variant="text" density="compact" icon>
			<kit:icon><Search /></kit:icon>
		</kit:btn>
		<kit:btn variant="text" density="compact" icon>
			<kit:icon><Bell /></kit:icon>
		</kit:btn>
	</span>
</kit:appbar>
