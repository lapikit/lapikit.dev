<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/actions';

	// data
	import { docsNavigation } from '$lib';

	// modules
	import SearchBtn from '$lib/components/modules/search-btn.svelte';
	import Release from '$lib/components/docs/release.svelte';

	// assets
	import { PanelLeftClose } from 'lucide-svelte';

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

<!-- Backdrop - mobile/tablet only -->
{#if open}
	<div
		class="backdrop-drawer"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>
{/if}

<!-- Drawer -->
<div bind:this={el} class="drawer drawer--{side}" class:drawer--open={open}>
	<div class="drawer__header">
		<kit:toolbar>
			<a href={resolve('/')} class="logo-lapikit" aria-label="Lapikit Home">
				<enhanced:img
					src="$lib/assets/images/lapikit.webp?w=38"
					alt="lapikit"
					aria-label="Lapikit"
					sizes="100%"
					loading="lazy"
				/>

				<span>Lapikit</span>
			</a>
			<kit:spacer />
			<kit:btn onclick={() => (open = false)} icon>
				<kit:icon>
					<PanelLeftClose />
				</kit:icon>
			</kit:btn>
		</kit:toolbar>

		<div class="drawer__search">
			<SearchBtn />

			<kit:separator />
		</div>
	</div>

	<nav class="drawer__nav">
		{#each docsNavigation as { label, icon, pages }, index (label)}
			{#if label == 'Deprecated'}
				<kit:accordion spacer class="accordion-deprecated" density="compact">
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
				<kit:list class="drawer-list" variant="text" nav density="compact">
					<kit:list-item class="drawer-list-title">
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
		{/each}

		<Release />
	</nav>
</div>

<style lang="scss">
	$breakpoint-lg: 64rem;

	.logo-lapikit {
		display: flex;
		align-items: center;
		gap: 12px;
		width: fit-content;

		:global(span) {
			font-size: 1.325rem;
			font-weight: bold;
		}
		:global(picture) {
			max-height: 39px;
			height: 100%;
			position: relative;
			top: -9px;
		}
	}

	// Backdrop (mobile/tablet uniquement)
	.backdrop-drawer {
		position: fixed;
		inset: 0;
		z-index: 55;
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);

		@media (min-width: $breakpoint-lg) {
			display: none;
		}
	}

	// Drawer
	.drawer {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 18.75rem;
		height: 100dvh;
		background: var(--kit-color-surface-1);
		transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

		&--left {
			left: 0;
			transform: translateX(-100%);
		}

		&--right {
			right: 0;
			transform: translateX(100%);
		}

		&--open {
			transform: translateX(0);
		}

		@media (min-width: $breakpoint-lg) {
			position: sticky;
			z-index: auto;
			height: calc(100dvh - 75px);
			transform: translateX(0);
			transition: none;
		}

		&__header {
			position: sticky;
			top: 0;
			z-index: 1;
			background: var(--kit-color-surface-1);

			@media (min-width: $breakpoint-lg) {
				display: none !important;
			}
		}

		&__search {
			display: grid;
			gap: 0.75rem;
			width: 16.875rem;
			margin-inline: auto;
			margin-top: 1.25rem;
		}

		&__nav {
			height: calc(100dvh - 154px);
			overflow: auto;

			@media (min-width: $breakpoint-lg) {
				height: calc(100dvh - 75px);
			}
		}
	}

	:global(.accordion-deprecated) {
		width: 275px !important;
		margin: 0 auto;
		opacity: 0.5;
	}

	:global(.drawer-list) {
		width: 16.875rem;
		margin-inline: auto;
		margin-bottom: 0.5rem;
	}

	:global(.drawer-list-title) {
		gap: 0.75rem !important;
	}
</style>
