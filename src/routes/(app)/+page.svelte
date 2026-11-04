<script lang="ts">
	import HomeSheet from '$lib/components/home-sheet/home-sheet.svelte';
	import { npmState } from '$lib/stores/npm.svelte';

	const version = $derived(npmState.version.latest);
</script>

<HomeSheet {version} />
