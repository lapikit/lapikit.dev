<script lang="ts">
	import type { DropdownTriggerModel, DropdownTriggerProps } from 'lapikit/components';
	import type { HTMLAttributes } from 'svelte/elements';
	import { page } from '$app/state';
	import { capitalize, isActivePath, isCurrentPath } from '$lib/utils';
	import type { AppNavItem } from '$lib/@types';

	import { ChevronDown, ChevronUp, Ellipsis } from 'lucide-svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		data: AppNavItem[];
		overflowWidth?: number;
	}

	type NavLink = {
		label: string;
		path: string;
		active: boolean;
		current: 'page' | 'true' | undefined;
	};

	type NavEntry = {
		label: string;
		link?: NavLink;
		children: NavLink[];
		active: boolean;
	};

	let { data, overflowWidth = 38, class: className, ...rest }: Props = $props();

	let wrapper: HTMLElement | undefined = $state();
	let available: number = $state(0);
	let gap: number = $state(0);
	let itemWidths: number[] = $state([]);

	function toLink(label: string, path: string): NavLink {
		const active = isActivePath(page.url.pathname, path);
		const current = isCurrentPath(page.url.pathname, path) ? 'page' : active ? 'true' : undefined;

		return { label, path, active, current };
	}

	const entries: NavEntry[] = $derived(
		data.map(({ label, path, child }) => {
			const link = path ? toLink(label, path) : undefined;
			const children = (child ?? []).map((item) => toLink(item.label, item.path));

			return { label, link, children, active: !!link?.active || children.some((c) => c.active) };
		})
	);

	const visibleCount: number = $derived.by(() => {
		if (!available || itemWidths.length !== entries.length) return entries.length;

		let used = 0;
		for (let index = 0; index < entries.length; index++) {
			used += itemWidths[index] + (index > 0 ? gap : 0);
			const reserve = index < entries.length - 1 ? gap + overflowWidth : 0;
			if (used + reserve > available) return index;
		}

		return entries.length;
	});

	const hiddenEntries = $derived(entries.slice(visibleCount));
	const hiddenLinks = $derived(
		hiddenEntries.flatMap(({ link, children }) => (link ? [link] : children))
	);
	const hasActiveHidden = $derived(hiddenEntries.some((entry) => entry.active));

	$effect(() => {
		if (!wrapper) return;
		const element = wrapper;
		const items = [...element.querySelectorAll<HTMLElement>('[data-nav-item]')];

		const measure = () => {
			available = element.clientWidth;
			gap = parseFloat(getComputedStyle(element).columnGap) || 0;
			itemWidths = items.map((item) => item.offsetWidth);
		};

		// no direct measure() call: the observer runs it once on observe, after layout and before
		// paint, instead of forcing a synchronous layout during hydration
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		for (const item of items) observer.observe(item);

		return () => observer.disconnect();
	});
</script>

{#snippet navLink({ label, path, active, current }: NavLink)}
	<kit:list-item href={path} {active} aria-current={current}>
		{capitalize(label)}
	</kit:list-item>
{/snippet}

<div bind:this={wrapper} class={['navbar-list', className]} {...rest}>
	{#each entries as { label, link, children, active }, index (label)}
		<div data-nav-item class:is-hidden={index >= visibleCount}>
			{#if link}
				<kit:btn
					density="compact"
					is="button"
					variant="text"
					href={link.path}
					active={link.active}
					aria-current={link.current}
				>
					{capitalize(label)}
				</kit:btn>
			{:else if children.length}
				<kit:dropdown closeOnClick openOnHover>
					{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
						<kit:btn
							is="button"
							variant="text"
							density="compact"
							active={open || active}
							{...props}
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
						{#each children as child (child.path)}
							{@render navLink(child)}
						{/each}
					</kit:list>
				</kit:dropdown>
			{/if}
		</div>
	{/each}

	{#if hiddenEntries.length}
		<kit:dropdown closeOnClick>
			{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
				<kit:btn
					density="compact"
					is="button"
					active={open || hasActiveHidden}
					{...props}
					icon
					color={{ active: 'surface-2' }}
				>
					<kit:icon><Ellipsis /></kit:icon>
				</kit:btn>
			{/snippet}

			<kit:list>
				{#each hiddenLinks as link (link.path)}
					{@render navLink(link)}
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

	// [data-nav-item] > :global([aria-current]) {
	// 	font-weight: 800;
	// }
</style>
