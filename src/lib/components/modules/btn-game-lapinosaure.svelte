<script lang="ts">
	// assets
	import { ArrowUpRight } from 'lucide-svelte';
</script>

<kit:btn class="lapinosaure-running-power" size="xl" density="dense" rounded="0" variant="text">
	echo "lapinosaure-game"

	{#snippet append()}
		<kit:icon>
			<ArrowUpRight />
		</kit:icon>
	{/snippet}
</kit:btn>

<style lang="scss">
	:global(.lapinosaure-running-power) {
		overflow: hidden !important;
		width: 100%;

		&::after {
			width: 52px;
		}

		&::before {
			opacity: 1;
			transform: translateX(0);
		}

		// :global(.kit-btn__content) {
		// 	position: relative;
		// 	z-index: 3;
		// 	display: inline-flex;
		// 	align-items: center;
		// 	flex: 0 0 auto;
		// 	min-width: 0;
		// 	height: 18px;
		// 	overflow: visible;
		// 	color: transparent !important;
		// 	font-size: 0;
		// 	transition:
		// 		min-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
		// 		transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

		// 	&::before {
		// 		content: 'echo "run-lapinosaure-game"';
		// 		display: inline;
		// 		color: var(--kit-color-text);
		// 		font-size: 16px;
		// 		white-space: nowrap;
		// 		transform: translateX(0);
		// 		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		// 	}
		// }

		// &:hover {
		// 	:global(.kit-btn__inner) {
		// 		transition:
		// 			min-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
		// 			transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		// 		transform: translateX(0);
		// 		min-width: 330px !important;
		// 		justify-content: left;
		// 	}

		// 	:global(.kit-btn__content) {
		// 		&::before {
		// 			content: 'echo "i m a winner" >> launch game!';
		// 			transform: translateX(0);
		// 		}
		// 	}

		// 	&::before {
		// 		opacity: 1;
		// 		transform: translateX(0);
		// 	}

		// 	&::after {
		// 		width: 52px;
		// 	}
		// }
		&::before {
			content: '';
			position: absolute;
			right: 4px;
			bottom: -11px;
			z-index: 1;
			width: 42px;
			height: 50px;
			background-image: url(/mascot/lapinosaure.webp);
			background-position: left bottom;
			background-repeat: no-repeat;
			background-size: 38px 50px;
			// opacity: 0;
			pointer-events: none;
			// transform: translateX(18px);
			transition:
				opacity 0.25s ease,
				transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		}

		&::after {
			width: 52px;
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			// width: 4px;
			height: auto;
			background: linear-gradient(
				to right,
				#d45500 0 4px,
				#5b2cff 4px 8px,
				#d7e51f 8px 12px,
				#5fed83 12px 16px
			);
			background-position: right center;
			background-repeat: no-repeat;
			background-size: 16px 100%;
			pointer-events: none;
			-webkit-mask: none;
			mask: none;
			transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		}
	}
</style>
