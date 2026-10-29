<script lang="ts">
	// data
	import { type LinkName } from '$lib/constants';

	// assets
	import LapikitFooter from '$lib/assets/images/lapikit-footer-v2.svg?raw';
	import { Heart } from 'lucide-svelte';

	// modules
	import SocialLink from './modules/social-link.svelte';
	import BtnGameLapinosaure from './modules/btn-game-lapinosaure.svelte';
	import SheetSpacer from './modules/sheet-spacer.svelte';

	//states
	const socials: LinkName[] = ['instagram', 'discord', 'github', 'npm'];
	let year: number = new Date().getFullYear();
</script>

<footer>
	<SheetSpacer innerTop innerBottom />
	<div>
		<div class="wordmark">
			<span role="img" aria-label="Lapikit">
				{@html LapikitFooter}
			</span>
		</div>
		<div class="append-footer">
			<ul class="regular-links">
				<li><span class="copyright">© {year} Lapikit</span></li>
				<li>
					<kit:btn variant="plain" noRipple>MIT License</kit:btn>
				</li>
				<li>
					<kit:btn variant="plain" noRipple>
						Support project
						{#snippet append()}
							<kit:icon size="lg" color="red">
								<Heart />
							</kit:icon>
						{/snippet}
					</kit:btn>
				</li>
			</ul>
			<div class="social-links">
				<SocialLink data={socials} variant="plain" size="lg" monochrome />
			</div>
			<div class="game-lapikit">
				<BtnGameLapinosaure />
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		border-top: var(--lapikit-border);

		> div {
			max-width: var(--lapikit-container-size);
			margin: 0 auto;
		}

		:global(.kit-btn) {
			font-weight: 600;
			font-size: 16px;
		}

		> div {
			padding-left: 24px;
			padding-right: 24px;
		}

		.copyright {
			color: var(--kit-color-text-subtle);
		}

		.regular-links {
			display: flex;
			align-items: center;
			line-height: 1;
			flex-wrap: wrap;
			justify-content: start;
			flex-grow: 1;
			row-gap: 6px;

			li {
				position: relative;
				padding: 0px;
				white-space: nowrap;

				&:not(:last-child) {
					border-right: var(--lapikit-border);
				}

				> span {
					padding: 0 10px;
					height: fit-content;
					display: flex;
					align-items: center;
				}

				:global(.kit-btn) {
					height: fit-content;
					padding: 0 10px;
				}
			}
		}

		.wordmark {
			border-left: var(--lapikit-border);
			border-right: var(--lapikit-border);
			border-bottom: var(--lapikit-border);

			> span {
				display: inline-block;
				max-width: 100%;
				position: relative;
				user-select: none;
				color: var(--kit-color-text);
				padding: var(--lapikit-spacing-block);
			}

			:global(svg) {
				display: block;
				max-width: 100%;
				height: auto;
			}
		}

		.append-footer {
			border-left: var(--lapikit-border);
			border-right: var(--lapikit-border);
			border-bottom: var(--lapikit-border);

			> ul {
				padding: var(--lapikit-spacing-block);
			}

			> div:nth-child(2) {
				padding: 0 var(--lapikit-spacing-block);
			}

			> *:not(:last-child) {
				border-bottom: var(--lapikit-border);
			}

			> .regular-links {
				grid-area: regular-links;
			}
			> .social-links {
				grid-area: social-links;
			}
			> .game-lapikit {
				grid-area: game-lapikit;
			}

			@media (min-width: 718px) {
				display: grid;
				grid-template-columns: 1fr auto;
				grid-template-areas:
					'regular-links regular-links'
					'social-links game-lapikit';

				.social-links,
				.game-lapikit {
					min-height: 72px;
					display: flex;
					align-items: center;
					border-bottom: 0;
				}
			}

			@media (min-width: 1400px) {
				grid-template-columns: auto 1fr auto;
				grid-template-areas: 'regular-links social-links game-lapikit';

				.regular-links {
					border-bottom: 0;

					li {
						border-right: var(--lapikit-border);
						height: 100%;
						display: flex;
						align-items: center;

						&:first-child {
							padding: 0 var(--lapikit-spacing-block) 0 0;
						}

						&:not(:first-child) {
							padding: 0 var(--lapikit-spacing-block);
						}

						span {
							padding: 0;
						}
					}
				}

				> * {
					padding: 0 var(--lapikit-spacing-block) !important;
				}

				.social-links {
					justify-content: end;
					border-right: var(--lapikit-border);
				}

				.game-lapikit {
					padding: 0 !important;
				}
			}
		}
	}
</style>
