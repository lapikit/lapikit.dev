<script lang="ts">
	import { command, pkg_manager } from '$lib/constants';
	import { application, type PkgManager } from '$lib/stores/app.svelte';
	import { copyToClipboard } from '$lib/utils';
	import type { ModelDropdownProps } from 'lapikit/components';
	import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-svelte';

	// states
	const managers = Object.entries(pkg_manager) as [PkgManager, (typeof pkg_manager)[PkgManager]][];
	let hasCopy: number | undefined = undefined;
	const codeData = [
		{ title: 'install lapikit on your app', content: '' },
		{ title: 'launch cli to configure lapikit', content: '' },
		{ title: 'use component', content: "<kit:avatar label='FR'/>" }
	];

	const handleCopy = (id: number, content: string) => {
		copyToClipboard(content);
		hasCopy = id;
		setTimeout(() => {
			hasCopy = undefined;
		}, 2000);
	};
	// write low , code more
</script>

<kit:card id="get-started-shortcut">
	<kit:card-actions>
		<kit:spacer />
		<kit:dropdown closeOnClick size="xs">
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					size="xs"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				>
					{application.pkg_selected}
					{#snippet append()}
						<kit:icon size="xs">
							{#if open}
								<ChevronDown />
							{:else}
								<ChevronUp />
							{/if}
						</kit:icon>
					{/snippet}
				</kit:btn>
			{/snippet}

			<kit:list size="xs">
				{#each managers as [key, manager] (key)}
					{#if key !== application.pkg_selected}
						<kit:list-item onclick={() => (application.pkg_selected = key)}>
							{manager.label}
						</kit:list-item>
					{/if}
				{/each}
			</kit:list>
		</kit:dropdown>
	</kit:card-actions>
	<kit:separator />

	<kit:card-container>
		{#each codeData as { title, content }, index (index)}
			<div>
				<div>0{index + 1}</div>
				<div>
					<div>{title}</div>
					<div>
						{#if index == 0}
							<span>~</span>
							{command[application.pkg_selected]['install-lapikit']}
						{:else if index == 1}
							<span>~</span>
							{command[application.pkg_selected]['launch-cli']}
						{:else}
							{content}
						{/if}
						<kit:spacer />
						<kit:btn
							icon
							onclick={() =>
								handleCopy(
									index,
									index == 0
										? command[application.pkg_selected]['install-lapikit']
										: index == 1
											? command[application.pkg_selected]['launch-cli']
											: content
								)}
							size="xs"
						>
							<kit:icon size="xs">
								{#if hasCopy === index}
									<Check />
								{:else}
									<Copy />
								{/if}
							</kit:icon>
						</kit:btn>
					</div>
				</div>
			</div>
		{/each}
	</kit:card-container>
</kit:card>

<style lang="scss">
	:global(#get-started-shortcut) {
		border-color: var(--kit-color-border);
		border-style: solid;
		border-width: 1px;
		font-size: 12px;
		height: fit-content;
		max-width: 560px;

		:global(.kit-card-container) {
			padding: 22px 22px 24px;

			> div {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 20px;
				margin-bottom: 15px;

				> div:first-child {
					opacity: 0.65;
				}

				> div:last-child > div:first-child {
					text-transform: uppercase;
					margin-bottom: 10px;
					opacity: 0.65;
					text-align: start;
				}

				> div:last-child > div:last-child {
					display: flex;
					align-items: center;
					opacity: 1;

					span {
						margin-right: 6px;
					}
				}
			}
		}
	}
</style>
