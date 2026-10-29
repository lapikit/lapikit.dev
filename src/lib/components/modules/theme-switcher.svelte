<script lang="ts">
	import { capitalize } from '$lib/utils';
	import { createGlobalTheme, useTheme } from 'lapikit/actions';

	//data
	import { themes, type ThemeManager } from '$lib/constants';

	const app = createGlobalTheme();
	const themeList = Object.entries(themes) as [ThemeManager, (typeof themes)[ThemeManager]][];
</script>

<div class="theme-switcher" role="radiogroup" aria-label="Theme">
	{#each themeList as [key, { label, icon: Icon }] (key)}
		{@const selected = key === app.active}
		<kit:btn
			icon
			size="sm"
			density="compact"
			rounded="full"
			variant={selected ? 'tonal' : 'text'}
			active={selected}
			role="radio"
			aria-checked={selected}
			aria-label={capitalize(label)}
			tooltip={capitalize(label)}
			onclick={() => useTheme(key)}
		>
			<kit:icon size="sm">
				<Icon />
			</kit:icon>
		</kit:btn>
	{/each}
</div>

<style>
	.theme-switcher {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border: var(--lapikit-border);
		border-radius: 999px;
		width: fit-content;
	}
</style>
