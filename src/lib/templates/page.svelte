<script lang="ts">
	let { children } = $props();
</script>

<p style:color="red">template mdsvex page.svelte</p>

<article>
	{@render children?.()}
</article>
