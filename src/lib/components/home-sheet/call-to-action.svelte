<script lang="ts">
	import { resolve } from '$app/paths';
	import { createTheme } from 'lapikit/actions';

	import { Boxes, Rocket } from 'lucide-svelte';
	import MascotHappyAnimate from '$lib/assets/images/mascot/happy-animate.webp';
	import MascotHappy from '$lib/assets/images/mascot/happy.webp';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import InstallCommand from './install-command.svelte';

	const banner = createTheme();
</script>

<SheetSection labelledby="cta-title">
	<SheetGrid>
		<div class="cta brand-theme" use:banner.action={{ name: 'dark', overridden: true }}>
			<div class="cta-content">
				<p class="cta-eyebrow">// Ready?</p>
				<h2 id="cta-title" class="cta-title">
					Write less,<br />
					<span class="cta-accent">code more.</span>
				</h2>
				<p class="cta-description">
					Add Lapikit to an existing Svelte or SvelteKit project, then run
					<code>npx lapikit</code> to set everything up.
				</p>

				<div class="cta-install">
					<InstallCommand />
				</div>

				<div class="cta-actions">
					<kit:btn href={resolve('/docs/getting-started')} color="accent" size="lg" rounded="md">
						{#snippet prepend()}
							<kit:icon><Rocket /></kit:icon>
						{/snippet}
						Quick start
					</kit:btn>
					<kit:btn href={resolve('/docs/components')} variant="outline" size="lg" rounded="md">
						{#snippet prepend()}
							<kit:icon><Boxes /></kit:icon>
						{/snippet}
						Browse components
					</kit:btn>
				</div>
			</div>

			<div class="cta-mascot">
				<picture>
					<source srcset={MascotHappy} media="(prefers-reduced-motion: reduce)" />
					<img
						src={MascotHappyAnimate}
						alt=""
						width="429"
						height="491"
						loading="lazy"
						decoding="async"
					/>
				</picture>
			</div>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.cta {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--lapikit-spacing-block);
		padding: var(--sheet-cell-padding-lg);
		overflow: hidden;
		color: var(--kit-color-text);
		background-image:
			radial-gradient(
				circle at 85% 20%,
				color-mix(in srgb, var(--kit-color-accent) 35%, transparent),
				transparent 55%
			),
			radial-gradient(
				color-mix(in srgb, var(--kit-color-text) 12%, transparent) 1px,
				transparent 1px
			);
		background-size:
			100% 100%,
			24px 24px;
	}

	.cta-content {
		display: grid;
		justify-items: start;
		gap: 24px;
		max-width: 720px;
	}

	.cta-eyebrow {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--kit-color-accent);
	}

	.cta-title {
		font-size: var(--text-display);
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.045em;
	}

	.cta-accent {
		color: var(--kit-color-accent);
	}

	.cta-description {
		max-width: 52ch;
		font-size: var(--text-lead);
		line-height: 1.55;
		color: var(--kit-color-text-muted);

		code {
			font-family: var(--font-mono);
			color: var(--kit-color-text);
		}
	}

	.cta-install {
		width: 100%;
		max-width: 480px;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.cta-mascot {
		display: none;
		flex: 1 1 0;
		justify-content: center;

		img {
			display: block;
			width: clamp(240px, 24vw, 400px);
			height: auto;
		}

		@include up(lg) {
			display: flex;
		}
	}
</style>
