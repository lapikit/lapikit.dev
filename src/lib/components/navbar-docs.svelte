<script lang="ts">
	import { getContext } from 'svelte';
	import { resolve } from '$app/paths';
	import { links } from '$lib/constants';

	// modules
	import Settings from '$lib/components/settings.svelte';
	import InstallModal from '$lib/components/docs/install-modal.svelte';
	import SearchV2Action from '../../components/search-v2-action.svelte';

	// assets
	import { CloudDownload, Menu } from 'lucide-svelte';

	// states
	let openModal: boolean = $state(false);

	const nav = getContext<{ open: boolean; toggle: () => void }>('nav');
</script>

<kit:appbar classContent="navbar-documentation">
	<kit:btn class="nav-mobile-toggle" onclick={() => nav.toggle()} aria-label="open navigation" icon>
		<kit:icon>
			<Menu />
		</kit:icon>
	</kit:btn>

	<a href={resolve('/')} class="logo-lapikit" aria-label="Lapikit Home">
		<enhanced:img
			src="$lib/assets/images/lapikit.webp?w=38"
			alt="lapikit"
			aria-label="Lapikit"
			sizes="100%"
			loading="lazy"
		/>

		<span>Lapikit</span>
	</a>

	<div class="navbar--actions">
		<SearchV2Action />
	</div>

	<div class="navbar--links">
		<kit:btn class="navbar--desktop-action" href={links['discord'].url} target="_blank" icon>
			<kit:icon>
				{@html links['discord'].icon}
			</kit:icon>
		</kit:btn>

		<kit:btn class="navbar--desktop-action" href={links['github'].url} target="_blank" icon>
			<kit:icon>
				{@html links['github'].icon}
			</kit:icon>
		</kit:btn>

		<Settings />

		<kit:btn
			class="navbar--desktop-action"
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

<style lang="scss">
	:global(.nav-mobile-toggle) {
		@media (min-width: 1024px) {
			display: none !important;
		}
	}

	.navbar--links {
		display: flex;
		justify-content: end;
		gap: 0.25rem;
	}

	:global(.navbar--desktop-action) {
		display: none !important;

		@media (min-width: 640px) {
			display: flex !important;
		}
	}

	.logo-lapikit {
		display: flex;
		align-items: center;
		gap: 12px;
		width: fit-content;

		:global(span) {
			font-size: 1.325rem;
			font-weight: bold;
		}
		:global(picture) {
			max-height: 39px;
			height: 100%;
			position: relative;
			top: -9px;
		}
	}

	:global(header > .navbar-documentation) {
		display: grid !important;
		grid-template-columns: auto 1fr auto;
	}

	.navbar--actions {
		display: none;
	}

	@media (min-width: 924px) {
		:global(header > .navbar-documentation) {
			grid-template-columns: auto auto 1fr auto;
			/* grid-template-columns: auto calc(300px - var(--kit-appbar-p)) 1fr auto; */
		}

		.navbar--actions {
			display: flex;
			justify-content: end;
		}
	}

	@media (min-width: 1024px) {
		:global(header > .navbar-documentation) {
			grid-template-columns: calc(300px - var(--kit-appbar-p)) 1fr auto;
		}

		.navbar--actions {
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
