<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';

	type Props = {
		children: Snippet;
		url: string;
		duration?: number;
	};

	let { children, url, duration = 150 }: Props = $props();

	// states
	const fadeDuration = $derived(prefersReducedMotion.current ? 0 : duration);
</script>

{#key url}
	<div class="transition" in:fade={{ duration: fadeDuration }}>
		{@render children?.()}
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
