<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { theme_storage_key } from '$lib';
	import { useTheme } from 'lapikit/actions';
	// types
	import type { ModelDropdownProps } from 'lapikit/components';

	// components
	import Search from '$components/search.svelte';

	// icons & images
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import { Menu, Moon, Sun, SunMoon } from 'lucide-svelte';
	import Drawer from '$components/drawer.svelte';
	import AppBar from '$components/app-bar.svelte';

	let { children } = $props();

	let localMode = $state<'light' | 'dark' | 'system'>(
		browser
			? ((localStorage.getItem(theme_storage_key) as 'light' | 'dark' | 'system') ?? 'system')
			: 'system'
	);

	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();
	let year: number = new Date().getFullYear();

	setContext('nav', {
		get open() {
			return navOpen;
		},
		toggle() {
			navOpen = !navOpen;
		}
	});

	const nav = getContext<{ open: boolean; toggle: () => void }>('nav');
</script>

<!-- <kit:appbar class="sticky! top-0 z-50" classContent="grid gap-4 md:grid-cols-[auto_1fr_auto]">
	<kit:btn onclick={() => nav.toggle()} aria-label="open navigation" icon>
		<kit:icon>
			<Menu />
		</kit:icon>
	</kit:btn>
	<a href={resolve('/')} class="flex items-center gap-2" aria-label="Lapikit Home">
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

	<div class="flex items-center gap-2">
		<Search />
		<kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					variant="outline"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
					icon
					size="lg"
				>
					{#if localMode === 'light'}
						<kit:icon>
							<Sun />
						</kit:icon>
					{:else if localMode === 'dark'}
						<kit:icon>
							<Moon />
						</kit:icon>
					{:else}
						<kit:icon>
							<SunMoon />
						</kit:icon>
					{/if}
				</kit:btn>
			{/snippet}

			<kit:list>
				<kit:list-item onclick={() => useTheme('light')} active={localMode === 'light'}>
					{#snippet prepend()}
						<kit:icon>
							<Sun />
						</kit:icon>
					{/snippet}
					Light
				</kit:list-item>
				<kit:list-item onclick={() => useTheme('dark')} active={localMode === 'dark'}>
					{#snippet prepend()}
						<kit:icon>
							<Moon />
						</kit:icon>
					{/snippet}
					Dark
				</kit:list-item>
				<kit:list-item onclick={() => useTheme('system')} active={localMode === 'system'}>
					{#snippet prepend()}
						<kit:icon>
							<SunMoon />
						</kit:icon>
					{/snippet}
					System
				</kit:list-item>
			</kit:list>
		</kit:dropdown>
		<kit:btn
			icon
			href="https://github.com/lapikit/lapikit"
			target="_blank"
			aria-label="GitHub"
			size="lg"
		>
			{@html githubIcon}
		</kit:btn>
	</div>
</kit:appbar> -->

<AppBar />

<div class="layout">
	<Drawer bind:open={navOpen} bind:el={sidebarEl} side="left" />

	<div class="content">
		{@render children()}

		<footer>
			Copyright © 2025 - {year} Lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				style="color: var(--kit-accent)">MIT License</a
			>
			- Developed by
			<a href="https://nycolaide.dev" target="_blank" style="color: var(--kit-accent)">Nycolaide</a>
		</footer>
	</div>
</div>

<style>
	.layout {
		display: grid;
		min-height: 100dvh;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas: 'content';
		background: var(--kit-color-surface-1);
	}

	.content {
		grid-area: content;
		background: var(--kit-color-surface);
		border-top-left-radius: 36px;
		border-top-right-radius: 36px;
	}

	footer {
		grid-area: footer;
		max-width: calc(700px + var(--lpk-page-padding-side) * 2 + 20rem);
		margin: 0 var(--lpk-page-padding-side) var(--lpk-page-padding-bottom);
	}

	@media (min-width: 1023px) {
		.layout {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-rows: 1fr auto;
			grid-template-areas: 'drawer content';
		}

		.layout > :global(.drawer--persistent) {
			grid-area: drawer;
		}

		.content {
			border-top-left-radius: 36px;
			border-top-right-radius: 0;
		}
	}

	@media (min-width: 1460px) {
		footer {
			width: 100%;
			margin: 0 auto var(--lpk-page-padding-bottom);
		}
	}
</style>
