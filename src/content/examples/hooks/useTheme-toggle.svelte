<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { useTheme } from 'lapikit/actions';
	import { Moon, Sun } from 'lucide-svelte';

	let mode = $state<'light' | 'dark'>('light');

	onMount(() => {
		const colorSchemeNavigator =
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		if (colorSchemeNavigator?.matches) mode = 'dark';
	});

	$effect(() => {
		if (!browser) return;
		document.documentElement.setAttribute('data-theme', mode);
	});
</script>

<kit:btn icon onclick={() => useTheme(mode === 'light' ? 'dark' : 'light')}>
	{#if mode !== 'light'}
		<kit:icon>
			<Sun />
		</kit:icon>
	{:else}
		<kit:icon>
			<Moon />
		</kit:icon>
	{/if}
</kit:btn>
