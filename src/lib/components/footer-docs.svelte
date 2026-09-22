<script lang="ts">
	import { urlLapikitLicense } from '$lib/constants';
	// states
	let year: number = new Date().getFullYear();
</script>

<footer class="text-sm">
	Copyright © 2025 - {year} Lapikit -
	<a href={urlLapikitLicense} target="_blank" rel="external noreferrer" class="accent-text">
		MIT License
	</a>
	- Developed by
	<a href="https://nycolaide.dev" target="_blank">Nycolaide</a>
</footer>

<style lang="scss">
	footer {
		grid-area: footer;
		max-width: calc(700px + var(--app-spacing-x-page) * 2 + 20rem);
		margin: 0 var(--app-spacing-x-page) var(--app-spacing-y-page-bottom);
	}

	@media (min-width: 1460px) {
		footer {
			width: 100%;
			margin: 0 auto var(--app-spacing-y-page-bottom);
		}
	}
</style>
