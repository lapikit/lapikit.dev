<script lang="ts">
	import { command, pkg_manager } from '$lib/constants';
	import { application, type PkgManager } from '$lib/stores/app.svelte';
	import { copyToClipboard } from '$lib/utils';

	// assets
	import { ArrowUpRight, Check, Copy } from 'lucide-svelte';

	let {
		commandkey = 'install-lapikit',
		textLink,
		pathLink,
		dark,
		light
	}: {
		commandkey?: keyof (typeof command)[PkgManager];
		textLink?: string;
		pathLink?: string;
		dark?: boolean;
		light?: boolean;
	} = $props();

	// states
	let hasCopy: boolean = $state(false);

	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	const handleCopy = (content: string) => {
		copyToClipboard(content);
		hasCopy = true;
		setTimeout(() => {
			hasCopy = false;
		}, 2000);
	};
</script>

<!-- <div class="shell-wrapper"> -->
<div class="shell-command-line">
	<p>
		<span class="accent-text">$</span>
		{command[application.pkg_selected][commandkey]}
	</p>

	<kit:btn
		variant="text"
		size="sm"
		icon
		onclick={() => handleCopy(command[application.pkg_selected][commandkey])}
		color="on-shell"
	>
		<kit:icon size="xs">
			{#if hasCopy}
				<Check />
			{:else}
				<Copy />
			{/if}
		</kit:icon>
	</kit:btn>
</div>

<div class="shell-settings">
	<div>
		{#each managers as [key, manager] (key)}
			<kit:btn
				variant="text"
				size="xs"
				onclick={() => (application.pkg_selected = key)}
				active={application.pkg_selected === key}
				s-style_font-size="12px"
				color={dark || light ? (dark ? 'text-on-dark' : 'text-on-light') : ''}
			>
				{#snippet prepend()}
					<kit:icon>
						{@html manager.icon}
					</kit:icon>
				{/snippet}

				{manager.label}
			</kit:btn>
		{/each}
	</div>

	{#if textLink && pathLink}
		<div>
			<kit:btn
				href={pathLink}
				variant="text"
				size="xs"
				class="text-xs"
				color={dark || light ? (dark ? 'text-on-dark' : 'text-on-light') : ''}
			>
				{textLink}

				{#snippet append()}
					<kit:icon>
						<ArrowUpRight />
					</kit:icon>
				{/snippet}
			</kit:btn>
		</div>
	{/if}
</div>

<style lang="scss">
	.shell-command-line {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--kit-color-shell);
		color: var(--kit-color-on-shell);
		padding: 10px 14px;
		justify-content: space-between;
		border-radius: var(--kit-shape-lg);

		p > span {
			margin-right: 5px;
		}
	}

	.shell-settings {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;

		> div:last-child {
			text-align: end;
		}

		@media (min-width: 400px) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
