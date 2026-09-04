<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { capitalize } from '$lib/utils';
	import type { LinkName } from '$lib/constants';

	// modules
	import SearchBtn from './modules/search-btn.svelte';

	// assets
	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import { PanelRightClose } from 'lucide-svelte';
	import SocialLink from './modules/social-link.svelte';

	let { open = $bindable(false), data } = $props();

	// states
	const currentPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const socials: LinkName[] = ['discord'];

	const close = () => (open = false);

	$effect(() => {
		if (!open) return;

		const { overflow } = document.body.style;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = overflow;
		};
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

{#if open}
	<button class="drawer__backdrop" aria-label="Close navigation" onclick={close}></button>
{/if}

<aside class:is-open={open} aria-hidden={!open} inert={!open}>
	<header>
		<a href={resolve('/')} onclick={close}>
			<enhanced:img src={LogoLapikit} alt="Lapikit logo" />
			<span>Lapikit</span>
		</a>

		<kit:btn icon aria-label="Close navigation" onclick={close}>
			<kit:icon>
				<PanelRightClose />
			</kit:icon>
		</kit:btn>
	</header>

	<div class="drawer-nav__search">
		<SearchBtn />
	</div>

	<kit:separator />

	<div class="drawer-nav__links">
		<SocialLink data={socials} />
	</div>

	<nav>
		{#each data as { label, path, child } (label)}
			{#if path}
				<kit:list variant="text" nav density="compact">
					<kit:list-item
						href={path}
						onclick={close}
						active={currentPath === path}
						color={currentPath === path ? 'accent' : undefined}
					>
						{capitalize(label)}
					</kit:list-item>
				</kit:list>
			{:else if child}
				<p class="drawer-nav__group">{capitalize(label)}</p>
				<kit:list variant="text" nav density="compact">
					{#each child as item (item.label)}
						<kit:list-item
							href={item.path}
							onclick={close}
							active={currentPath === item.path}
							color={currentPath === item.path ? 'accent' : undefined}
						>
							{capitalize(item.label)}
						</kit:list-item>
					{/each}
				</kit:list>
			{/if}
		{/each}
	</nav>
</aside>

<style lang="scss">
	.drawer__backdrop {
		position: fixed;
		inset: 0;
		z-index: 2001;
		border: none;
		padding: 0;
		cursor: pointer;
		background: color-mix(in oklab, var(--kit-color-shadow), transparent 70%);
		backdrop-filter: blur(2px);
	}

	aside {
		$width: 300px;

		position: fixed;
		top: 0;
		right: 0;
		z-index: 2005;
		display: flex;
		flex-direction: column;
		width: $width;
		max-width: 85vw;
		height: 100dvh;
		background: var(--kit-color-surface-1);
		transform: translateX(100%);
		transition: transform 0.3s ease;

		&.is-open {
			transform: translateX(0);
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}

		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px 20px;

			a {
				display: flex;
				align-items: center;
				gap: 8px;
				font-weight: 700;
				font-size: 1.325rem;

				:global(picture) {
					width: 32px;
				}
			}
		}

		.drawer-nav__search {
			padding: 10px 20px 16px;
		}

		.drawer-nav__links {
			padding: 16px 20px 0;
			display: flex;
			justify-content: center;
		}

		nav {
			flex: 1;
			overflow-y: auto;
			padding: 8px 4px;
		}

		.drawer-nav__group {
			margin: 12px 0 4px;
			padding: 0 12px;
		}
	}
</style>
