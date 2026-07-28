<script lang="ts">
	// TEMPS
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/actions';
	import routerFooter from '../../content/router-footer.json';

	// modules
	import ThemeSelect from '$components/theme-select.svelte';

	// assets
	import { ExternalLink } from 'lucide-svelte';
	import LapikitFooter from '$lib/assets/images/lapikit-footer.svg';
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import npmIcon from '$lib/assets/icons/npm.svg?raw';

	const accordion = useAccordion();

	// states
	let year: number = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<div class="layout_grid">
			<div class="layout_row_section">
				<a href={resolve('/')} class="footer_logo_link" aria-label="Lapikit Home">
					<enhanced:img
						src="$lib/assets/images/lapikit.webp?w=38"
						alt="lapikit"
						aria-label="Lapikit"
						sizes="100%"
						loading="lazy"
					/>
				</a>

				<div class="layout_menu_sitemap">
					<p class="subtitle">Menu</p>

					<kit:accordion variant="text">
						{#each routerFooter as { title, child }, index (index)}
							<kit:accordion-item
								{index}
								text={title}
								open={accordion.values.includes(index)}
								toggle={accordion.toggle}
							>
								<kit:list density="compact" rounded="0" background="transparent">
									{#each child as { label, url, path } (label)}
										{#if url}
											<kit:list-item href={url} target="_blank" s-style_gap="15px">
												{label}
												<kit:icon size="xs" color="text-muted">
													<ExternalLink />
												</kit:icon>
											</kit:list-item>
										{:else if path}
											<kit:list-item href={path}>{label}</kit:list-item>
										{/if}
									{/each}
								</kit:list>
							</kit:accordion-item>
						{/each}
					</kit:accordion>
				</div>

				<p class="subtitle">Theme</p>

				<ThemeSelect />

				<p class="subtitle">Social</p>

				<kit:toolbar background="transparent" density="none">
					<kit:btn href="https://discord.gg/lapikit" target="_blank" icon>
						<kit:icon>
							{@html discordIcon}
						</kit:icon>
					</kit:btn>

					<kit:btn href="https://github.com/lapikit" target="_blank" icon>
						<kit:icon>
							{@html githubIcon}
						</kit:icon>
					</kit:btn>

					<kit:btn href="https://www.npmjs.com/package/lapikit" target="_blank" icon>
						<kit:icon>
							{@html npmIcon}
						</kit:icon>
					</kit:btn>
				</kit:toolbar>
			</div>
			<div class="layout_grid_sitemap">
				{#each routerFooter as { title, child } (title)}
					<kit:list variant="text" nav density="compact">
						<kit:list-item class="subtitle">{title}</kit:list-item>
						{#each child as { label, url, path } (label)}
							{#if url}
								<kit:list-item href={url} target="_blank" s-style_gap="15px">
									{label}
									<kit:icon size="xs" color="text-muted">
										<ExternalLink />
									</kit:icon>
								</kit:list-item>
							{:else if path}
								<kit:list-item href={path}>{label}</kit:list-item>
							{/if}
						{/each}
					</kit:list>
				{/each}
			</div>
		</div>
	</div>
	<div class="container_word_lapikit">
		<img src={LapikitFooter} loading="lazy" aria-label="Lapikit" alt="Lapikit" />
	</div>

	<div class="container_copyright">
		Copyright © 2025 - {year} Lapikit -
		<a href="https://github.com/lapikit/lapikit.dev/blob/main/LICENSE" target="_blank">
			MIT License
		</a>
	</div>
</footer>

<style lang="scss">
	footer {
		:global(.kit-list) {
			:global(.subtitle) {
				font-weight: 900;
			}
		}

		.layout_grid {
			display: grid;
			grid-template-columns: 1fr;
		}

		.footer_logo_link {
			display: inline-block;
			margin-bottom: 30px;
			:global(img) {
				width: 64px;
			}
		}

		.container {
			max-width: 1538px;
			margin-top: 80px;
			padding-left: 24px;
			padding-right: 24px;
		}

		.container_word_lapikit {
			max-width: 1538px;
			text-align: center;
			margin-left: auto;
			margin-right: auto;

			img {
				display: inline-block;
				max-width: 100%;
				position: relative;
				margin-top: 40px;
				padding: 76px 40px 40px;
			}
		}

		.container_copyright {
			width: 100%;
			text-align: center;
			margin-bottom: 40px;
		}

		.layout_row_section,
		.layout_menu_sitemap {
			width: 100%;
			flex-direction: column;
			align-items: flex-start;
			display: flex;
			position: relative;
			gap: 10px;
		}

		.layout_grid_sitemap {
			display: none;
		}

		@media (min-width: 767px) {
			.layout_grid {
				grid-template-columns: minmax(0, 375px) 1fr;
			}
			.layout_grid_sitemap {
				display: grid;
				grid-template-columns: 1fr 1fr;
			}

			.layout_menu_sitemap {
				display: none;
			}

			.container {
				padding-left: 40px;
				padding-right: 40px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		@media (min-width: 1064px) {
			.layout_grid_sitemap {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}
		}
	}

	.subtitle {
		font-weight: 900;
	}
</style>
