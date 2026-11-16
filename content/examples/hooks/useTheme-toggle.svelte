<script lang="ts">
	import { useTheme } from 'lapikit/actions';
	import { Moon, Sun } from 'lucide-svelte';

	let mode = $state<'light' | 'dark'>('light');
</script>

<kit:btn
	icon
	onclick={() => {
		useTheme(mode === 'light' ? 'dark' : 'light');
		mode = mode === 'light' ? 'dark' : 'light';
	}}
	aria-label="Toggle theme"
	size="lg"
>
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
