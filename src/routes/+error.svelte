<script lang="ts">
	import NotFoundSheet from '$lib/components/not-found-sheet.svelte';
	import SheetSpacer from '$lib/components/modules/sheet-spacer.svelte';
	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
</script>

<main>
	<SheetSpacer innerBottom />
	<SheetSection>
		<NotFoundSheet />
	</SheetSection>
	<SheetSpacer innerTop />
</main>
