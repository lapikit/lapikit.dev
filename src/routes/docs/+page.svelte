<script lang="ts">
	import SheetPage from '$lib/components/sheet/sheet-page.svelte';
	import DocBlocks from '$lib/components/markdown/doc-blocks.svelte';

	let { data } = $props();
</script>

<SheetPage title={data.sheet.title} category={data.sheet.category} summary={data.sheet.summary}>
	<DocBlocks blocks={data.sheet.blocks} />
</SheetPage>
