<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		labelledby,
		children
	}: {
		labelledby?: string;
		children: Snippet;
	} = $props();
</script>

<section class="sheet-section" aria-labelledby={labelledby}>
	<div class="sheet-section-frame">
		{@render children()}
	</div>
</section>

<style lang="scss">
	.sheet-section {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;
		padding: 0 var(--lapikit-spacing-block);
	}

	.sheet-section-frame {
		border-left: var(--lapikit-border);
		border-right: var(--lapikit-border);
	}
</style>
