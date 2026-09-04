<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/components';
	import { resolve } from '$app/paths';

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

	// assets
	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import { Bolt, ChevronDown, ChevronUp, Ellipsis, Menu, Search } from 'lucide-svelte';
	import DesktopNav from './desktop-nav.svelte';
	import DrawerNav from './drawer-nav.svelte';
	import SearchV2Action from '$components/search-v2-action.svelte';
	import Settings from '$components/settings.svelte';
	import { router } from '$lib';
	import { npmState } from '$lib/stores/npm.svelte';

	// assets
	let openDrawer: boolean = $state(false);
</script>

<kit:appbar id="appbar-lapikit" class="glass-background" rounded="lg" elevation="4">
	<a href={resolve('/')}>
		<enhanced:img src={LogoLapikit} alt="Lapikit logo" class="lapikit-logo" />
		<span class="lapikit-name">Lapikit</span>
	</a>

	<DesktopNav data={router.app} />

	<kit:spacer />

	<div id="appbar-lapikit-actions">
		<!-- <kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					class="hidden_action_appbar"
					density="compact"
					is="button"
					variant="text"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				>
					About us
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
		</kit:dropdown> -->

		<kit:btn density="compact" variant="text" icon={!npmState.downloads}>
			{#snippet append()}
				<kit:icon>
					{@html githubIcon}
				</kit:icon>
			{/snippet}

			{#if npmState.downloads}
				<span class="counter">{npmState.downloads}</span>
			{/if}
		</kit:btn>

		<SearchV2Action class="hidden_action_appbar" onlyBtn />

		<kit:btn density="compact" class="hidden_action_appbar" variant="outline" color="accent">
			{#snippet prepend()}
				<kit:icon>
					{@html discordIcon}
				</kit:icon>
			{/snippet}
			Join to community
		</kit:btn>

		<Settings density="compact" variant="text" />

		<kit:btn class="drawer_nav_appbar" icon density="compact" onclick={() => (openDrawer = true)}>
			<kit:icon><Menu /></kit:icon>
		</kit:btn>
	</div>
</kit:appbar>

<DrawerNav data={router.app} bind:open={openDrawer} side="right" />

<style lang="scss">
	:global(#appbar-lapikit) {
		#appbar-lapikit-actions {
			display: flex;
		}

		:global(#navigation-app) {
			display: none;
		}

		@media (max-width: 730px) {
			:global(.hidden_action_appbar) {
				display: none;
			}
		}

		@media (min-width: 900px) {
			:global(#navigation-app) {
				display: flex;
			}
			:global(.drawer_nav_appbar) {
				display: none !important;
			}
		}
	}

	:global(#appbar-lapikit) {
		--p: 12px;
		--ft: 1.325rem;
		--fc: 12px;
		max-width: calc(100% - calc(var(--p) * 2));
		margin: var(--p) auto 0;
		border-radius: 8px;
		overflow: visible;
		z-index: 2000;
		position: sticky;
		top: 1rem;
		height: var(--h);
		font-size: var(--f);
	}

	.lapikit-logo {
		position: absolute;
		top: -25px;
		width: 48px;
	}

	.lapikit-name {
		font-weight: 700;
		font-size: var(--ft);
		margin-left: 60px;
	}

	.counter {
		font-size: var(--fc);
	}

	@media (max-width: 350px) {
		.counter {
			display: none !important;
		}
	}
	@media (max-width: 600px) {
		:global(.hidden-mobile) {
			display: none !important;
		}
	}

	@media (min-width: 600px) {
		:global(.hidden-desktop) {
			display: none !important;
		}

		:global(#appbar-lapikit) {
			--p: 12px;
			--f: 1.125rem;
			--ft: 1.725rem;
			--fc: 14px;
			--h: 68px;
		}
	}
</style>
