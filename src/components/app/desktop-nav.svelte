<script lang="ts">
	import type { ModelDropdownHandleProps, ModelDropdownProps } from 'lapikit/components';

	// import { appNavigation } from '$lib';
	import { ChevronDown, ChevronUp, Ellipsis } from 'lucide-svelte';
	import { innerWidth } from 'svelte/reactivity/window';

	let { appNavigation, ...rest } = $props();

	const btnRefWidth: number = 160;
	const dropdownRefWidth: number = 38;
	let navigationDisplayedItems: number = $state(appNavigation.length);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let innerWidthValue: number = $state(0);

	$effect(() => {
		innerWidthValue = innerWidth.current ?? 0;

		// states
		let logowidth = 130;
		let spacer = 90;

		if (innerWidthValue < 600) {
			navigationDisplayedItems = appNavigation.length;
			return;
		}

		const element = document.getElementById('navigation-app');
		const actionWrapper = document.getElementById('appbar-lapikit-actions');

		if (element && actionWrapper) {
			const currentElementRect = element.getBoundingClientRect();
			const currentActionElementRect = actionWrapper.getBoundingClientRect();

			// navigationDisplayedItems = Math.floor(
			// 	(currentElementRect.width - dropdownRefWidth) / btnRefWidth
			// );
			console.log(
				navigationDisplayedItems,
				innerWidthValue,
				currentElementRect.width,
				dropdownRefWidth
			);
			console.log(
				'Calcule',
				currentElementRect.width - dropdownRefWidth,
				currentActionElementRect.width,
				innerWidthValue - (logowidth + currentActionElementRect.width + spacer)
			);

			navigationDisplayedItems = Math.floor(
				(innerWidthValue -
					(logowidth + currentActionElementRect.width + spacer + dropdownRefWidth)) /
					btnRefWidth
			);
		}
	});
</script>

<div id="navigation-app" {...rest}>
	{#each appNavigation as { label, url, child }, index (label)}
		{#if index < navigationDisplayedItems}
			{#if url}
				<kit:btn density="compact" is="button" variant="text" href={url}>
					{label}
				</kit:btn>
			{:else if child}
				<kit:dropdown closeOnClick openOnHover>
					{#snippet activator(
						{ open, toggle }: ModelDropdownProps,
						handleMouse: ModelDropdownHandleProps
					)}
						<kit:btn
							is="button"
							variant="text"
							density="compact"
							active={open}
							onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
							onmouseenter={(e: MouseEvent) => handleMouse('open', e.currentTarget as HTMLElement)}
							onmouseleave={() => handleMouse('close', null)}
						>
							{label}
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
						{#each child as item, index (item.label)}
							<kit:list-item href={item.url}>
								{item.label}
							</kit:list-item>
						{/each}
					</kit:list>
				</kit:dropdown>
			{/if}
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

			<kit:list>
				{#each appNavigation as { label, url, child }, index (label)}
					{#if index >= navigationDisplayedItems}
						{#if url}
							<kit:list-item href={url}>
								{label}
							</kit:list-item>
						{:else}
							{#each child as item, index (item.label)}
								<kit:list-item href={item.url}>
									{item.label}
								</kit:list-item>
							{/each}
						{/if}
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
