<script lang="ts">
	// data
	import { urlLapikitLicense, type LinkName } from '$lib/constants';

	// assets
	import LapikitFooter from '$lib/assets/images/lapikit-footer.svg?raw';

	// modules
	import SocialLink from './modules/social-link.svelte';
	import BtnGameLapinosaure from './modules/btn-game-lapinosaure.svelte';

	//states
	const socials: LinkName[] = ['instagram', 'discord', 'github', 'npm'];
	let year: number = new Date().getFullYear();
</script>

<footer class="border-top">
	<div>
		<div class="wordmark border-y border-bottom">
			<span role="img" aria-label="Lapikit">
				{@html LapikitFooter}
			</span>
		</div>
		<div class="append-footer border-y">
			<div>
				<span>© {year} Lapikit</span>

				<a href="/">MIT License</a>
				<a href="/">Support project</a>
			</div>
			<div>
				<SocialLink data={socials} />
			</div>
			<div>
				<BtnGameLapinosaure />
			</div>
		</div>
	</div>

	<!-- <div class="footer-stretch">
		<span class="block border-full lapikit-wordmark" role="img" aria-label="Lapikit">
			{@html LapikitFooter}
		</span>
	</div>
	<div class="footer-stretch">
		<div class="border-full pillar">
			<div class="copyright border-right">
				<div>
					© {year} Lapikit
				</div>

				<kit:btn
					href={urlLapikitLicense}
					target="_blank"
					rel="external noreferrer"
					density="dense"
					rounded="0"
					size="xl"
				>
					MIT License
				</kit:btn>
				<kit:btn density="dense" rounded="0" size="xl">Support project</kit:btn>
			</div>
			<div class="social border-top">
				<div>
					<SocialLink text data={socials} size="xl" density="dense" rounded="0" />
				</div>
			</div>
		</div>
	</div> -->
</footer>

<style lang="scss">
	footer {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;

		> div {
			padding-left: 24px;
			padding-right: 24px;
		}

		.wordmark {
			> span {
				display: inline-block;
				max-width: 100%;
				position: relative;
				user-select: none;
				color: var(--kit-color-text);
			}

			:global(svg) {
				display: block;
				max-width: 100%;
				height: auto;
			}
		}

		.append-footer {
			border-bottom: var(--lapikit-border);

			> div:not(:last-child) {
				border-bottom: var(--lapikit-border);
				padding: var(--lapikit-spacing-block);
			}
		}
	}
	// footer {
	// 	max-width: var(--lapikit-container-size);
	// 	margin: 0 auto;
	// 	display: grid;
	// 	* .lapikit-wordmark {
	// 		display: inline-block;
	// 		max-width: 100%;
	// 		position: relative;
	// 		user-select: none;
	// 		color: var(--kit-color-text);

	// 		:global(svg) {
	// 			display: block;
	// 			max-width: 100%;
	// 			height: auto;
	// 		}
	// 	}

	// 	.footer-stretch {
	// 		padding-left: 24px;
	// 		padding-right: 24px;

	// 		&:last-child {
	// 			display: flex;
	// 			flex-wrap: wrap;
	// 			justify-content: space-between;
	// 			width: 100%;
	// 			align-items: center;
	// 		}

	// 		.social {
	// 			display: flex;
	// 			align-items: center;
	// 		}

	// 		.copyright {
	// 			padding-left: 24px;
	// 			display: flex;
	// 			align-items: center;
	// 			width: fit-content;

	// 			& > div {
	// 				min-height: 100%;
	// 				display: flex;
	// 				align-items: center;
	// 				padding-right: 24px;
	// 			}
	// 		}

	// 		.pillar {
	// 			display: grid;
	// 			width: 100%;
	// 			grid-template-columns: 1fr;

	// 			.social {
	// 				display: grid;
	// 				grid-template-columns: 1fr;
	// 			}

	// 			@media (min-width: 1200px) {
	// 				.social {
	// 					display: flex;
	// 					justify-content: space-between;
	// 				}
	// 			}

	// 			@media (min-width: 1224px) {
	// 				display: flex;
	// 				justify-content: space-between;
	// 			}
	// 		}
	// 	}

	// 	.block {
	// 		padding: var(--lapikit-spacing-block);
	// 	}
	// }
</style>
