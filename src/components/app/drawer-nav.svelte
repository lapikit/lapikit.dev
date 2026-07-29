<script lang="ts">
	import { page } from '$app/state';
	import { PanelLeftClose } from 'lucide-svelte';
	import Logo from '../logo.svelte';
	import SearchV2Action from '../search-v2-action.svelte';
	import { useAccordion } from 'lapikit/actions';

	const appNavigation = [
		{ label: 'Label Menu Page1', url: '/' },
		{
			label: 'Label Menu Page2',
			child: [
				{ label: 'Label Menu Page2-1', url: '/' },
				{ label: 'Label Menu Page2-2', url: '/' }
			]
		},
		{ label: 'Label Menu Page3', url: '/' },
		{ label: 'Label Menu Page4', url: '/' },
		{ label: 'Label Menu Page5', url: '/' }
	];

	let {
		open = $bindable(false),
		side = 'left',
		el = $bindable(undefined as HTMLDivElement | undefined)
	}: {
		open?: boolean;
		side?: 'left' | 'right';
		el?: HTMLDivElement;
	} = $props();

	const accordion = useAccordion();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
</script>

<!-- Backdrop  -->
{#if open}
	<div
		class="backdrop-drawer fixed inset-0 z-2001"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>
{/if}

<!-- Drawer -->
<div
	bind:this={el}
	class={[
		'transition-lapikit fixed top-0 z-2005 h-dvh w-75  transition-transform duration-300',
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
	<div class="sticky top-0 z-1" style="background: var(--kit-color-surface-1);">
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

	<nav class="h-[calc(100dvh-154px)] overflow-auto">
		{#each appNavigation as { label, url, child }, index (label)}
			{#if url}
				<kit:list class="mx-auto w-67.5" variant="text" nav density="compact">
					<kit:list-item
						href={url}
						onclick={() => (open = false)}
						active={normalizedPath === url}
						color={normalizedPath === url && 'accent'}
					>
						{label}
					</kit:list-item>
				</kit:list>
			{:else if child}
				<kit:accordion spacer variant="text" density="compact" class="mx-auto w-67.5!">
					<kit:accordion-item
						{index}
						text={label}
						open={accordion.values.includes(index)}
						toggle={accordion.toggle}
					>
						<kit:list rounded="0" variant="text">
							{#each child as page (page.label)}
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
					</kit:accordion-item>
				</kit:accordion>
			{/if}
		{/each}
		<!-- {#each docsNavigation as { label, icon, pages }, index (label)}
			{#if label == 'Deprecated'}
				<kit:accordion
					spacer
					class="accordion-deprecated"
					density="compact"
					s-class_opacity-50={true}
				>
					<kit:accordion-item
						{index}
						text={label}
						open={accordion.values.includes(index)}
						toggle={accordion.toggle}
					>
						<kit:list rounded="0" variant="text" density="compact">
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
					</kit:accordion-item>
				</kit:accordion>
			{:else}
				<kit:list class="mx-auto mb-2 w-67.5" variant="text" nav density="compact">
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
			{/if}
		{/each} -->
	</nav>
</div>

<style>
	.backdrop-drawer {
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);
	}

	:global(.accordion-deprecated) {
		width: 275px !important;
		margin: 0 auto;
	}
</style>
