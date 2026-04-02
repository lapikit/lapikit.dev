<script lang="ts">
	import demoImg from '$lib/assets/images/demo.webp?enhanced';
</script>

<svelte:head>
	<link rel="preload" as="image" href={demoImg.img.src} fetchpriority="high" />
</svelte:head>

<p>content</p>

<enhanced:img src="$lib/assets/images/demo.webp" alt="gnome test" sizes="100vw" fetchpriority="high" loading="eager" />
