<script lang="ts">
	import type { DropdownTriggerModel, DropdownTriggerProps } from 'lapikit/components';
	import { capitalize } from '$lib/utils';
	import { createGlobalTheme, useTheme } from 'lapikit/actions';

	//data
	import { themes, type ThemeManager } from '$lib/constants';

	// assets
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	const app = createGlobalTheme();
	const themeList = Object.entries(themes) as [ThemeManager, (typeof themes)[ThemeManager]][];

	const current = $derived(themes[app.active as ThemeManager] ?? themes.system);
	const CurrentIcon = $derived(current.icon);
</script>

<kit:dropdown closeOnClick>
	{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
		<kit:btn {...props} s-style_max-width="254px">
			{#snippet prepend()}
				<kit:icon>
					<CurrentIcon />
				</kit:icon>
			{/snippet}
			{capitalize(current.label)}
			{#snippet append()}
				<kit:icon>
					{#if open}
						<ChevronUp />
					{:else}
						<ChevronDown />
					{/if}
				</kit:icon>
			{/snippet}
		</kit:btn>
	{/snippet}

	<kit:list>
		{#each themeList as [key, values] (key)}
			{@const Icon = values?.icon}
			<kit:list-item active={key === app.active} onclick={() => useTheme(key)}>
				{#snippet prepend()}
					<kit:icon>
						<Icon />
					</kit:icon>
				{/snippet}
				{capitalize(values.label)}
			</kit:list-item>
		{/each}
	</kit:list>
</kit:dropdown>
