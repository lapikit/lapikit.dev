<script lang="ts">
	import type { FieldControlProps, PopoverTriggerProps } from 'lapikit/components';
	import { lang_manager, pkg_manager } from '$lib/constants';
	import { preferences, type LangManager, type PkgManager } from '$lib/state/ui.svelte';

	import { ChevronDown, Settings } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/settings/theme-switcher.svelte';

	let {
		density,
		variant
	}: {
		density?: string;
		variant?: string;
	} = $props();

	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	const selected_manager = $derived(pkg_manager[preferences.pkg_selected]);
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

<kit:popover class="settings-panel" rounded="md" color="surface">
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
		<kit:field variant="outline" size="sm" class="settings-select">
			{#snippet prependInner()}
				<kit:icon size="sm">{@html selected_manager.icon}</kit:icon>
			{/snippet}
			{#snippet children(control: FieldControlProps)}
				<select
					{...control}
					aria-labelledby="settings-package"
					bind:value={preferences.pkg_selected}
				>
					{#each managers as [key, { label }] (key)}
						<option value={key}>{label}</option>
					{/each}
				</select>
			{/snippet}
			{#snippet appendInner()}
				<kit:icon size="sm" class="settings-select-chevron"><ChevronDown /></kit:icon>
			{/snippet}
		</kit:field>
	</section>

	<section class="settings-section" aria-labelledby="settings-language">
		<p id="settings-language" class="settings-label">Language</p>
		<div class="settings-options" role="group" aria-labelledby="settings-language">
			{#each languages as [key, { label, icon }] (key)}
				{@render option(label, icon, key === preferences.lang_selected, () => {
					preferences.lang_selected = key;
				})}
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

	:global(.settings-select) {
		--settings-select-chevron: 28px;

		position: relative;

		select {
			flex: 1;
			min-width: 0;
			margin: 0 calc(-1 * var(--settings-select-chevron)) 0 0;
			padding: 0 var(--settings-select-chevron) 0 0;
			border: 0;
			background: none;
			color: inherit;
			font: inherit;
			appearance: none;
			cursor: pointer;
			outline: none;
		}

		option {
			background-color: var(--kit-color-surface);
			color: var(--kit-color-text);
		}
	}

	:global(.settings-select .kit-field__append-inner) {
		pointer-events: none;
	}

	:global(.settings-select-chevron) {
		color: var(--kit-color-text-muted);
	}

	.settings-options {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}
</style>
