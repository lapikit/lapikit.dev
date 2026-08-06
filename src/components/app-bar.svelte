<script lang="ts">
	import { getContext } from 'svelte';
	import { resolve } from '$app/paths';
	import Settings from '$components/settings.svelte';

	// icons
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import { CloudDownload, Menu } from 'lucide-svelte';
	import SearchV2Action from './search-v2-action.svelte';
	import Logo from './logo.svelte';
	import LazyRepl from './lazy-repl.svelte';
	import InstallModal from './install-modal.svelte';

	let openModal: boolean = $state(false);

	const nav = getContext<{ open: boolean; toggle: () => void }>('nav');
</script>

<kit:appbar classContent="app-bar-documentation">
	<kit:btn class="lg:hidden!" onclick={() => nav.toggle()} aria-label="open navigation" icon>
		<kit:icon>
			<Menu />
		</kit:icon>
	</kit:btn>

	<Logo />

	<div class="app-bar--actions">
		<SearchV2Action />
	</div>

	<div class="flex justify-end gap-1">
		<kit:btn class="hidden! sm:flex!" href="https://discord.gg/lapikit" target="_blank" icon>
			<kit:icon>
				{@html discordIcon}
			</kit:icon>
		</kit:btn>

		<kit:btn class="hidden! sm:flex!" href="https://github.com/lapikit" target="_blank" icon>
			<kit:icon>
				{@html githubIcon}
			</kit:icon>
		</kit:btn>

		<Settings />

		<kit:btn
			class="hidden! sm:flex!"
			onclick={() => (openModal = true)}
			color="fg-inverse"
			background="bg-inverse"
		>
			{#snippet prepend()}
				<kit:icon>
					<CloudDownload />
				</kit:icon>
			{/snippet}

			Install Lapikit
		</kit:btn>
	</div>
</kit:appbar>

<InstallModal bind:open={openModal} />

<style>
	:global(header > .app-bar-documentation) {
		display: grid !important;
		grid-template-columns: auto 1fr auto;
	}

	.app-bar--actions {
		display: none;
	}

	@media (min-width: 924px) {
		:global(header > .app-bar-documentation) {
			grid-template-columns: auto auto 1fr auto;
			/* grid-template-columns: auto calc(300px - var(--kit-appbar-p)) 1fr auto; */
		}

		.app-bar--actions {
			display: flex;
			justify-content: end;
		}
	}

	@media (min-width: 1024px) {
		:global(header > .app-bar-documentation) {
			grid-template-columns: calc(300px - var(--kit-appbar-p)) 1fr auto;
		}

		.app-bar--actions {
			justify-content: start;
		}
	}

	:global(.logo-lapikit) {
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		:global(.logo-lapikit) {
			margin: initial;
		}
	}

	:global(.install-modal-toggle) {
		display: inline-flex;
		gap: 0.25rem;
	}
</style>
