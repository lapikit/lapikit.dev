<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { capitalize } from '$lib/utils';
	import type { AppNavItem } from '$lib/@types';
	import type { ModelDropdownHandleProps, ModelDropdownProps } from 'lapikit/components';

	// assets
	import { ChevronDown, ChevronUp, Ellipsis } from 'lucide-svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		data: AppNavItem[];
		overflowWidth?: number;
	}

	let { data, overflowWidth = 38, class: className, ...rest }: Props = $props();

	let wrapper: HTMLElement | undefined = $state();
	let available: number = $state(0);
	let gap: number = $state(0);
	let itemWidths: number[] = $state([]);

	const visibleCount: number = $derived.by(() => {
		if (!available || itemWidths.length !== data.length) return data.length;

		let used = 0;
		for (let index = 0; index < data.length; index++) {
			used += itemWidths[index] + (index > 0 ? gap : 0);
			const reserve = index < data.length - 1 ? gap + overflowWidth : 0;
			if (used + reserve > available) return index;
		}

		return data.length;
	});

	$effect(() => {
		if (!wrapper) return;
		const element = wrapper;

		const measure = () => {
			available = element.clientWidth;
			gap = parseFloat(getComputedStyle(element).columnGap) || 0;
			itemWidths = [...element.querySelectorAll<HTMLElement>('[data-nav-item]')].map(
				(item) => item.offsetWidth
			);
		};

		measure();

		const observer = new ResizeObserver(measure);
		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div bind:this={wrapper} class={['navbar-list', className]} {...rest}>
	{#each data as { label, path, child }, index (label)}
		<div data-nav-item class:is-hidden={index >= visibleCount}>
			{#if path}
				<kit:btn density="compact" is="button" variant="text" href={path}>
					{capitalize(label)}
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
							{capitalize(label)}
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
						{#each child as item (item.label)}
							<kit:list-item href={item.path}>
								{capitalize(item.label)}
							</kit:list-item>
						{/each}
					</kit:list>
				</kit:dropdown>
			{/if}
		</div>
	{/each}

	{#if visibleCount < data.length}
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
				{#each data as { label, path, child }, index (label)}
					{#if index >= visibleCount}
						{#if path}
							<kit:list-item href={path}>
								{capitalize(label)}
							</kit:list-item>
						{:else if child}
							{#each child as item (item.label)}
								<kit:list-item href={item.path}>
									{capitalize(item.label)}
								</kit:list-item>
							{/each}
						{/if}
					{/if}
				{/each}
			</kit:list>
		</kit:dropdown>
	{/if}
</div>

<style lang="scss">
	.navbar-list {
		position: relative;
		display: flex;
		flex: 1 1 0;
		min-width: 0;

		.is-hidden {
			position: absolute;
			visibility: hidden;
			pointer-events: none;
		}
	}
</style>
