<script lang="ts">
	import { appNavigation } from '$lib';
	import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { Ellipsis } from 'lucide-svelte';
	import { innerWidth } from 'svelte/reactivity/window';

	let { ...rest } = $props();

	const btnRefWidth: number = 150;
	const dropdownRefWidth: number = 38;
	let navigationDisplayedItems: number = $state(appNavigation.length);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let innerWidthValue: number = $state(0);

	$effect(() => {
		innerWidthValue = innerWidth.current ?? 0;

		if (innerWidthValue < 600) {
			navigationDisplayedItems = appNavigation.length;
			return;
		}

		const element = document.getElementById('navigation-app');

		if (element) {
			const currentElementRect = element.getBoundingClientRect();
			navigationDisplayedItems = Math.floor(
				(currentElementRect.width - dropdownRefWidth) / btnRefWidth
			);
		}
	});
</script>

<div id="navigation-app" {...rest}>
	{#each appNavigation as navItem, index (navItem.label)}
		{#if index < navigationDisplayedItems}
			<kit:btn density="compact" is="button" variant="text" href={navItem.url}>
				{navItem.label}
			</kit:btn>
		{/if}
	{/each}

	{#if navigationDisplayedItems < appNavigation.length}
		<kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					density="compact"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
					icon
				>
					<kit:icon><Ellipsis /></kit:icon>
				</kit:btn>
			{/snippet}

			<kit:list nav>
				{#each appNavigation as navItem, index (navItem.label)}
					{#if index >= navigationDisplayedItems}
						<kit:list-item href={navItem.url}>
							{navItem.label}
						</kit:list-item>
					{/if}
				{/each}
			</kit:list>
		</kit:dropdown>
	{/if}
</div>

<style>
	#navigation-app {
		width: 100%;
		display: flex;
	}
</style>
