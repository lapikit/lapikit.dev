<script lang="ts">
	import { setContext } from 'svelte';
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { docsNavigation, theme_storage_key } from '$lib';
	import { useTheme } from 'lapikit/actions';
	// types
	import type { ModelDropdownProps } from 'lapikit/components';

	// components
	import Search from '$components/search.svelte';

	// icons & images
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import { Moon, Sun, SunMoon } from 'lucide-svelte';
	import Drawer from '$components/drawer.svelte';

	let { children } = $props();

	let localMode = $state<'light' | 'dark' | 'system'>(
		browser
			? ((localStorage.getItem(theme_storage_key) as 'light' | 'dark' | 'system') ?? 'system')
			: 'system'
	);

	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();
	let year: number = new Date().getFullYear();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));

	setContext('nav', {
		get open() {
			return navOpen;
		},
		toggle() {
			navOpen = !navOpen;
		}
	});
	// $effect(() => {
	// 	if (!browser) return;

	// 	// if (mode === 'system') {
	// 	// 	document.documentElement.removeAttribute('data-kit-theme');
	// 	// } else {
	// 	// 	document.documentElement.setAttribute('data-theme', mode);
	// 	// }
	// 	// localStorage.setItem(theme_storage_key, mode);
	// });
</script>

<kit:appbar class="sticky! top-0 z-50" classContent="grid gap-4 md:grid-cols-[auto_1fr_auto]">
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
</kit:appbar>

<div class="layout">
	<Drawer bind:open={navOpen} bind:el={sidebarEl} side="left">
		<nav>
			{#each docsNavigation as { label, icon, pages } (label)}
				<kit:list density="compact" size="sm" nav s-class_opacity-50={label == 'Deprecated'}>
					<kit:list-item>
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
							onclick={() => (navOpen = false)}
							active={normalizedPath === page.url}
						>
							{page.label}
						</kit:list-item>
					{/each}
				</kit:list>
			{/each}
		</nav>
	</Drawer>

	<div class="content">
		{@render children()}
	</div>

	<footer>
		Copyright © 2025 - {year} Lapikit
	</footer>
</div>

<style>
	.layout {
		display: grid;
		min-height: 100dvh;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'content'
			'footer';
	}

	.content {
		grid-area: content;
	}

	footer {
		grid-area: footer;
	}

	@media (min-width: 64rem) {
		.layout {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-rows: 1fr auto;
			grid-template-areas:
				'drawer content'
				'drawer footer';
		}

		.layout > :global(.drawer--persistent) {
			grid-area: drawer;
		}
	}
</style>
