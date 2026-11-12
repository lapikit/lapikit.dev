<script lang="ts">
	import type { PopoverTriggerProps } from 'lapikit/components';
	import { lang_manager, pkg_manager } from '$lib/constants';
	import { application, type LangManager, type PkgManager } from '$lib/stores/app.svelte';

	import { Settings } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/settings/theme-switcher.svelte';

	let {
		density,
		variant
	}: {
		density?: string;
		variant?: string;
	} = $props();

	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	const languages = Object.entries(lang_manager) as [
		LangManager,
		(typeof lang_manager)[LangManager]
	][];
</script>

{#snippet option(label: string, icon: string, selected: boolean, onclick?: () => void)}
	<kit:btn
		size="sm"
		density="compact"
		rounded="full"
		variant={selected ? 'tonal' : 'text'}
		active={selected}
		aria-pressed={selected}
		disabled={!onclick}
		{onclick}
	>
		{#snippet prepend()}
			<kit:icon size="sm">{@html icon}</kit:icon>
		{/snippet}
		{label}
	</kit:btn>
{/snippet}

<kit:popover class="settings-panel" rounded="0" color="surface">
	{#snippet trigger(props: PopoverTriggerProps)}
		<kit:btn {variant} {density} icon aria-label="Settings" {...props}>
			<kit:icon>
				<Settings />
			</kit:icon>
		</kit:btn>
	{/snippet}

	<section class="settings-section" aria-labelledby="settings-theme">
		<p id="settings-theme" class="settings-label">Theme</p>
		<ThemeSwitcher />
	</section>

	<section class="settings-section" aria-labelledby="settings-package">
		<p id="settings-package" class="settings-label">Package manager</p>
		<div class="settings-options" role="group" aria-labelledby="settings-package">
			{#each managers as [key, { label, icon }] (key)}
				{@render option(label, icon, key === application.pkg_selected, () => {
					application.pkg_selected = key;
				})}
			{/each}
		</div>
	</section>

	<section class="settings-section" aria-labelledby="settings-language">
		<p id="settings-language" class="settings-label">
			Language
			<span class="settings-soon">Soon</span>
		</p>
		<div class="settings-options" role="group" aria-labelledby="settings-language">
			{#each languages as [key, { label, icon }] (key)}
				{@render option(label, icon, key === application.lang_selected)}
			{/each}
		</div>
	</section>
</kit:popover>

<style lang="scss">
	:global(div.kit-popover-content.settings-panel) {
		width: 300px;
		padding: 0;
		border: var(--lapikit-border);
	}

	.settings-section {
		display: grid;
		gap: 10px;
		padding: 16px;

		& + & {
			border-top: var(--lapikit-border);
		}
	}

	.settings-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.settings-soon {
		padding: 1px 6px;
		border: 1px solid var(--kit-color-border);
		border-radius: 999px;
		font-size: var(--text-2xs);
		letter-spacing: 0.04em;
		text-transform: none;
	}

	.settings-options {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}
</style>
