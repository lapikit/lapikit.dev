<script lang="ts">
	//assets
	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';
	import LogoSvelte from '$lib/assets/images/svelte.webp?enhanced';
	import ViteJsIcon from '$lib/assets/icons/vite.js.svg?raw';
	// import RollupIcon from '$lib/assets/icons/rollup.js.svg?raw';
	// import WebpackIcon from '$lib/assets/icons/webpack.svg?raw';

	// states
	const orbitSatellites = [
		{ name: 'Vite.js', icon: ViteJsIcon, angle: -90 }
		// { name: 'rollup', icon: RollupIcon, angle: 30 },
		// { name: 'Webpack', icon: WebpackIcon, angle: 150 }
	];

	const satellites = orbitSatellites.map((satellite) => ({
		...satellite,
		left: 50 + 50 * Math.cos((satellite.angle * Math.PI) / 180),
		top: 50 + 50 * Math.sin((satellite.angle * Math.PI) / 180)
	}));
</script>

<div class="ecosystem-diagram">
	<div class="node node-svelte">
		<enhanced:img src={LogoSvelte} alt="Svelte logo" />
		<span>Svelte</span>
	</div>

	<div class="connector connector-svelte" aria-hidden="true"></div>

	<div class="orbit-column">
		<div class="orbit">
			<svg class="orbit-track" viewBox="0 0 200 200" aria-hidden="true">
				<defs>
					<linearGradient id="orbit-track-gradient-vertical" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" style="stop-color: var(--kit-color-svelte)" />
						<stop offset="100%" style="stop-color: var(--kit-color-accent)" />
					</linearGradient>
					<linearGradient id="orbit-track-gradient-horizontal" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" style="stop-color: var(--kit-color-svelte)" />
						<stop offset="100%" style="stop-color: var(--kit-color-accent)" />
					</linearGradient>
				</defs>
				<circle
					class="orbit-track-circle orbit-track-circle--vertical"
					cx="100"
					cy="100"
					r="98"
					fill="none"
					stroke="url(#orbit-track-gradient-vertical)"
					stroke-width="2"
					stroke-dasharray="6 5"
					vector-effect="non-scaling-stroke"
				/>
				<circle
					class="orbit-track-circle orbit-track-circle--horizontal"
					cx="100"
					cy="100"
					r="98"
					fill="none"
					stroke="url(#orbit-track-gradient-horizontal)"
					stroke-width="2"
					stroke-dasharray="6 5"
					vector-effect="non-scaling-stroke"
				/>
			</svg>

			<div class="orbit-spin">
				{#each satellites as satellite (satellite.name)}
					<div class="satellite-slot" style:left="{satellite.left}%" style:top="{satellite.top}%">
						<div class="satellite-badge" title={satellite.name}>
							{@html satellite.icon}
						</div>
					</div>
				{/each}
			</div>

			<div class="orbit-center">
				<enhanced:img src={LogoLapikit} alt="Lapikit logo" />
			</div>
		</div>

		<div class="preprocessor-badge">Preprocessor Lili</div>
	</div>

	<div class="connector connector-lapikit" aria-hidden="true"></div>

	<div class="node node-website">
		<div class="mockup-window">
			<div class="mockup-header">
				<div class="mockup-lines">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div class="mockup-avatar"></div>
			</div>
			<div class="mockup-body"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.ecosystem-diagram {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 28px;
		max-width: var(--app-container-size-compact);
		margin: 0 auto;
		padding: 0 24px;
	}

	.connector {
		width: 0;
		height: 48px;

		&.connector-svelte {
			border-left: 2px dashed var(--kit-color-svelte);
		}

		&.connector-lapikit {
			border-left: 2px dashed var(--kit-color-accent);
		}
	}

	.node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
	}

	.node-svelte {
		padding: 22px;
		border-radius: var(--kit-shape-sm, 12px);

		:global(picture) {
			width: 40px;
		}

		span {
			font-weight: 600;
			font-size: 0.9rem;
			color: var(--kit-color-svelte);
		}
	}

	/* orbit */
	.orbit-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.orbit {
		--orbit-size: 190px;
		--satellite-size: 44px;
		--duration: 18s;

		position: relative;
		width: var(--orbit-size);
		height: var(--orbit-size);
	}

	.orbit-track {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.orbit-track-circle--horizontal {
		display: none;
	}

	.orbit-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 92px;
		height: 92px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--kit-color-accent);
		border: 1px solid var(--kit-color-fill);
		box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.25);
		z-index: 1;

		:global(picture) {
			width: 46px;
		}
	}

	.orbit-spin {
		position: absolute;
		inset: 0;
		animation: orbit-rotate var(--duration) linear infinite;
	}

	.satellite-slot {
		position: absolute;
		width: var(--satellite-size);
		height: var(--satellite-size);
		margin: calc(var(--satellite-size) / -2) 0 0 calc(var(--satellite-size) / -2);
	}

	.satellite-badge {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border-radius: 50%;
		background-color: var(--kit-color-surface-1);
		border: 1px solid var(--kit-color-fill);
		box-shadow: 0 6px 16px -10px rgba(0, 0, 0, 0.3);
		animation: orbit-counter-rotate var(--duration) linear infinite;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}

	.preprocessor-badge {
		padding: 8px 16px;
		border-radius: 999px;
		background-color: var(--kit-color-surface-1);
		border: 1px solid var(--kit-color-fill);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--kit-color-text-muted, inherit);
	}

	/* website mockup */
	.node-website {
		width: 100%;
		max-width: 260px;
	}

	.mockup-window {
		width: 100%;
		border-radius: var(--kit-shape-sm, 12px);
		border: 1px solid var(--kit-color-fill);
		background-color: var(--kit-color-surface-1);
		padding: 14px;
		display: grid;
		gap: 12px;
	}

	.mockup-header {
		display: flex;
		align-items: center;
		gap: 10px;

		.mockup-lines {
			flex: 1;
			display: grid;
			gap: 6px;

			span {
				display: block;
				height: 6px;
				border-radius: 3px;
				background-color: var(--kit-color-fill);

				&:nth-child(2) {
					width: 70%;
				}
				&:nth-child(3) {
					width: 45%;
				}
			}
		}

		.mockup-avatar {
			flex-shrink: 0;
			width: 30px;
			height: 30px;
			border-radius: var(--kit-shape-sm, 8px);
			background-color: var(--kit-color-accent);
		}
	}

	.mockup-body {
		height: 120px;
		border-radius: var(--kit-shape-sm, 8px);
		background-color: var(--kit-color-fill);
	}

	@keyframes orbit-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes orbit-counter-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orbit-spin,
		.satellite-badge {
			animation: none;
		}
	}

	@media (min-width: 780px) {
		.ecosystem-diagram {
			flex-direction: row;
			justify-content: center;
			gap: 20px;
		}

		.connector {
			width: auto;
			height: 0;
			flex: 1 1 60px;
			min-width: 40px;
			max-width: 120px;
			border-left: none;

			&.connector-svelte {
				border-top: 2px dashed var(--kit-color-svelte);
			}

			&.connector-lapikit {
				border-top: 2px dashed var(--kit-color-accent);
			}
		}

		.orbit-track-circle--vertical {
			display: none;
		}

		.orbit-track-circle--horizontal {
			display: block;
		}
	}

	@media (min-width: 1024px) {
		.orbit {
			--orbit-size: 220px;
			--satellite-size: 52px;
		}

		.orbit-center {
			width: 104px;
			height: 104px;

			:global(picture) {
				width: 54px;
			}
		}

		.node-svelte {
			max-width: 260px;
			width: 100%;
		}
	}
</style>
