<script lang="ts">
	import { siteUrl } from '$lib/utils';
	import DocArticle from './_article/doc-article.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const Content = $derived(data.content.component);
</script>

<svelte:head>
	<link rel="alternate" type="text/markdown" href="{siteUrl}{data.doc.path.pathname}.md" />
</svelte:head>

<DocArticle doc={data.doc} summary={data.content.summary} prev={data.prevDoc} next={data.nextDoc}>
	<Content />
</DocArticle>
