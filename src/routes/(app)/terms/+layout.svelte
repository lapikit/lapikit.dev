<script lang="ts">
	import SheetSpacer from '$lib/components/modules/sheet-spacer.svelte';
	import SheetSection from '$lib/components/sheet/sheet-section.svelte';

	let { children } = $props();
</script>

<SheetSpacer innerBottom />
<SheetSection>
	{@render children()}
</SheetSection>
<SheetSpacer innerTop />
