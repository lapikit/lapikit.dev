<script lang="ts">
	import type { ModelDropdownProps, ModelPopoverProps } from 'lapikit/components';
	import { createGlobalTheme, useTheme } from 'lapikit/actions';
	import { capitalize } from '$lib/utils';

	//data
	import { lang_manager, pkg_manager, themes } from '$lib/constants';
	import { application, type LangManager, type PkgManager } from '$lib/stores/app.svelte';

	// assets
	import { ChevronDown, ChevronUp, Settings } from 'lucide-svelte';

	let {
		density,
		variant
	}: {
		density?: string;
		variant?: string;
	} = $props();

	const app = createGlobalTheme();

	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	const managersLang = Object.entries(lang_manager) as [
		LangManager,
		(typeof lang_manager)[LangManager]
	][];
</script>

<kit:popover class="settings-app">
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:btn
			{variant}
			{density}
			icon
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
		>
			<kit:icon>
				<Settings />
			</kit:icon>
		</kit:btn>
	{/snippet}

	<kit:list density="none">
		<kit:list-item>
			{#each themes as option (option)}
				{@const Icon = option?.icon}
				<kit:btn active={option.key === app.active} onclick={() => useTheme(option.key)}>
					{#snippet prepend()}
						<kit:icon>
							<Icon />
						</kit:icon>
					{/snippet}

					{capitalize(option.key)}
				</kit:btn>
			{/each}
		</kit:list-item>
	</kit:list>
	<kit:separator />
	<kit:list>
		<kit:list-item>
			<p>Package</p>
			<kit:dropdown closeOnClick>
				{#snippet activator({ open, toggle }: ModelDropdownProps)}
					<kit:btn
						class="hidden_action_appbar"
						density="compact"
						is="button"
						variant="text"
						active={open}
						onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
					>
						{#snippet prepend()}
							<kit:icon>
								{@html pkg_manager[application.pkg_selected].icon}
							</kit:icon>
						{/snippet}
						{pkg_manager[application.pkg_selected].label}
						{#snippet append()}
							<kit:icon>
								{#if open}
									<ChevronUp />
								{:else}
									<ChevronDown />
								{/if}
							</kit:icon>
						{/snippet}
					</kit:btn>
				{/snippet}

				<kit:list density="compact">
					{#each managers as [key, manager] (key)}
						{#if key !== application.pkg_selected}
							<kit:list-item onclick={() => (application.pkg_selected = key)}>
								{#snippet prepend()}
									<kit:icon>
										{@html manager.icon}
									</kit:icon>
								{/snippet}
								{manager.label}
							</kit:list-item>
						{/if}
					{/each}
				</kit:list>
			</kit:dropdown>
		</kit:list-item>
		<kit:list-item>
			<p>Language</p>
			<kit:dropdown closeOnClick>
				{#snippet activator({ open, toggle }: ModelDropdownProps)}
					<kit:btn
						class="hidden_action_appbar"
						density="compact"
						is="button"
						variant="text"
						active={open}
						onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
					>
						{#snippet prepend()}
							<kit:icon>
								{@html lang_manager[application.lang_selected].icon}
							</kit:icon>
						{/snippet}
						{lang_manager[application.lang_selected].label}
						{#snippet append()}
							<kit:icon>
								{#if open}
									<ChevronUp />
								{:else}
									<ChevronDown />
								{/if}
							</kit:icon>
						{/snippet}
					</kit:btn>
				{/snippet}

				<kit:list density="compact">
					{#each managersLang as [key, manager] (key)}
						{#if key !== application.lang_selected}
							<kit:list-item onclick={() => (application.lang_selected = key)}>
								{#snippet prepend()}
									<kit:icon>
										{@html manager.icon}
									</kit:icon>
								{/snippet}
								{manager.label}
							</kit:list-item>
						{/if}
					{/each}
				</kit:list>
			</kit:dropdown>
		</kit:list-item>
	</kit:list>
</kit:popover>

<style lang="scss">
	:global(.settings-app) {
		:global(.kit-separator) {
			margin: 5px 0;
		}

		:global(.kit-list:last-child) {
			:global(.kit-list-item__content) {
				display: grid;
				grid-template-columns: 1fr auto;
			}
		}
	}
</style>
