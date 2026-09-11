<script lang="ts">
	import { command, pkg_manager } from '$lib/constants';
	import { application, type PkgManager } from '$lib/stores/app.svelte';
	import { copyToClipboard } from '$lib/utils';
	import { ArrowUpRight, Check, Copy } from 'lucide-svelte';

	type CommandKey = keyof (typeof command)[PkgManager];

	let {
		commandkey = 'install-lapikit',
		textLink,
		pathLink,
		dark,
		light
	}: {
		commandkey?: CommandKey;
		textLink?: string;
		pathLink?: string;
		dark?: boolean;
		light?: boolean;
	} = $props();

	// states
	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	let hasCopy: boolean = $state(false);

	const handleCopy = (content: string) => {
		copyToClipboard(content);
		hasCopy = true;
		setTimeout(() => {
			hasCopy = false;
		}, 2000);
	};
</script>

<div class="shell-wrapper">
	<div>
		<p class="command-line">
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

	<div>
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
					s-style_font-size="12px"
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
</div>

<style lang="scss">
	div.shell-wrapper {
		> div:first-child {
			display: flex;
			align-items: center;
			gap: 6px;
			background: var(--kit-color-shell);
			color: var(--kit-color-on-shell);
			padding: 10px 14px;
			justify-content: space-between;
			border-radius: 10px;
			margin-bottom: 15px;

			.command-line {
				> span {
					margin-right: 5px;
				}
			}
		}

		> div:last-child {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 6px;
		}
	}
</style>
