<script lang="ts">
	import { siteUrl } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const DocPage = $derived(data.doc.component);
</script>

<svelte:head>
	<link rel="alternate" type="text/markdown" href="{siteUrl}{data.doc.path.pathname}.md" />
</svelte:head>

<DocPage {data} />
