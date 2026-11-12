<script lang="ts">
	import NotFoundSheet from '$lib/components/layout/not-found-sheet.svelte';
	import SheetSpacer from '$lib/components/sheet/sheet-spacer.svelte';
	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
</script>

<main>
	<SheetSpacer innerBottom />
	<SheetSection>
		<NotFoundSheet />
	</SheetSection>
	<SheetSpacer innerTop />
</main>
