<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		open = $bindable(false),
		side = 'left'
	}: {
		children?: Snippet;
		open?: boolean;
		side?: 'left' | 'right';
	} = $props();
</script>

<!-- Backdrop — mobile/tablet only -->
{#if open}
	<div
		class="fixed inset-0 z-40 bg-black/50 md:hidden"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>
{/if}

<!-- Drawer -->
<div
	class={[
		'fixed top-0 z-50 h-full overflow-y-auto transition-transform duration-300',
		'md:sticky md:top-16 md:z-auto md:h-[calc(100vh-64px)] md:translate-x-0 md:overflow-y-auto md:transition-none',
		side === 'left' ? 'left-0' : 'right-0',
		side === 'left'
			? open
				? 'translate-x-0'
				: '-translate-x-full'
			: open
				? 'translate-x-0'
				: 'translate-x-full'
	].join(' ')}
>
	{@render children?.()}
</div>
