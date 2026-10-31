<script lang="ts">
	import type { AppNavChild } from '$lib/@types';
	import { capitalize, isExternal } from '$lib/utils';
	import { useAccordion } from 'lapikit/actions';
	import { openConsentPreferences } from '$lib/stores/consent.svelte';

	import { links, urlLapikitLicense, type LinkName } from '$lib/constants';
	import { router } from '$lib/router';

	import LapikitFooter from '$lib/assets/images/lapikit-footer-v2.svg?raw';
	import { ExternalLink, Heart } from 'lucide-svelte';

	import SocialLink from '$lib/components/modules/social-link.svelte';
	import BtnGameLapinosaure from '$lib/components/modules/btn-game-lapinosaure.svelte';
	import SheetSpacer from '$lib/components/modules/sheet-spacer.svelte';
	import ThemeSwitcher from '$lib/components/modules/theme-switcher.svelte';

	const accordion = useAccordion();

	const socials: LinkName[] = ['instagram', 'discord', 'github', 'npm'];
	const year = new Date().getFullYear();
</script>

{#snippet footerLink({ label, path }: AppNavChild)}
	{#if isExternal(path)}
		<kit:list-item href={path} target="_blank" rel="noopener noreferrer">
			{capitalize(label)}
			<kit:icon size="xs" color="text-muted" s-style_margin-left="7px">
				<ExternalLink />
			</kit:icon>
		</kit:list-item>
	{:else if path === 'cookie-settings'}
		<kit:list-item onclick={openConsentPreferences}>{capitalize(label)}</kit:list-item>
	{:else}
		<kit:list-item href={path}>{capitalize(label)}</kit:list-item>
	{/if}
{/snippet}

<footer class="footer">
	<div class="footer-container">
		<nav class="footer-nav" aria-label="Footer">
			<div class="footer-brand">
				<p class="footer-brand-name">Lapikit</p>

				<div class="footer-theme">
					<span class="footer-theme-label" aria-hidden="true">Theme</span>
					<ThemeSwitcher />
				</div>
			</div>

			<kit:accordion class="footer-accordion" variant="text" rounded="0">
				{#each router.footer as { label, child }, index (label)}
					<kit:accordion-item
						{index}
						text={capitalize(label)}
						open={accordion.values.includes(index)}
						toggle={accordion.toggle}
					>
						<kit:list density="compact" rounded="0" variant="text">
							{#each child ?? [] as link (link.label)}
								{@render footerLink(link)}
							{/each}
						</kit:list>
					</kit:accordion-item>
				{/each}
			</kit:accordion>

			{#each router.footer as { label, child } (label)}
				<kit:list class="footer-column" variant="text" rounded="0">
					<kit:list-item class="footer-column-title">{capitalize(label)}</kit:list-item>
					{#each child ?? [] as link (link.label)}
						{@render footerLink(link)}
					{/each}
				</kit:list>
			{/each}
		</nav>
	</div>

	<SheetSpacer innerBottom />

	<div class="footer-container">
		<div class="footer-wordmark">
			<span role="img" aria-label="Lapikit">
				{@html LapikitFooter}
			</span>
		</div>

		<div class="footer-bar">
			<ul class="footer-legal">
				<li><span class="footer-copyright">© {year} Lapikit</span></li>
				<li>
					<kit:btn
						href={urlLapikitLicense}
						target="_blank"
						rel="noopener noreferrer"
						variant="plain"
						noRipple
					>
						MIT License
					</kit:btn>
				</li>
				<li>
					<kit:btn
						href={links.buymeacoffee.url}
						target="_blank"
						rel="noopener noreferrer"
						variant="plain"
						noRipple
					>
						Support project
						{#snippet append()}
							<kit:icon size="lg" color="red">
								<Heart />
							</kit:icon>
						{/snippet}
					</kit:btn>
				</li>
			</ul>

			<div class="footer-socials">
				<SocialLink data={socials} variant="plain" size="lg" monochrome />
			</div>

			<div class="footer-game">
				<BtnGameLapinosaure />
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.footer {
		border-top: var(--lapikit-border);
	}

	.footer-legal,
	.footer-game {
		:global(.kit-btn) {
			font-weight: 600;
			font-size: var(--text-md);
		}
	}

	.footer-container {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;
		padding: 0 var(--lapikit-spacing-block);
	}

	.footer-nav {
		:global(.kit-list-item) {
			padding: 0 var(--lapikit-spacing-block);
		}

		:global(button.kit-list-item) {
			font-size: var(--kit-list-item-font);
		}

		:global(.kit-accordion-item) {
			border-left: var(--lapikit-border);
			border-right: var(--lapikit-border);

			&:not(:last-child) {
				border-bottom: var(--lapikit-border);
			}
		}

		:global(.kit-accordion-item__trigger) {
			padding-left: var(--lapikit-spacing-block);
		}

		:global(.kit-accordion-item__content-inner) {
			padding: 0;
		}

		> :global(.footer-column) {
			display: none;
		}

		@include up(md) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			border-left: var(--lapikit-border);

			> :global(.footer-accordion) {
				display: none;
			}

			> :global(.footer-column) {
				display: flex;
				padding: var(--lapikit-spacing-block) 0;
				border-right: var(--lapikit-border);
				border-bottom: var(--lapikit-border);
			}

			:global(.footer-column-title) {
				font-size: var(--text-lg);
				font-weight: 600;
			}
		}

		@include up(lg) {
			grid-template-columns: repeat(3, 1fr);
		}

		@include up(xl) {
			grid-template-columns: 1.4fr repeat(4, 1fr);
		}
	}

	.footer-brand {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: var(--lapikit-spacing-block);
		border: var(--lapikit-border);
		border-top: 0;

		@include up(md) {
			grid-column: 1 / -1;
			border-left: 0;
		}

		@include up(lg) {
			grid-column: 1;
			grid-row: span 2;
			flex-direction: column;
			align-items: flex-start;
		}

		@include up(xl) {
			grid-row: auto;
		}
	}

	.footer-brand-name {
		font-size: var(--text-5xl);
		font-weight: 440;
		line-height: 1.1;
	}

	.footer-theme {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.footer-theme-label {
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.footer-wordmark {
		border: var(--lapikit-border);
		border-top: 0;

		> span {
			display: inline-block;
			max-width: 100%;
			padding: var(--lapikit-spacing-block);
			color: var(--kit-color-text);
			user-select: none;
		}

		:global(svg) {
			display: block;
			max-width: 100%;
			height: auto;
		}
	}

	.footer-bar {
		border: var(--lapikit-border);
		border-top: 0;

		@include up(md) {
			display: grid;
			grid-template-columns: 1fr auto;
			grid-template-areas:
				'legal legal'
				'socials game';
		}

		@include up(xl) {
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'legal socials game';
		}
	}

	.footer-legal {
		grid-area: legal;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		row-gap: 6px;
		padding: var(--lapikit-spacing-block);
		line-height: 1;
		border-bottom: var(--lapikit-border);

		li {
			white-space: nowrap;

			&:not(:last-child) {
				border-right: var(--lapikit-border);
			}
		}

		:global(.kit-btn) {
			height: fit-content;
			padding: 0 10px;
		}

		@include up(xl) {
			padding: 0 var(--lapikit-spacing-block);
			border-bottom: 0;

			li {
				display: flex;
				align-items: center;
				height: 100%;
				padding: 0 var(--lapikit-spacing-block);
				border-right: var(--lapikit-border);

				&:first-child {
					padding-left: 0;
				}
			}
		}
	}

	.footer-copyright {
		display: flex;
		align-items: center;
		padding: 0 10px;
		color: var(--kit-color-text-muted);

		@include up(xl) {
			padding: 0;
		}
	}

	.footer-socials {
		grid-area: socials;
		padding: 0 var(--lapikit-spacing-block);
		border-bottom: var(--lapikit-border);

		@include up(md) {
			display: flex;
			align-items: center;
			min-height: 72px;
			border-bottom: 0;
		}

		@include up(xl) {
			justify-content: end;
			border-right: var(--lapikit-border);
		}
	}

	.footer-game {
		grid-area: game;

		@include up(md) {
			display: flex;
			align-items: center;
			min-height: 72px;
		}
	}
</style>
