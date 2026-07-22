<script lang="ts">
	import { page } from '$app/state';
	import { docsNavigation } from '$lib';
	import { PanelLeftClose } from 'lucide-svelte';
	import Logo from './logo.svelte';
	import SearchV2Action from './search-v2-action.svelte';
	import DrawerRelease from './drawer-release.svelte';

	let {
		open = $bindable(false),
		side = 'left',
		el = $bindable(undefined as HTMLDivElement | undefined)
	}: {
		open?: boolean;
		side?: 'left' | 'right';
		el?: HTMLDivElement;
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
</script>

<!-- Backdrop - mobile/tablet only -->
{#if open}
	<div
		class="backdrop-drawer fixed inset-0 z-55 lg:hidden"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>
{/if}

<!-- Drawer -->
<div
	bind:this={el}
	class={[
		'transition-lapikit fixed top-0 z-100 h-dvh w-75  transition-transform duration-300',
		// 'lg:sticky lg:z-auto lg:h-[calc(100vh-75px)] lg:translate-x-0 lg:overflow-y-auto lg:transition-none',
		'lg:sticky lg:z-auto lg:h-[calc(100dvh-75px)] lg:translate-x-0 lg:transition-none',
		side === 'left' ? 'left-0' : 'right-0',
		side === 'left'
			? open
				? 'translate-x-0'
				: '-translate-x-full'
			: open
				? 'translate-x-0'
				: 'translate-x-full'
	].join(' ')}
	style:background="var(--kit-color-surface-1)"
>
	<div class="sticky top-0 z-1 lg:hidden!" style="background: var(--kit-color-surface-1);">
		<kit:toolbar>
			<Logo />
			<kit:spacer />
			<kit:btn onclick={() => (open = false)} icon>
				<kit:icon>
					<PanelLeftClose />
				</kit:icon>
			</kit:btn>
		</kit:toolbar>

		<div class="mx-auto mt-5 grid w-67.5 gap-3">
			<SearchV2Action />

			<kit:separator />
		</div>
	</div>

	<nav class="h-[calc(100dvh-154px)] overflow-auto pb-38.5 lg:h-[calc(100dvh-75px)]">
		{#each docsNavigation as { label, icon, pages } (label)}
			<kit:list
				class="mx-auto mb-2 w-67.5"
				variant="text"
				nav
				density="compact"
				s-class_opacity-50={label == 'Deprecated'}
			>
				<kit:list-item class="gap-3!">
					{#snippet prepend()}
						<kit:icon>
							{#if typeof icon === 'string'}
								{@html icon}
							{:else}
								{@const Icon = icon}
								<Icon />
							{/if}
						</kit:icon>
					{/snippet}
					{label}
				</kit:list-item>

				{#each pages as page (page.label)}
					<kit:list-item
						href={page.url}
						onclick={() => (open = false)}
						active={normalizedPath === page.url}
						color={normalizedPath === page.url && 'accent'}
					>
						{page.label}
					</kit:list-item>
				{/each}
			</kit:list>
		{/each}
	</nav>

	<DrawerRelease />
</div>

<style>
	.backdrop-drawer {
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);
	}
</style>
