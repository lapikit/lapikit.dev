<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const DocPage = $derived(data.doc.component);
</script>

<DocPage />

<div>
	{#if data.prevDoc}
		<a href={resolve('/docs/[...slug]', { slug: data.prevDoc.slug })}>
			<span>Previous</span>
			<span>← {data.prevDoc.title}</span>
		</a>
	{:else}
		<div></div>
	{/if}

	{#if data.nextDoc}
		<a href={resolve('/docs/[...slug]', { slug: data.nextDoc.slug })}>
			<span>Next</span>
			<span>{data.nextDoc.title} →</span>
		</a>
	{/if}
</div>
