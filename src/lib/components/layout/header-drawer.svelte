<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { AppNavItem } from '$lib/@types';
	import { capitalize, isCurrentPath } from '$lib/utils';
	import { links, type LinkName } from '$lib/constants';
	import { getNavContext } from '$lib/stores/nav.svelte';

	import { ArrowRight, X } from 'lucide-svelte';

	import Brand from '$lib/components/layout/brand.svelte';
	import SearchBtn from '$lib/components/modules/search-btn.svelte';
	import ThemeSwitcher from '$lib/components/modules/theme-switcher.svelte';

	type DrawerItem = { label: string; path: Pathname };

	let { data }: { data: AppNavItem[] } = $props();

	const nav = getNavContext();
	const socials: LinkName[] = ['github', 'discord', 'npm', 'instagram'];
	const items: DrawerItem[] = $derived(
		data.flatMap(({ label, path, child }) =>
			path
				? [{ label, path: path as Pathname }]
				: (child ?? []).map((item) => ({ label: item.label, path: item.path as Pathname }))
		)
	);

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;

		if (nav.open && !dialog.open) {
			dialog.showModal();
			dialog.querySelector<HTMLElement>('[data-drawer-close]')?.focus();
		} else if (!nav.open && dialog.open) {
			dialog.close();
		}
	});

	function closeOnBackdrop(event: MouseEvent) {
		if (event.target === dialog) nav.close();
	}
</script>

<dialog
	bind:this={dialog}
	class="header-drawer"
	aria-label="Navigation"
	onclose={nav.close}
	onclick={closeOnBackdrop}
>
	<div class="header-drawer-panel">
		<div class="header-drawer-top">
			<Brand onclick={nav.close} />

			<kit:btn
				data-drawer-close
				icon
				variant="text"
				density="compact"
				aria-label="Close navigation"
				onclick={nav.close}
			>
				<kit:icon><X /></kit:icon>
			</kit:btn>
		</div>

		<div class="header-drawer-search">
			<SearchBtn block />
		</div>

		<nav class="header-drawer-nav" aria-label="Main">
			<ul>
				{#each items as { label, path } (label)}
					{@const current = isCurrentPath(page.url.pathname, path)}
					<li>
						<a
							href={resolve(path)}
							class:is-current={current}
							aria-current={current ? 'page' : undefined}
							onclick={nav.close}
						>
							{capitalize(label)}
							<kit:icon size="sm"><ArrowRight /></kit:icon>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header-drawer-bottom">
			<kit:btn href={resolve('/docs/getting-started')} color="accent" block onclick={nav.close}>
				Get started
			</kit:btn>

			<div class="header-drawer-meta">
				<div class="header-drawer-socials">
					{#each socials as name (name)}
						{@const link = links[name]}
						<kit:btn
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							icon
							variant="text"
							density="compact"
							aria-label={capitalize(name)}
						>
							<kit:icon>{@html link.icon}</kit:icon>
						</kit:btn>
					{/each}
				</div>

				<ThemeSwitcher />
			</div>
		</div>
	</div>
</dialog>

<style lang="scss">
	:global(html:has(.header-drawer[open])) {
		overflow: hidden;
	}

	.header-drawer {
		position: fixed;
		inset-block: 0;
		inset-inline: auto 0;
		width: min(360px, 100vw);
		max-width: none;
		height: 100dvh;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		border-inline-start: var(--lapikit-border);
		background-color: var(--kit-color-surface);
		color: var(--kit-color-text);
		transform: translateX(100%);
		transition:
			transform 0.3s ease,
			overlay 0.3s ease allow-discrete,
			display 0.3s ease allow-discrete;

		&[open] {
			transform: translateX(0);

			@starting-style {
				transform: translateX(100%);
			}
		}

		&::backdrop {
			background: color-mix(in oklab, var(--kit-color-shadow), transparent 60%);
			backdrop-filter: blur(4px);
			opacity: 0;
			transition:
				opacity 0.3s ease,
				overlay 0.3s ease allow-discrete,
				display 0.3s ease allow-discrete;
		}

		&[open]::backdrop {
			opacity: 1;

			@starting-style {
				opacity: 0;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;

			&::backdrop {
				transition: none;
			}
		}
	}

	.header-drawer-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header-drawer-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
		height: 64px;
		padding-inline: 16px 8px;
		border-bottom: var(--lapikit-border);
	}

	.header-drawer-search {
		padding: 16px;
		border-bottom: var(--lapikit-border);
	}

	.header-drawer-nav {
		flex: 1;
		overflow-y: auto;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		li {
			border-bottom: var(--lapikit-border);
		}

		a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			padding: 18px 16px;
			border-inline-start: 3px solid transparent;
			color: var(--kit-color-text);
			font-size: var(--text-lg);
			font-weight: 600;
			text-decoration: none;
			transition:
				background-color 0.2s ease,
				color 0.2s ease;

			:global(.kit-icon) {
				color: var(--kit-color-text-muted);
				transition: transform 0.2s ease;
			}

			&:hover,
			&:focus-visible {
				background-color: var(--kit-color-surface-1);

				:global(.kit-icon) {
					transform: translateX(4px);
				}
			}

			&.is-current {
				border-inline-start-color: var(--kit-color-accent);
				color: var(--kit-color-accent);

				:global(.kit-icon) {
					color: inherit;
				}
			}
		}
	}

	.header-drawer-bottom {
		display: grid;
		gap: 16px;
		flex-shrink: 0;
		padding: 16px;
		border-top: var(--lapikit-border);
	}

	.header-drawer-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.header-drawer-socials {
		display: flex;
		gap: 2px;
	}
</style>
