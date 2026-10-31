<script lang="ts">
	// data
	import { links, type LinkName } from '$lib/constants';

	let {
		data,
		density = 'compact',
		monochrome,
		...rest
	}: {
		data: LinkName[];
		density?: string;
		monochrome?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

{#each data as name (name)}
	{@const link = links[name]}
	<kit:btn
		href={link.url}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Lapikit on {link.name}"
		{density}
		color={!monochrome && link._styles.background}
		icon
		noRipple={monochrome}
		{...rest}
	>
		<kit:icon>
			{@html link.icon}
		</kit:icon>
	</kit:btn>
{/each}
