<script lang="ts">
	import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { resolve } from '$app/paths';
	// import { appNavigation } from '$lib';

	// assets
	import Lapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import { Bolt, ChevronDown, ChevronUp, Search } from 'lucide-svelte';
	import Version from '$components/appbar/modules/version.svelte';
	import DesktopNav from '$components/appbar/modules/desktop-nav.svelte';
</script>

<kit:appbar id="appbar-lapikit">
	<a href={resolve('/')}>
		<enhanced:img src={Lapikit} alt="Lapikit logo" class="lapikit-logo" />
		<span class="lapikit-name">Lapikit</span>
	</a>

	<Version />

	<DesktopNav />

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

	<kit:btn density="compact" variant="text" icon>
		<kit:icon>
			{@html githubIcon}
		</kit:icon>
	</kit:btn>
	<kit:btn density="compact" variant="text" icon>
		<kit:icon>
			<Search />
		</kit:icon>
	</kit:btn>

	<kit:btn density="compact">
		{#snippet prepend()}
			{@html discordIcon}
		{/snippet}
		Join to community
	</kit:btn>

	<kit:dropdown closeOnClick>
		{#snippet activator({ open, toggle }: ModelDropdownProps)}
			<kit:btn
				density="compact"
				is="button"
				variant="text"
				active={open}
				onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				icon
			>
				<kit:icon>
					<Bolt />
				</kit:icon>
			</kit:btn>
		{/snippet}

		<kit:list>
			<kit:list-item>Settings</kit:list-item>
		</kit:list>
	</kit:dropdown>
</kit:appbar>

<style>
	:global(#appbar-lapikit) {
		max-width: 98%;
		margin: 1% auto 0;
		background-color: purple;
		border-radius: 8px;
		overflow: visible;
	}

	.lapikit-logo {
		position: absolute;
		top: -25px;
		width: 48px;
	}

	.lapikit-name {
		font-weight: 700;
		font-size: 1.325rem;
		margin-left: 60px;
	}
</style>
