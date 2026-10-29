<script lang="ts">
	// assets
	import { ArrowUpRight } from 'lucide-svelte';
</script>

<kit:btn class="lapinosaure-running-power" rounded="0" variant="text">
	echo "lapinosaure-game"

	{#snippet append()}
		<kit:icon>
			<ArrowUpRight />
		</kit:icon>
	{/snippet}
</kit:btn>

<style lang="scss">
	:global(.lapinosaure-running-power) {
		overflow: hidden !important; // overwrite
		width: 100%;
		justify-content: start !important; // overwrite
		padding-left: calc(var(--lapikit-spacing-block) + 10px) !important; // overwrite

		&::before {
			content: '';
			position: absolute;
			right: 4px;
			bottom: -11px;
			z-index: 1;
			width: 42px;
			height: 50px;
			background-image: url(/mascot/lapinosaure-with-glass.webp);
			background-position: left bottom;
			background-repeat: no-repeat;
			background-size: 38px 50px;
			opacity: 1;
			pointer-events: none;
			transform: translateX(0);
			transition:
				opacity 0.25s ease,
				transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			width: 52px;
			height: auto;
			background: linear-gradient(
				to right,
				var(--kit-color-accent) 0 4px,
				var(--kit-color-svelte) 4px 8px,
				var(--kit-color-accent) 8px 12px,
				var(--kit-color-svelte) 12px 16px
			);
			background-position: right center;
			background-repeat: no-repeat;
			background-size: 16px 100%;
			pointer-events: none;
			-webkit-mask: none;
			mask: none;
			transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		}

		@media (min-width: 718px) {
			height: 100% !important;

			&::before {
				opacity: 0;
				transform: translateX(18px);
			}

			&::after {
				width: 4px;
			}

			:global(.kit-btn__content) {
				position: relative;
				z-index: 3;
				display: inline-flex;
				align-items: center;
				flex: 0 0 auto;
				min-width: 0;
				height: 18px;
				overflow: visible;
				color: transparent;
				font-size: 0;
				transition:
					min-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
					transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

				&::before {
					content: 'echo "run-lapinosaure-game"';
					display: inline;
					color: var(--kit-color-text);
					font-size: 16px;
					white-space: nowrap;
					transform: translateX(0);
					transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
				}
			}

			&:hover {
				&::before {
					opacity: 1;
					transform: translateX(0);
				}

				&::after {
					width: 52px;
				}
				:global(.kit-btn__inner) {
					transition:
						min-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
						transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
					transform: translateX(0);
					min-width: 310px !important;
					justify-content: left;
				}

				:global(.kit-btn__content) {
					&::before {
						content: 'echo "i m a winner" >> launch game!';
						transform: translateX(0);
					}
				}
			}
		}

		@media (min-width: 1400px) {
			padding-left: var(--lapikit-spacing-block) !important; // overwrite

			&:hover {
				:global(.kit-btn__inner) {
					min-width: 330px !important;
				}
			}
		}
	}
</style>
