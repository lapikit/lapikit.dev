<script lang="ts">
	import { copyToClipboard } from '$lib/utils';
	import type { ModelDropdownProps } from 'lapikit/components';
	import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-svelte';

	const codeData = [
		{ title: 'add lapikit', content: "<script lang='ts'>" },
		{ title: 'import preprocess', content: "<script lang='ts'>" },
		{ title: 'use component', content: "<script lang='ts'>" }
	];

	const commandeLine = {
		npm: 'npm add -D lapikit',
		yarn: 'yarn add -D lapikit',
		bun: 'bun add -D lapikit',
		pnpm: 'pnpm add -D lapikit'
	};

	// states
	let pkg_manager: string = 'npm';
	let hasCopy: number | undefined = undefined;

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
					{pkg_manager}
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
				<kit:list-item onclick={() => (pkg_manager = 'npm')}> npm </kit:list-item>
				<kit:list-item onclick={() => (pkg_manager = 'yarn')}> yarn </kit:list-item>
				<kit:list-item onclick={() => (pkg_manager = 'bun')}> bun </kit:list-item>
				<kit:list-item onclick={() => (pkg_manager = 'pnpm')}> pnpm </kit:list-item>
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
							{commandeLine[pkg_manager]}
						{:else}
							{content}
						{/if}
						<kit:spacer />
						<kit:btn
							icon
							onclick={() => handleCopy(index, index == 0 ? commandeLine[pkg_manager] : content)}
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
				}

				> div:last-child > div:last-child {
					display: flex;
					align-items: center;
					opacity: 1;
				}
			}
		}
	}
</style>
