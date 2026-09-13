<div aria-hidden="true">
	<span class="glow-orb orb-1"></span>
	<span class="glow-orb orb-2"></span>
	<span class="glow-orb orb-3"></span>
</div>

<style lang="scss">
	div {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;

		// &::before {
		// 	// sparkles / stars
		// 	content: '';
		// 	position: absolute;
		// 	inset: 0;
		// 	background-repeat: no-repeat;
		// 	// background-image:
		// 	// 	radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent),
		// 	// 	radial-gradient(1px 1px at 60% 18%, #fff, transparent),
		// 	// 	radial-gradient(1.5px 1.5px at 80% 42%, #fff, transparent),
		// 	// 	radial-gradient(2px 2px at 33% 60%, #fff, transparent),
		// 	// 	radial-gradient(1px 1px at 12% 72%, #fff, transparent),
		// 	// 	radial-gradient(1.5px 1.5px at 70% 68%, #fff, transparent),
		// 	// 	radial-gradient(1px 1px at 92% 20%, #fff, transparent),
		// 	// 	radial-gradient(1.5px 1.5px at 45% 12%, #fff, transparent),
		// 	// 	radial-gradient(1px 1px at 5% 45%, #fff, transparent),
		// 	// 	radial-gradient(1.5px 1.5px at 55% 50%, #fff, transparent);
		// 	opacity: 0.7;
		// 	animation: header-sparkle 4s ease-in-out infinite alternate;
		// }

		// &::after {
		// 	// fade the ambient scene into the page background at the bottom edge
		// 	content: '';
		// 	position: absolute;
		// 	inset-inline: 0;
		// 	bottom: 0;
		// 	height: 200px;
		// 	background: linear-gradient(to bottom, transparent, #fff);
		// }
	}

	.glow-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(50px);
		animation: orb-float ease-in-out infinite alternate;
	}

	.orb-1 {
		width: 300px;
		height: 300px;
		top: 62%;
		left: 58%;
		// background: radial-gradient(
		// 	circle at 35% 35%,
		// 	hsl(275 95% 88%),
		// 	hsl(262 88% 62%) 45%,
		// 	transparent 72%
		// );
		background: radial-gradient(
			circle at 35% 35%,
			var(--kit-color-svelte),
			var(--kit-color-accent) 45%,
			transparent 72%
		);
		animation-duration: 11s;
	}

	.orb-2 {
		width: 220px;
		height: 220px;
		top: 68%;
		left: 30%;
		// background: radial-gradient(
		// 	circle at 35% 35%,
		// 	hsl(220 95% 88%),
		// 	hsl(238 88% 62%) 45%,
		// 	transparent 72%
		// );
		background: radial-gradient(
			circle at 35% 35%,
			var(--kit-color-accent),
			var(--kit-color-svelte),
			transparent 72%
		);
		animation-duration: 9s;
		animation-delay: -3s;
	}

	.orb-3 {
		width: 640px;
		height: 380px;
		bottom: -18%;
		left: 24%;
		filter: blur(75px);
		background: radial-gradient(
			ellipse at 50% 50%,
			var(--kit-color-svelte),
			var(--kit-color-accent) 50%,
			transparent 75%
		);
		animation-duration: 14s;
		animation-delay: -6s;
	}
</style>
