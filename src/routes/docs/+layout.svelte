<script lang="ts">
	import { resolve } from '$app/paths';

	// components
	import Search from '$lib/components/search.svelte';

	// svg
	import githubIcon from '$lib/assets/icons/github.svg?raw';

	let { children } = $props();
</script>

<kit:appbar class="sticky! top-0 z-50" classContent="grid gap-4 md:grid-cols-[auto_1fr_auto]">
	<a href={resolve('/')} class="flex items-center gap-2" aria-label="Lapikit Home">
		<enhanced:img
			src="$lib/assets/images/lapikit.webp?w=38"
			alt="lapikit"
			aria-label="Lapikit"
			sizes="100%"
			loading="lazy"
		/>
		<span>Lapikit</span>
	</a>

	<kit:spacer />

	<div class="flex items-center gap-2">
		<Search />
		<kit:btn href={resolve('/docs')} size="lg">Documentation</kit:btn>
		<kit:btn
			icon
			href="https://github.com/lapikit/lapikit"
			target="_blank"
			aria-label="GitHub"
			size="lg"
		>
			{@html githubIcon}
		</kit:btn>
	</div>
</kit:appbar>

{@render children()}
