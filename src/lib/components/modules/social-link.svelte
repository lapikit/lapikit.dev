<script lang="ts">
	// data
	import { links, type LinkName } from '$lib/constants';

	let {
		data,
		density = 'compact',
		...rest
	}: {
		data: LinkName[];
		density?: string;
		[key: string]: unknown;
	} = $props();
</script>

{#each data as name (name)}
	{@const link = links[name]}
	<kit:btn
		href={link.url}
		target="_blank"
		{density}
		color={link._styles.color}
		background={link._styles.background}
		icon
		{...rest}
	>
		<kit:icon>
			{@html link.icon}
		</kit:icon>
	</kit:btn>
{/each}
