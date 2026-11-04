<script lang="ts">
	import MascotLapikitStar from '$lib/assets/images/mascot/stars.webp?enhanced';
	import LogoSvelte from '$lib/assets/images/svelte.webp?enhanced';
	import ViteIcon from '$lib/assets/icons/vite.js.svg?url';
	import RollupIcon from '$lib/assets/icons/rollup.js.svg?url';
	import WebpackIcon from '$lib/assets/icons/webpack.svg?url';

	import { ArrowDown, ArrowRight, FileCode2, Monitor } from 'lucide-svelte';

	type Bundler = {
		name: string;
		icon: string;
		plugin: string;
		supported: boolean;
	};

	const bundlers: Bundler[] = [
		{ name: 'Vite', icon: ViteIcon, plugin: '@sveltejs/vite-plugin-svelte', supported: true },
		{ name: 'Rollup', icon: RollupIcon, plugin: 'rollup-plugin-svelte', supported: false },
		{ name: 'Webpack', icon: WebpackIcon, plugin: 'svelte-loader', supported: false }
	];

	let selectedName = $state(bundlers[0].name);
	const selected = $derived(bundlers.find(({ name }) => name === selectedName) ?? bundlers[0]);
</script>

{#snippet arrow()}
	<li class="pipeline-arrow" aria-hidden="true">
		<span class="pipeline-arrow-down"><ArrowDown size={16} /></span>
		<span class="pipeline-arrow-right"><ArrowRight size={16} /></span>
	</li>
{/snippet}

<div class="pipeline">
	<ol class="pipeline-flow">
		<li class="pipeline-node">
			<p class="pipeline-label">01 · Write</p>
			<div class="pipeline-card">
				<p class="pipeline-file">
					<FileCode2 size={14} aria-hidden="true" />
					App.svelte
				</p>
				<pre class="pipeline-code"><code
						>&lt;kit:btn&gt;
  Save
&lt;/kit:btn&gt;</code
					></pre>
			</div>
		</li>

		{@render arrow()}

		<li class="pipeline-node pipeline-bundler">
			<div class="pipeline-bundler-head">
				<p class="pipeline-label">02 · Build with</p>
				<div class="pipeline-bundlers" role="group" aria-label="Bundler">
					{#each bundlers as bundler (bundler.name)}
						<button
							type="button"
							class="pipeline-bundler-option"
							aria-pressed={bundler.name === selectedName}
							onclick={() => (selectedName = bundler.name)}
						>
							<img src={bundler.icon} alt="" width="16" height="16" />
							{bundler.name}
							{#if !bundler.supported}
								<span class="pipeline-soon">Soon</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<ol class="pipeline-steps" class:is-pending={!selected.supported}>
				<li class="pipeline-step is-lili">
					<span class="pipeline-step-icon">
						<enhanced:img src={MascotLapikitStar} alt="" sizes="28px" />
					</span>
					<p class="pipeline-step-title">Lili preprocessor</p>
					<p class="pipeline-step-text">
						Rewrites <code>&lt;kit:btn&gt;</code> into an imported Svelte component.
					</p>
				</li>

				{@render arrow()}

				<li class="pipeline-step">
					<span class="pipeline-step-icon is-muted">TS</span>
					<p class="pipeline-step-title">Other preprocessors</p>
					<p class="pipeline-step-text">TypeScript, SCSS… when your project uses them.</p>
				</li>

				{@render arrow()}

				<li class="pipeline-step is-svelte">
					<span class="pipeline-step-icon">
						<enhanced:img src={LogoSvelte} alt="" sizes="24px" />
					</span>
					<p class="pipeline-step-title">Svelte compiler</p>
					<p class="pipeline-step-text">Compiles the components to JavaScript and CSS.</p>
				</li>
			</ol>

			<p class="pipeline-plugin" aria-live="polite">
				{#if selected.supported}
					Runs through <code>{selected.plugin}</code>
				{:else}
					{selected.name} support is coming soon, through <code>{selected.plugin}</code>
				{/if}
			</p>
		</li>

		{@render arrow()}

		<li class="pipeline-node">
			<p class="pipeline-label">03 · Ship</p>
			<div class="pipeline-card pipeline-browser">
				<div class="pipeline-browser-bar" aria-hidden="true">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div class="pipeline-browser-body">
					<Monitor size={20} aria-hidden="true" />
					<p>Plain Svelte 5</p>
					<p class="pipeline-browser-note">No extra runtime</p>
				</div>
			</div>
		</li>
	</ol>
</div>

<style lang="scss">
	.pipeline {
		container-type: inline-size;
		width: 100%;
	}

	.pipeline-flow,
	.pipeline-steps {
		display: grid;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pipeline-flow {
		justify-items: center;
	}

	.pipeline-node {
		display: grid;
		gap: 10px;
		width: 100%;
		max-width: 420px;
	}

	.pipeline-label {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.pipeline-card {
		border: 1px solid var(--kit-color-border);
		background-color: var(--kit-color-surface-1);
	}

	.pipeline-file {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 0;
		padding: 8px 12px;
		border-bottom: 1px solid var(--kit-color-border);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
	}

	.pipeline-code {
		margin: 0;
		padding: 12px;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--kit-color-accent);
	}

	.pipeline-arrow {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--kit-color-text-muted);
	}

	.pipeline-arrow-right {
		display: none;
	}

	.pipeline-bundler {
		max-width: 520px;
		padding: 16px;
		border: 1px dashed var(--kit-color-border);
	}

	.pipeline-bundler-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.pipeline-bundlers {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.pipeline-bundler-option {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 32px;
		padding: 0 10px;
		border: 1px solid var(--kit-color-border);
		background-color: var(--kit-color-surface);
		color: var(--kit-color-text);
		font: inherit;
		font-size: var(--text-sm);
		cursor: pointer;

		&:hover {
			background-color: var(--kit-color-surface-1);
		}

		&:focus-visible {
			outline: 2px solid var(--kit-color-accent);
			outline-offset: 2px;
		}

		&[aria-pressed='true'] {
			border-color: var(--kit-color-accent);
			box-shadow: inset 0 0 0 1px var(--kit-color-accent);
		}
	}

	.pipeline-soon {
		padding: 1px 6px;
		background-color: var(--kit-color-surface-2);
		color: var(--kit-color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
	}

	.pipeline-steps {
		transition: opacity 0.2s ease;

		&.is-pending {
			opacity: 0.55;
		}
	}

	.pipeline-step {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		column-gap: 12px;
		row-gap: 2px;
		align-items: center;
		padding: 12px;
		border: 1px solid var(--kit-color-border);
		background-color: var(--kit-color-surface);

		&.is-lili {
			border-color: color-mix(in oklab, var(--kit-color-accent), transparent 40%);
		}

		&.is-svelte {
			border-color: color-mix(in oklab, var(--kit-color-svelte), transparent 40%);
		}
	}

	.pipeline-step-icon {
		display: flex;
		grid-row: span 2;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: var(--kit-color-accent);

		:global(picture),
		:global(img) {
			width: 26px;
			height: 26px;
			object-fit: contain;
		}

		&.is-muted {
			background-color: var(--kit-color-surface-2);
			color: var(--kit-color-text-muted);
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			font-weight: 600;
		}

		.is-svelte & {
			background-color: color-mix(in oklab, var(--kit-color-svelte), transparent 88%);
		}
	}

	.pipeline-step-title {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.pipeline-step-text {
		margin: 0;
		font-size: var(--text-xs);
		line-height: 1.5;
		color: var(--kit-color-text-muted);

		code {
			font-family: var(--font-mono);
			color: var(--kit-color-text);
		}
	}

	.pipeline-plugin {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);

		code {
			font-family: var(--font-mono);
			color: var(--kit-color-text);
		}
	}

	.pipeline-browser-bar {
		display: flex;
		gap: 6px;
		padding: 10px 12px;
		border-bottom: 1px solid var(--kit-color-border);

		span {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background-color: var(--kit-color-surface-2);
		}
	}

	.pipeline-browser-body {
		display: grid;
		justify-items: center;
		gap: 4px;
		padding: 24px 12px;
		color: var(--kit-color-accent);

		p {
			margin: 0;
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--kit-color-text);
		}

		.pipeline-browser-note {
			font-size: var(--text-xs);
			font-weight: 400;
			color: var(--kit-color-text-muted);
		}
	}

	@container (min-width: 640px) {
		.pipeline-bundler {
			max-width: 760px;
		}

		.pipeline-steps {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
			align-items: stretch;

			.pipeline-arrow-down {
				display: none;
			}

			.pipeline-arrow-right {
				display: flex;
			}
		}

		.pipeline-step {
			grid-template-columns: minmax(0, 1fr);
			align-content: start;
			row-gap: 6px;
		}

		.pipeline-step-icon {
			grid-row: auto;
		}
	}

	@container (min-width: 1000px) {
		.pipeline-flow {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 3fr) auto minmax(0, 1fr);
			align-items: center;
			justify-items: stretch;

			> .pipeline-arrow .pipeline-arrow-down {
				display: none;
			}

			> .pipeline-arrow .pipeline-arrow-right {
				display: flex;
			}
		}

		.pipeline-node,
		.pipeline-bundler {
			max-width: none;
		}
	}
</style>
