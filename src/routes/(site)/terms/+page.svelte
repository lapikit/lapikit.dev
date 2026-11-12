<script lang="ts">
	import Content, { metadata } from './index.md';
	import SheetSpacer from '$lib/components/sheet/sheet-spacer.svelte';
	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetPage from '$lib/components/sheet/sheet-page.svelte';
</script>

<SheetSpacer innerBottom />
<SheetSection>
	<SheetPage title={metadata.title} category={metadata.category} summary={metadata.summary}>
		<Content />
	</SheetPage>
</SheetSection>
<SheetSpacer innerTop />
