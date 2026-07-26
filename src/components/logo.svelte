<script lang="ts">
	import { resolve } from '$app/paths';

	let { onlyimage }: { onlyimage?: boolean } = $props();
</script>

<a href={resolve('/')} class="logo-lapikit flex items-center gap-2" aria-label="Lapikit Home">
	<enhanced:img
		src="$lib/assets/images/lapikit.webp?w=38"
		alt="lapikit"
		aria-label="Lapikit"
		sizes="100%"
		loading="lazy"
	/>
	{#if !onlyimage}
		<span>Lapikit</span>
	{/if}
</a>

<style>
	.logo-lapikit :global(span) {
		font-size: 1.325rem;
		font-weight: bold;
	}

	.logo-lapikit :global(picture) {
		max-height: 39px;
		height: 100%;
		position: relative;
		top: -9px;
	}
</style>
