<script lang="ts">
	import SheetSpacer from '$lib/components/sheet/sheet-spacer.svelte';
	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetPage from '$lib/components/sheet/sheet-page.svelte';
	import DocBlocks from '$lib/components/markdown/doc-blocks.svelte';

	let { data } = $props();
</script>

<SheetSpacer innerBottom />
<SheetSection>
	<SheetPage title={data.sheet.title} category={data.sheet.category} summary={data.sheet.summary}>
		<DocBlocks blocks={data.sheet.blocks} />
	</SheetPage>
</SheetSection>
<SheetSpacer innerTop />
