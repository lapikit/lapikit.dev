<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { resolve } from '$app/paths';
	import { appNavigation } from '$lib';

	// assets
	import Lapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import { Bolt, ChevronDown, ChevronUp, Ellipsis, Search } from 'lucide-svelte';
</script>

<div class="test">
	<kit:appbar id="appbar-app" rounded="lg" density="compact">
		<a href={resolve('/')}>
			<enhanced:img src={Lapikit} alt="Lapikit logo" class="lapikit-logo" />
			<span>Lapikit</span>
		</a>

		<kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					size="xs"
					density="compact"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				>
					v9.99.99
				</kit:btn>
			{/snippet}
		</kit:dropdown>

		{#each appNavigation as navItem (navItem.label)}
			<kit:btn density="compact" variant="text">{navItem.label}</kit:btn>
		{/each}

		<kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					density="compact"
					is="button"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
					icon
				>
					<kit:icon><Ellipsis /></kit:icon>
				</kit:btn>
			{/snippet}
		</kit:dropdown>
	</kit:appbar>

	<kit:toolbar id="appbar-toolbar" rounded="lg" density="compact">
		<kit:dropdown closeOnClick>
			{#snippet activator({ open, toggle }: ModelDropdownProps)}
				<kit:btn
					density="compact"
					is="button"
					variant="text"
					active={open}
					onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				>
					About us
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
		</kit:dropdown>

		<kit:btn density="compact">
			{#snippet prepend()}
				{@html discordIcon}
			{/snippet}
			Discord
		</kit:btn>
		<kit:btn density="compact" icon>
			<kit:icon>
				{@html githubIcon}
			</kit:icon>
		</kit:btn>
		<kit:btn density="compact" icon>
			<kit:icon>
				<Search />
			</kit:icon>
		</kit:btn>
		<kit:btn density="compact" icon>
			<kit:icon>
				<Bolt />
			</kit:icon>
		</kit:btn>
	</kit:toolbar>
</div>

<style>
	.test {
		background: orange;
		display: flex;
		justify-content: space-between;
	}
	:global(#appbar-app) {
		width: fit-content;
		margin-top: 20px;
		overflow: visible;
	}

	:global(#appbar-app) .lapikit-logo {
		position: absolute;
		top: -26px;
		width: 44px;
	}

	:global(#appbar-app) a span {
		font-weight: 700;
		font-size: 1.325rem;
		margin-left: 54px;
	}

	:global(#appbar-toolbar) {
		margin-top: 20px;
		width: fit-content;
	}
</style>
