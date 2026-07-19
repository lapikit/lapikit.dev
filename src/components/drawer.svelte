<script lang="ts">
	import { page } from '$app/state';
	import { docsNavigation } from '$lib';

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
		'fixed top-0 z-100 h-full w-75 overflow-y-auto transition-transform duration-300',
		'lg:sticky lg:top-18.75 lg:z-auto lg:h-[calc(100vh-75px)] lg:translate-x-0 lg:overflow-y-auto lg:transition-none',
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
	<nav>
		{#each docsNavigation as { label, icon, pages } (label)}
			<kit:list
				class="mx-auto mb-2 w-67.5"
				variant="text"
				nav
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

	<kit:card class="sticky! bottom-6 mx-auto w-67.5" background="surface-3" density="comfortable">
		<it:card-content>Demo</it:card-content>
	</kit:card>
</div>

<style>
	.backdrop-drawer {
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);
	}
</style>
