<script lang="ts">
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/actions';

	// modules
	import SocialLink from './modules/social-link.svelte';
	import SelectTheme from './modules/select-theme.svelte';

	// data
	import { urlLapikitLicense, type LinkName } from '$lib/constants';

	// assets
	import LapikitFooter from '$lib/assets/images/lapikit-footer.svg';
	import { router } from '$lib/router';
	import { ExternalLink } from 'lucide-svelte';
	import { capitalize } from '$lib/utils';

	const accordion = useAccordion();

	// states
	let year: number = new Date().getFullYear();
	const socials: LinkName[] = ['discord', 'github', 'npm'];
</script>

<footer>
	<div class="grid-footer">
		<div>
			<a href={resolve('/')} aria-label="Lapikit Home">
				<enhanced:img
					src="$lib/assets/images/lapikit.webp?w=64"
					alt="lapikit"
					aria-label="Lapikit"
					sizes="100%"
					loading="lazy"
				/>
			</a>

			<div>
				<p class="subtitle">Menu</p>

				<kit:accordion variant="text">
					{#each router.footer as { label, child }, index (index)}
						<kit:accordion-item
							{index}
							text={capitalize(label)}
							open={accordion.values.includes(index)}
							toggle={accordion.toggle}
						>
							<kit:list density="compact" rounded="0" background="transparent">
								{#each child as { label, path } (label)}
									{#if path.includes('http')}
										<kit:list-item href={path} target="_blank">
											{capitalize(label)}
											<kit:icon size="xs" color="text-muted" s-style_margin-left="7px">
												<ExternalLink />
											</kit:icon>
										</kit:list-item>
									{:else}
										<kit:list-item href={path}>{capitalize(label)}</kit:list-item>
									{/if}
								{/each}
							</kit:list>
						</kit:accordion-item>
					{/each}
				</kit:accordion>
			</div>

			<p class="subtitle">Theme</p>
			<SelectTheme />
			<p class="subtitle">Social</p>
			<div>
				<SocialLink data={socials} />
			</div>
		</div>
		<div class="grid-nav-footer">
			{#each router.footer as { label, child } (label)}
				<kit:list variant="text" nav density="compact">
					<kit:list-item class="subtitle">{capitalize(label)}</kit:list-item>
					{#each child as { label, path } (label)}
						{#if path.includes('http')}
							<kit:list-item href={path} target="_blank">
								{capitalize(label)}

								<kit:icon size="xs" color="text-muted" s-style_margin-left="7px">
									<ExternalLink />
								</kit:icon>
							</kit:list-item>
						{:else}
							<kit:list-item href={path}>{capitalize(label)}</kit:list-item>
						{/if}
					{/each}
				</kit:list>
			{/each}
		</div>
	</div>
	<div>
		<img src={LapikitFooter} loading="lazy" aria-label="Lapikit" alt="Lapikit" />
	</div>
	<div>
		Copyright © 2025 - {year} Lapikit -
		<a href={urlLapikitLicense} target="_blank" rel="external noreferrer"> MIT License </a>
	</div>
</footer>

<style lang="scss">
	footer {
		> div:last-child {
			width: 100%;
			text-align: center;
			margin-bottom: 40px;
		}

		> div:nth-child(2) {
			text-align: center;
			user-select: none;
			img {
				display: inline-block;
				max-width: 100%;
				position: relative;
				margin-top: 40px;
				padding: 76px 40px 40px;
				user-select: none;
			}
		}

		> div:nth-child(2),
		.grid-footer {
			max-width: var(--app-container-size);
			padding-left: 24px;
			padding-right: 24px;
			margin-left: auto;
			margin-right: auto;
		}

		.grid-footer {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			gap: 16px;
			margin-top: 80px;

			> div:first-child {
				grid-column: span 12;
				width: 100%;
				flex-direction: column;
				align-items: flex-start;
				display: flex;
				position: relative;
				gap: 10px;

				> a {
					margin-bottom: 20px;
				}

				> div:last-child {
					display: flex;
					gap: 4px;
				}
			}

			> div:last-child {
				display: none;
			}

			@media (min-width: 767px) {
				padding-left: 40px;
				padding-right: 40px;

				> div:first-child {
					grid-column: span 4;

					p:first-child,
					:global(.kit-accordion) {
						display: none;
					}
				}

				> div:last-child {
					grid-column: span 8;
					display: grid;
					grid-template-columns: repeat(8, 1fr);
					gap: 4px;

					> :global(*) {
						grid-column: span 4;
					}
				}
			}

			@media (min-width: 1064px) {
				> div:first-child {
					grid-column: span 2;
				}

				> div:last-child {
					grid-column: span 10;
					display: grid;
					grid-template-columns: repeat(10, 1fr);
					gap: 16px;

					> :global(*) {
						grid-column: span 2;
					}
				}
			}
		}
	}
</style>
