<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/components';
	import { ChevronDown, ChevronUp, Moon, Sun, SunMoon } from 'lucide-svelte';

	import { createGlobalTheme, useTheme } from 'lapikit/actions';

	const app = createGlobalTheme();

	const listTheme = [
		{ key: 'light', label: 'Light', icon: Sun },
		{ key: 'dark', label: 'Dark', icon: Moon },
		{ key: 'system', label: 'System', icon: SunMoon }
	];

	const current = $derived(listTheme.find((option) => option.key === app.active) ?? listTheme[0]);
</script>

<kit:dropdown closeOnClick>
	{#snippet activator({ toggle, open }: ModelDropdownProps)}
		<kit:btn
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
			s-style_max-width="254px"
		>
			{#snippet prepend()}
				<kit:icon><current.icon /></kit:icon>
			{/snippet}

			{current.label}

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

	<kit:list>
		{#each listTheme as option}
			{@const Icon = option?.icon}
			<kit:list-item icon active={option.key === app.active} onclick={() => useTheme(option.key)}>
				{#snippet prepend()}
					<kit:icon>
						<Icon />
					</kit:icon>
				{/snippet}

				{option.label}
			</kit:list-item>
		{/each}
	</kit:list>
</kit:dropdown>
