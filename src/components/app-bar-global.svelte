<script lang="ts">
	import Logo from './logo.svelte';
</script>

<kit:appbar classContent="app-bar-lapikit">
	<Logo />
</kit:appbar>

<style>
	:global(header > .app-bar-lapikit) {
		display: grid !important;
		grid-template-columns: auto 1fr auto;
	}
</style>
