<script lang="ts">
	import { resolve } from '$app/paths';

	// data
	import { links, router } from '$lib';
	import { npmState } from '$lib/stores/npm.svelte';

	//modules
	import SearchBtn from './modules/search-btn.svelte';
	import Settings from './settings.svelte';
	import NavbarList from './navbar-list.svelte';
	import NavbarDrawer from './navbar-drawer.svelte';

	// assets
	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import { Menu } from 'lucide-svelte';

	// states
	let openDrawer: boolean = $state(false);
</script>

<kit:appbar id="navbar" class="glass-background" rounded="lg" elevation="4">
	<a href={resolve('/')}>
		<enhanced:img src={LogoLapikit} alt="Lapikit logo" />
		<span>Lapikit</span>
	</a>

	<NavbarList class="h-mb" data={router.app} />

	<div class="navbar-actions">
		<kit:btn
			href={links['github-repo-lapikit'].url}
			target="_blank"
			density="compact"
			variant="text"
			class="github-dll-counter"
		>
			{#snippet append()}
				<kit:icon>
					{@html links['github-repo-lapikit'].icon}
				</kit:icon>
			{/snippet}

			<span>{npmState.downloads}</span>
		</kit:btn>

		<SearchBtn class="h-xs" onlyBtn />

		<kit:btn
			href={links['discord'].url}
			target="_blank"
			class="h-xs"
			density="compact"
			variant="outline"
			color={links['discord']._styles.background}
		>
			{#snippet prepend()}
				<kit:icon>
					{@html links['discord'].icon}
				</kit:icon>
			{/snippet}
			Join to community
		</kit:btn>

		<Settings density="compact" variant="text" />
	</div>
	<kit:btn
		id="drawer-app"
		icon
		density="compact"
		aria-label="Open navigation"
		aria-expanded={openDrawer}
		onclick={() => (openDrawer = true)}
	>
		<kit:icon>
			<Menu />
		</kit:icon>
	</kit:btn>
</kit:appbar>

<NavbarDrawer bind:open={openDrawer} data={router.app} />

<style lang="scss">
	:global(#navbar) {
		$font-logo-size: 1.325rem;
		$font-counter-size: 12px;
		$padding: 12px;

		position: sticky;
		top: 1rem;
		max-width: calc(100% - calc($padding * 2));
		margin: $padding auto 0;
		overflow: visible;
		z-index: 2000;

		.navbar-actions {
			display: flex;
			margin-left: auto;
		}

		a:first-child {
			:global(picture) {
				position: absolute;
				top: -25px;
				width: 48px;
			}

			span {
				font-weight: 700;
				font-size: $font-logo-size;
				margin-left: 60px;
			}
		}

		:global(.github-dll-counter) {
			span {
				font-size: $font-counter-size;
			}
		}

		@media (max-width: 360px) {
			:global(.github-dll-counter) {
				span {
					display: none !important;
				}
			}
		}

		@media (max-width: 600px) {
			:global(.h-xs) {
				display: none !important;
			}
		}

		@media (max-width: 780px) {
			:global(.h-mb) {
				display: none !important;
			}
		}

		@media (min-width: 600px) {
			height: 68px;
		}

		@media (min-width: 780px) {
			:global(#drawer-app) {
				display: none;
			}
		}
	}
</style>
