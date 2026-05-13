<script lang="ts">
	import { resolve } from '$app/paths';

	// components
	import Search from '$lib/components/search.svelte';

	// svg
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { Moon, Sun, SunMoon } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const THEME_KEY = '@lapikit/theme';

	let { children } = $props();
	let mode = $state<'light' | 'dark' | 'system'>('system');

	onMount(() => {
		const saved = localStorage.getItem(THEME_KEY) as typeof mode | null;
		if (saved) mode = saved;
	});

	$effect(() => {
		if (!browser) return;
		if (mode === 'system') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', mode);
		}
		localStorage.setItem(THEME_KEY, mode);
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
