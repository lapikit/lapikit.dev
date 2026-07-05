<script lang="ts">
	import { createGlobalTheme, useTheme } from 'lapikit/actions';
	import { Moon, Sun } from 'lucide-svelte';

	const app = createGlobalTheme({ name: 'light' });
</script>

<kit:btn
	icon
	onclick={() => useTheme(app.active === 'dark' ? 'light' : 'dark')}
	aria-label="Toggle theme"
	size="lg"
>
	{#if app.active === 'light'}
		<kit:icon>
			<Moon />
		</kit:icon>
	{:else}
		<kit:icon>
			<Sun />
		</kit:icon>
	{/if}
</kit:btn>
