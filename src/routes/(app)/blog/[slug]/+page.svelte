<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const Post = $derived(data.post.component);
</script>

<Post {data} />
