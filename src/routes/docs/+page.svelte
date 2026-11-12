<script lang="ts">
	import Content, { metadata } from './index.md';
	import SheetPage from '$lib/components/sheet/sheet-page.svelte';
</script>

<SheetPage title={metadata.title} category={metadata.category} summary={metadata.summary}>
	<Content />
</SheetPage>
