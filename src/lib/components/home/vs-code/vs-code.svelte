<script lang="ts">
	// modules
	import Explorer from './explorer.svelte';
	import TabFiles from './tab-files.svelte';
	import Ide from './ide.svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import Aside from './aside.svelte';
	import Render from './render.svelte';

	let {
		version = 'v0.0.0'
	}: {
		version?: string;
	} = $props();

	// states
	let view = $state('+layout.svelte');
	const VS_CODE_WIDTH = 1200;
	let viewportEl: HTMLDivElement | undefined = $state();
	let scale = $state(1);
	let measured = $state(false);

	$effect(() => {
		if (!viewportEl) return;

		const observer = new ResizeObserver(([entry]) => {
			const width = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
			scale = Math.min(1, width / VS_CODE_WIDTH);
			measured = true;
		});
		observer.observe(viewportEl);

		return () => observer.disconnect();
	});
</script>

<div class="vs-code-viewport" bind:this={viewportEl}>
	<div class="vs-code-frame" class:measured>
		<div id="vs-code" style:--vs-scale={scale}>
			<Header />
			<div>
				<div>
					<Aside />
					<div>
						<div class="title">Explorer</div>
						<Explorer bind:view />
					</div>
				</div>
				<div>
					<TabFiles {view} />
					<div>
						<Ide {view} />
					</div>
				</div>
				<div>
					<Render {version} />
				</div>
			</div>
			<Footer />
		</div>
	</div>
</div>

<style lang="scss">
	.vs-code-viewport {
		contain: inline-size;
		max-width: 1280px;
		width: 100%;
		margin: 0 auto 0;
		position: relative;
		padding-inline: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	@media (max-width: 640px) {
		.vs-code-viewport {
			pointer-events: none;
		}
	}

	@media (min-width: 640px) {
		.vs-code-viewport {
			padding-inline: 40px;
			padding-top: 40px;
			padding-bottom: 90px;
		}
	}

	.vs-code-frame {
		position: relative;
		aspect-ratio: 1200 / 772;
	}

	@media (max-width: 1279px) {
		.vs-code-frame:not(.measured) #vs-code {
			visibility: hidden;
		}
	}

	#vs-code {
		--kit-color-font-vs-primary: #757575;
		--kit-color-font-vs-secondary: #8c8c8c;
		--kit-color-font-vs-tertiary: #dcdcdc;
		--kit-color-vs-hover: #313233;
		--kit-color-vs-active: #313233;
		--kit-color-vs-fill: #262728;
		--kit-color-vs-background: #191a1a;
		--kit-color-vs-ide: #121414;
		--vs-shape: 12px;

		$height-header: 32px;
		$height-footer: 34px;
		$height-tabs: 52px;
		$height-content: 640px;
		$vs-width: 1200px;

		width: $vs-width;
		z-index: 1;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: calc(-1 * #{$vs-width} / 2);
		transform: scale(var(--vs-scale));
		transform-origin: top center;

		&::before {
			content: '';
			position: absolute;
			inset: -6px;
			z-index: -1;
			border-radius: inherit;
			background: linear-gradient(
				135deg,
				var(--kit-color-accent),
				var(--kit-color-svelte),
				var(--kit-color-accent)
			);
			filter: blur(36px);
			opacity: 0.55;
			pointer-events: none;
			animation: vs-code-glow 6s ease-in-out infinite;
		}

		.title {
			font-weight: 500;
			color: var(--kit-color-font-vs-secondary);
		}

		> div {
			display: grid;
			grid-template-columns: auto calc(50% - (290px / 2)) calc(50% - (290px / 2));
			background-color: var(--kit-color-vs-background);
			width: 100%;
			height: $height-content + $height-footer + $height-header;
			overflow: hidden;
			gap: 4px;
			padding: 2px 6px;
			font-size: 12px;
			font-weight: 300;

			> div:nth-child(1) {
				// aside
				display: grid;
				grid-template-columns: auto 220px;
				gap: 4px;
				border: 1px solid var(--kit-color-vs-fill);
				background-color: var(--kit-color-vs-background);
				border-radius: 8px;

				> div {
					padding: 8px 6px;
				}
			}

			> div:nth-child(2) {
				// ide
				position: relative;
				background: var(--kit-color-vs-ide);
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;

				> div {
					height: $height-content;
					overflow: auto;
					padding: 6px 10px;
					text-wrap: nowrap;
				}
			}

			> div:nth-child(3) {
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;
				overflow: hidden;
			}
		}
	}

	@keyframes vs-code-glow {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 0.75;
			transform: scale(1.04);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		#vs-code::before {
			animation: none;
		}
	}
</style>
