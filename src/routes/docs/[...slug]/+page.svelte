<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const DocPage = $derived(data.doc.component);
</script>

<DocPage />
