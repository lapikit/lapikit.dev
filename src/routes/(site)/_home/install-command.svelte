<script lang="ts">
	import { command, pkg_manager } from '$lib/constants';
	import { preferences, type PkgManager } from '$lib/state/ui.svelte';
	import { copyToClipboard } from '$lib/utils';

	import { Check, Copy } from 'lucide-svelte';

	const copied_duration = 2000;

	const managers = Object.keys(pkg_manager) as PkgManager[];
	const line = $derived(command[preferences.pkg_selected]['install-lapikit']);

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	function copy() {
		copyToClipboard(line);
		copied = true;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = false), copied_duration);
	}
</script>

<div class="install-command">
	<div class="install-command-managers" role="group" aria-label="Package manager">
		{#each managers as manager (manager)}
			{@const selected = manager === preferences.pkg_selected}
			<kit:btn
				size="sm"
				density="compact"
				rounded="full"
				variant={selected ? 'tonal' : 'text'}
				active={selected}
				aria-pressed={selected}
				onclick={() => (preferences.pkg_selected = manager)}
			>
				{manager}
			</kit:btn>
		{/each}
	</div>

	<div class="install-command-line">
		<code><span class="install-command-prompt" aria-hidden="true">$</span> {line}</code>

		<kit:btn
			icon
			size="sm"
			variant="text"
			rounded="md"
			aria-label="Copy install command"
			tooltip={copied ? 'Copied' : 'Copy'}
			onclick={copy}
		>
			<kit:icon size="sm" color={copied ? 'success' : undefined}>
				{#if copied}
					<Check />
				{:else}
					<Copy />
				{/if}
			</kit:icon>
		</kit:btn>
	</div>

	<p class="sr-only" aria-live="polite">{copied ? 'Install command copied' : ''}</p>
</div>

<style lang="scss">
	.install-command {
		display: grid;
		gap: 12px;
		min-width: 0;
	}

	.install-command-managers {
		display: flex;
		gap: 4px;
	}

	.install-command-line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-width: 0;
		padding: 8px 8px 8px 16px;
		border: var(--lapikit-border);
		border-radius: var(--kit-shape-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);

		code {
			overflow-x: auto;
			white-space: nowrap;
		}
	}

	.install-command-prompt {
		color: var(--kit-color-text-muted);
		user-select: none;
	}
</style>
