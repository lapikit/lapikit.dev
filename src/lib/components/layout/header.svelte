<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { links } from '$lib/constants';
	import { router } from '$lib/router';
	import { npmState } from '$lib/stores/npm.svelte';
	import { getNavContext } from '$lib/stores/nav.svelte';

	import { Menu } from 'lucide-svelte';

	import SearchBtn from '$lib/components/modules/search-btn.svelte';
	import Settings from '$lib/components/settings.svelte';
	import NavbarList from '$lib/components/layout/navbar-list.svelte';
	import Brand from '$lib/components/layout/brand.svelte';

	const github = links['github-repo-lapikit'];
	const discord = links['discord'];

	const nav = getNavContext();
	const hasDocsMenu = $derived(page.route.id?.startsWith('/docs') ?? false);

	const loadHeaderDrawer = () => import('$lib/components/layout/header-drawer.svelte');
	let headerDrawerRequested = $state(false);

	function toggleMenu() {
		if (!hasDocsMenu) headerDrawerRequested = true;
		nav.toggle();
	}
</script>

<kit:appbar class="app-header" class:has-docs-menu={hasDocsMenu} classContent="app-header-bar">
	<Brand />

	<nav class="header-nav" aria-label="Main">
		<NavbarList data={router.app} />
	</nav>

	<div class="header-actions">
		<span class="header-search-full"><SearchBtn density="compact" /></span>
		<span class="header-search-icon"><SearchBtn onlyBtn /></span>

		<kit:btn
			href={github.url}
			target="_blank"
			rel="noopener noreferrer"
			variant="text"
			density="compact"
			aria-label="Lapikit on GitHub"
		>
			<kit:icon>{@html github.icon}</kit:icon>
			{#if npmState.downloads}
				<span class="header-downloads" aria-hidden="true">{npmState.downloads}</span>
			{/if}
		</kit:btn>

		<span class="header-discord">
			<kit:btn
				href={discord.url}
				target="_blank"
				rel="noopener noreferrer"
				icon
				variant="text"
				density="compact"
				aria-label="Join the Discord community"
			>
				<kit:icon>{@html discord.icon}</kit:icon>
			</kit:btn>
		</span>

		<Settings density="compact" variant="text" />

		<span class="header-cta">
			<kit:btn href={resolve('/docs/getting-started')} color="accent" density="compact">
				Get started
			</kit:btn>
		</span>

		<span class="header-menu">
			<kit:btn
				icon
				variant="text"
				density="compact"
				aria-label="Open navigation"
				aria-expanded={nav.open}
				onclick={toggleMenu}
			>
				<kit:icon><Menu /></kit:icon>
			</kit:btn>
		</span>
	</div>
</kit:appbar>

{#if headerDrawerRequested && !hasDocsMenu}
	{#await loadHeaderDrawer() then { default: HeaderDrawer }}
		<HeaderDrawer data={router.app} />
	{/await}
{/if}

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	:global(header.kit-appbar.app-header) {
		--kit-appbar-bg: color-mix(in oklab, var(--kit-color-surface), transparent 15%);
		--kit-appbar-h: 64px;
		--kit-appbar-gap: 0;

		position: sticky;
		top: 0;
		z-index: 2000;
		padding-block: 0;
		padding-inline: var(--lapikit-spacing-block);
		border-bottom: var(--lapikit-border);
		backdrop-filter: blur(12px);

		:global(.app-header-bar) {
			align-self: stretch;
			align-items: stretch;
			max-width: calc(var(--lapikit-container-size) - 2 * var(--lapikit-spacing-block));
			border-inline: var(--lapikit-border);
		}

		:global(.app-header-bar > .brand) {
			--brand-logo-width: 36px;
			--brand-logo-height: 52px;

			padding-inline: 16px;

			@include up(md) {
				padding-inline: var(--sheet-cell-padding);
				border-inline-end: var(--lapikit-border);
			}
		}
	}

	.header-nav {
		display: none;
		flex: 1 1 0;
		align-items: center;
		min-width: 0;
		padding-inline: 16px;

		@include up(md) {
			display: flex;
		}
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 2px;
		margin-inline-start: auto;
		padding-inline: 8px;

		@include up(md) {
			border-inline-start: var(--lapikit-border);
			padding-inline: 16px;
		}
	}

	.header-downloads {
		display: none;
		margin-inline-start: 6px;
		font-size: var(--text-sm);
		font-variant-numeric: tabular-nums;
	}

	.header-search-full,
	.header-discord,
	.header-cta {
		display: none;
	}

	.header-search-icon,
	.header-menu {
		display: contents;
	}

	@include up(md) {
		.header-downloads {
			display: inline;
		}

		.header-cta {
			display: contents;
		}

		.header-menu {
			display: none;
		}

		:global(.has-docs-menu) .header-menu {
			display: contents;
		}
	}

	@include up(lg) {
		:global(.has-docs-menu) .header-menu {
			display: none;
		}

		.header-discord,
		.header-search-full {
			display: contents;
		}

		.header-search-icon {
			display: none;
		}
	}
</style>
