<script lang="ts">
	// data
	import { links, type LinkName } from '$lib/constants';

	let {
		data,
		density = 'compact',
		text,
		...rest
	}: {
		data: LinkName[];
		density?: string;
		text?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

{#each data as name (name)}
	{@const link = links[name]}
	<kit:btn
		href={link.url}
		variant={text && 'text'}
		target="_blank"
		{density}
		color={link._styles.background}
		icon
		{...rest}
	>
		<kit:icon>
			{@html link.icon}
		</kit:icon>
	</kit:btn>
{/each}
