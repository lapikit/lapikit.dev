<script lang="ts">
	import { siteUrl } from '$lib/utils';
	import DocArticle from './_article/doc-article.svelte';
	import DocBlocks from './_article/doc-blocks.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<link rel="alternate" type="text/markdown" href="{siteUrl}{data.doc.path.pathname}.md" />
</svelte:head>

<DocArticle doc={data.doc} summary={data.content.summary} prev={data.prevDoc} next={data.nextDoc}>
	{#if 'blocks' in data.content}
		<DocBlocks blocks={data.content.blocks} />
	{:else}
		{@const Content = data.content.component}
		<Content />
	{/if}
</DocArticle>
