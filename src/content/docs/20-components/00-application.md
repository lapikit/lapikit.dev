---
title: "Application"
---

<script>
	import LazyDemo from '$lib/components/lazy-demo.svelte';
</script>
<!--
<script>
    import MyComponent from "../../../content/examples/sandbox/my-component.svelte";
</script> -->

Page component application markdown

<!-- <MyComponent/> -->

<LazyDemo loader={() => import('../../../content/examples/sandbox/my-component.svelte')} />
