<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		open = $bindable(false),
		side = 'left',
		el = $bindable(undefined as HTMLDivElement | undefined)
	}: {
		children?: Snippet;
		open?: boolean;
		side?: 'left' | 'right';
		el?: HTMLDivElement;
	} = $props();
</script>

<!-- Backdrop - mobile/tablet only -->
{#if open}
	<div
		class="backdrop-drawer fixed inset-0 z-9 lg:hidden"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>
{/if}

<!-- Drawer -->
<div
	bind:this={el}
	class={[
		'fixed top-0 z-100 h-full w-62.5 overflow-y-auto transition-transform duration-300',
		'lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-64px)] lg:translate-x-0 lg:overflow-y-auto lg:transition-none',
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
	{@render children?.()}
</div>

<style>
	.backdrop-drawer {
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);
	}
</style>
