<script lang="ts">
	import { copyToClipboard } from '$lib/utils';

	// modules
	import Preview from './modules/preview.svelte';

	// data
	import { npmState } from '$lib/stores/npm.svelte';
	import { application } from '$lib/stores/app.svelte';
	import { command, nbComponents } from '$lib/constants';

	// assets
	import PixelBlast from '$lib/components/animations/pixel-blast.svelte';
	import { ArrowRight, Check, Copy } from 'lucide-svelte';

	// states
	let hasCopied: boolean = $state(false);

	function handleCopy(value: string) {
		hasCopied = true;
		copyToClipboard(value);
		setTimeout(() => {
			hasCopied = false;
		}, 2000);
	}
</script>

<section>
	<div>
		<PixelBlast
			pixelSize={2}
			colorRGB="161,192,255"
			threshold={0.2}
			noiseScale={0.005}
			evolveSpeed={0.00002}
			ripple={false}
			edgeFade={0}
		/>
	</div>

	<div>
		<div>
			<div>
				<kit:chip href="/docs/changelog" size="xl" rounded="lg" s-style_--kit-chip-p="6px">
					{#snippet prepend()}
						<kit:chip rounded="md" background="accent" color="on-accent"> New version </kit:chip>
					{/snippet}

					{npmState.version.latest}

					{#snippet append()}
						<kit:icon>
							<ArrowRight />
						</kit:icon>
					{/snippet}
				</kit:chip>
			</div>

			<div class="headline_hero">
				<h1>
					<div>Simple, optimized</div>
					<div>components</div>
					<div>
						for <span class="svelte">Svelte</span>
					</div>
				</h1>
			</div>

			<p class="introduction">
				A library of accessible, high-performance, versatile components that let you develop fast,
				fully customizable interfaces. <span class="svelte">svelte</span> and
				<span class="svelte">sveltekit</span> ready.
			</p>

			<div>
				<kit:btn href="/docs" size="lg" rounded="lg" color="on-accent" background="accent">
					Browse Components
				</kit:btn>
			</div>

			<div>
				<kit:btn
					size="sm"
					onclick={() => handleCopy(command[application.pkg_selected]['install-lapikit'])}
				>
					{#snippet prepend()}
						~
					{/snippet}

					{command[application.pkg_selected]['install-lapikit']}

					{#snippet append()}
						<kit:icon color={hasCopied && 'success'}>
							{#if hasCopied}
								<Check />
							{:else}
								<Copy />
							{/if}
						</kit:icon>
					{/snippet}
				</kit:btn>
			</div>

			<div class="indicator-lapikit">
				<p>{nbComponents} components</p>
				<p>Free forever</p>
			</div>
		</div>
		<div>
			<Preview />
		</div>
	</div>
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 90vh;
		top: -80px;

		> div:first-child {
			position: absolute;
			inset: 0;
			z-index: 0;
			top: 0;
			mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
			-webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
		}

		> div:last-child {
			display: grid;
			grid-template-columns: 1fr;
			text-align: center;
			padding-top: 180px;
			padding-right: 40px;
			padding-left: 40px;
			max-width: var(--app-container-size);
			margin: 0 auto;
			width: 100%;
			gap: 16px;

			> div:first-child {
				display: flex;
				flex-direction: column;
				gap: 20px;
				justify-content: center;
				align-items: center;

				h1 {
					position: relative;
					width: fit-content;
					font-size: clamp(28px, 5.5vw, 68px);
					font-weight: 500;
					line-height: 1.1;
					letter-spacing: -0.02em;
					color: var(--kit-color-text);
				}

				p.introduction {
					position: relative;
					width: fit-content;
					font-size: 16px;
					font-weight: 600;
					line-height: 1.6;
					color: var(--kit-color-text);
					margin: 0;
					max-width: 42ch;
				}
			}

			@media (max-width: 1024px) {
				> div:last-child {
					display: none;
				}
			}

			@media (min-width: 1024px) {
				grid-template-columns: minmax(510px, 1fr) auto;
				text-align: start;

				> div:first-child {
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: start;
					gap: 20px;
				}
			}
		}

		.indicator-lapikit {
			position: relative;
			width: fit-content;
			backdrop-filter: blur(1px);
			text-transform: uppercase;
			color: var(--kit-color-text-subtle);
			display: flex;
			gap: 10px;
			font-size: var(--kit-font-xs);
		}

		.svelte {
			color: var(--kit-color-svelte);
		}
	}
</style>
