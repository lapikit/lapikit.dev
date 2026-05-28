<script lang="ts">
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { theme_storage_key } from '$lib';

	// types
	import type { ModelDropdownProps } from 'lapikit/labs/components';

	// components
	import Search from '$components/search.svelte';

	// icons & images
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import { Moon, Sun, SunMoon } from 'lucide-svelte';

	let { children } = $props();

	let mode = $state<'light' | 'dark' | 'system'>(
		browser
			? ((localStorage.getItem(theme_storage_key) as 'light' | 'dark' | 'system') ?? 'system')
			: 'system'
	);

	$effect(() => {
		if (!browser) return;
		if (mode === 'system') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', mode);
		}
		localStorage.setItem(theme_storage_key, mode);
	});
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
					{#if mode === 'light'}
						<kit:icon>
							<Sun />
						</kit:icon>
					{:else if mode === 'dark'}
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
				<kit:list-item onclick={() => (mode = 'light')} active={mode === 'light'}>
					{#snippet prepend()}
						<kit:icon>
							<Sun />
						</kit:icon>
					{/snippet}
					Light
				</kit:list-item>
				<kit:list-item onclick={() => (mode = 'dark')} active={mode === 'dark'}>
					{#snippet prepend()}
						<kit:icon>
							<Moon />
						</kit:icon>
					{/snippet}
					Dark
				</kit:list-item>
				<kit:list-item onclick={() => (mode = 'system')} active={mode === 'system'}>
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

{@render children()}
