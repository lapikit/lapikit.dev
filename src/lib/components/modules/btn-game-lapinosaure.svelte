<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
</script>

<div class="lapinosaure">
	<kit:btn rounded="0" variant="text">
		<span class="label label-short">echo "lapinosaure-game"</span>
		<span class="label label-idle">echo "run-lapinosaure-game"</span>
		<span class="label label-hover">echo "i m a winner" &gt;&gt; launch game!</span>

		{#snippet append()}
			<kit:icon>
				<ArrowUpRight />
			</kit:icon>
		{/snippet}
	</kit:btn>
</div>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.lapinosaure {
		--ease: cubic-bezier(0.22, 1, 0.36, 1);
		--duration: 0.45s;
		--stripe-width: 52px;
		--hover-width: 310px;

		display: flex;
		width: 100%;

		> :global(.kit-btn) {
			flex: 1;
			overflow: hidden;
			justify-content: start;
			padding-left: calc(var(--lapikit-spacing-block) + 10px);

			&::before {
				content: '';
				position: absolute;
				right: 4px;
				bottom: -11px;
				z-index: 1;
				width: 42px;
				height: 50px;
				background: url('$lib/assets/images/mascot/lapinosaure-with-glass.webp') left bottom / 38px
					50px no-repeat;
				pointer-events: none;
				transition:
					opacity 0.25s ease,
					transform var(--duration) var(--ease);
			}

			&::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 2;
				width: var(--stripe-width);
				background: linear-gradient(
						to right,
						var(--kit-color-accent) 0 4px,
						var(--kit-color-svelte) 4px 8px,
						var(--kit-color-accent) 8px 12px,
						var(--kit-color-svelte) 12px 16px
					)
					right center / 16px 100% no-repeat;
				pointer-events: none;
				transition: width var(--duration) var(--ease);
			}
		}

		:global(.kit-btn__content) {
			position: relative;
			z-index: 3;
		}

		.label {
			white-space: nowrap;
		}

		.label-idle,
		.label-hover {
			display: none;
		}

		@include up(md) {
			--stripe-width: 4px;

			align-self: stretch;

			> :global(.kit-btn) {
				height: auto;

				&::before {
					opacity: 0;
					transform: translateX(18px);
				}
			}

			:global(.kit-btn__inner) {
				justify-content: start;
				min-width: 0;
				transition: min-width var(--duration) var(--ease);
			}

			.label-short {
				display: none;
			}

			.label-idle {
				display: inline;
			}

			&:is(:hover, :focus-within) {
				--stripe-width: 52px;

				> :global(.kit-btn)::before {
					opacity: 1;
					transform: translateX(0);
				}

				:global(.kit-btn__inner) {
					min-width: var(--hover-width);
				}

				.label-idle {
					display: none;
				}

				.label-hover {
					display: inline;
				}
			}
		}

		@include up(xl) {
			--hover-width: 330px;

			> :global(.kit-btn) {
				padding-left: var(--lapikit-spacing-block);
			}
		}

		@media (prefers-reduced-motion: reduce) {
			--duration: 0s;

			> :global(.kit-btn)::before {
				transition: none;
			}
		}
	}
</style>
