<script lang="ts">
	import type { ModelPopoverProps } from 'lapikit/components';
	import { Moon, Settings, Sun, SunMoon } from 'lucide-svelte';
	import { createGlobalTheme, useTheme } from 'lapikit/actions';

	let {
		density,
		variant
	}: {
		density?: string;
		variant?: string;
	} = $props();

	const app = createGlobalTheme();

	const listTheme = [
		{ key: 'light', icon: Sun },
		{ key: 'dark', icon: Moon },
		{ key: 'system', icon: SunMoon }
	];
</script>

<kit:popover>
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:btn
			{variant}
			{density}
			icon
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
		>
			<kit:icon>
				<Settings />
			</kit:icon>
		</kit:btn>
	{/snippet}

	<kit:list density="none">
		<kit:list-item>
			{#each listTheme as option}
				{@const Icon = option?.icon}
				<kit:btn icon active={option.key === app.active} onclick={() => useTheme(option.key)}>
					<kit:icon>
						<Icon />
					</kit:icon>
				</kit:btn>
			{/each}
		</kit:list-item>
	</kit:list>
</kit:popover>
