<script lang="ts">
	import AppBarGlobal from '$components/app-bar-global.svelte';

	let { children } = $props();
</script>

<AppBarGlobal />

{@render children()}
