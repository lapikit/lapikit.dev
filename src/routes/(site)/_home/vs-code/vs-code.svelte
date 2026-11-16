<script lang="ts">
	import {
		ArrowLeft,
		ArrowRight,
		Bell,
		BugPlay,
		ChevronRight,
		CircleX,
		Code,
		Files,
		GitBranch,
		GitFork,
		GitGraph,
		Minus,
		PackageCheck,
		PictureInPicture2,
		RefreshCw,
		Search,
		Settings,
		TriangleAlert,
		X
	} from 'lucide-svelte';
	import svelteIcon from '$lib/assets/icons/vscode/svelte.svg?raw';
	import cssIcon from '$lib/assets/icons/vscode/css.svg?raw';
	import eslintIcon from '$lib/assets/icons/vscode/eslint.svg?raw';
	import viteIcon from '$lib/assets/icons/vscode/vite.svg?raw';
	import { replVSCodeFiles } from '../code';

	import Explorer from './explorer.svelte';
	import Render from './render.svelte';

	let {
		version = ''
	}: {
		version?: string;
	} = $props();

	let view = $state('+layout.svelte');
	const vs_code_width = 1200;
	let viewportEl: HTMLDivElement | undefined = $state();
	let scale = $state(1);
	let measured = $state(false);

	const lines = $derived(replVSCodeFiles[view] ?? []);

	$effect(() => {
		if (!viewportEl) return;

		const observer = new ResizeObserver(([entry]) => {
			const width = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
			scale = Math.min(1, width / vs_code_width);
			measured = true;
		});
		observer.observe(viewportEl);

		return () => observer.disconnect();
	});
</script>

{#snippet fileIcon()}
	<kit:icon>
		{#if view.includes('.svelte')}
			{@html svelteIcon}
		{:else if view.includes('.css')}
			{@html cssIcon}
		{:else if view.includes('eslint.config')}
			{@html eslintIcon}
		{:else if view.includes('vite.config')}
			{@html viteIcon}
		{/if}
	</kit:icon>
{/snippet}

<div class="vs-code-viewport" bind:this={viewportEl}>
	<div class="vs-code-frame" class:measured>
		<div id="vs-code" style:--vs-scale={scale}>
			<div id="vs-code-header">
				<div>
					<div class="fake-btn">File</div>
					<div class="fake-btn">Edit</div>
					<div class="fake-btn">Select</div>
					<div class="fake-btn">...</div>
				</div>

				<div>
					<div class="fake-btn-icon">
						<kit:icon>
							<ArrowLeft />
						</kit:icon>
					</div>
					<div class="fake-btn-icon">
						<kit:icon>
							<ArrowRight />
						</kit:icon>
					</div>
					<div class="fake-input">lapikit-svelte-project</div>
				</div>

				<div>
					<div class="fake-btn-icon">
						<kit:icon>
							<Minus />
						</kit:icon>
					</div>
					<div class="fake-btn-icon">
						<kit:icon>
							<PictureInPicture2 />
						</kit:icon>
					</div>
					<div class="fake-btn-icon">
						<kit:icon>
							<X />
						</kit:icon>
					</div>
				</div>
			</div>
			<div class="vs-code-body">
				<div class="vs-code-sidebar">
					<div id="vs-code-aside">
						<div>
							<div class="fake-btn-icon is-active">
								<kit:icon>
									<Files />
								</kit:icon>
							</div>
							<div class="fake-btn-icon">
								<kit:icon>
									<Search />
								</kit:icon>
							</div>
							<div class="fake-btn-icon">
								<kit:icon>
									<GitGraph />
								</kit:icon>
							</div>
							<div class="fake-btn-icon">
								<kit:icon>
									<BugPlay />
								</kit:icon>
							</div>
							<div class="fake-btn-icon">
								<kit:icon>
									<PackageCheck />
								</kit:icon>
							</div>
						</div>

						<div>
							<kit:avatar size="xs" style:margin="0 auto">N</kit:avatar>

							<div class="fake-btn-icon">
								<kit:icon>
									<Settings />
								</kit:icon>
							</div>
						</div>
					</div>
					<div class="vs-code-explorer-panel">
						<div class="title">Explorer</div>
						<Explorer bind:view />
					</div>
				</div>
				<div class="vs-code-editor">
					<div id="vs-ide-tab">
						<div>
							<div>
								{@render fileIcon()}
								{view}
								<kit:icon>
									<X />
								</kit:icon>
							</div>
						</div>
						<div>
							{#if view.includes('.svelte') || view.includes('.css')}
								src
								<kit:icon>
									<ChevronRight />
								</kit:icon>
								{#if !view.includes('+') && !view.includes('.css')}
									lib
								{:else}
									routes
								{/if}

								<kit:icon>
									<ChevronRight />
								</kit:icon>
							{/if}
							{@render fileIcon()}
							{view}
						</div>
					</div>
					<div class="vs-code-editor-content">
						<div class="vs-ide text-code">
							{#each lines as line, index (index)}
								{#if line.type === 'blank'}
									<p class="return-line"></p>
								{:else}
									<p class={line.indent ? `vs-indent-${line.indent}` : undefined}>
										{#each line.tokens as token, tokenIndex (tokenIndex)}{#if typeof token === 'string'}{token}{:else}<span
													class={token.class}>{token.text}</span
												>{/if}{/each}
									</p>
								{/if}
							{/each}
						</div>
					</div>
				</div>
				<div class="vs-code-preview">
					<Render {version} />
				</div>
			</div>
			<div id="vs-code-footer">
				<div>
					<kit:icon>
						<Code />
					</kit:icon>

					<div class="fake-btn">
						<kit:icon>
							<GitFork />
						</kit:icon>

						develop
					</div>

					<div class="fake-btn-icon">
						<kit:icon>
							<RefreshCw />
						</kit:icon>
					</div>

					<div class="fake-btn-icon">
						<kit:icon>
							<GitBranch />
						</kit:icon>
					</div>

					<div class="fake-btn">
						<kit:icon>
							<CircleX />
						</kit:icon>
						<span>0</span>
						<kit:icon>
							<TriangleAlert />
						</kit:icon>
						<span>0</span>
					</div>
				</div>
				<div>
					<div class="fake-btn-icon">
						<kit:icon>
							<Bell />
						</kit:icon>
					</div>
				</div>
			</div>
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

		.vs-code-body {
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

			.vs-code-sidebar {
				display: grid;
				grid-template-columns: auto 220px;
				gap: 4px;
				border: 1px solid var(--kit-color-vs-fill);
				background-color: var(--kit-color-vs-background);
				border-radius: 8px;
			}

			.vs-code-explorer-panel {
				padding: 8px 6px;
			}

			.vs-code-editor {
				position: relative;
				background: var(--kit-color-vs-ide);
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;
			}

			.vs-code-editor-content {
				height: $height-content;
				overflow: auto;
				padding: 6px 10px;
				text-wrap: nowrap;
			}

			.vs-code-preview {
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

	#vs-code-header {
		width: 100%;
		height: 32px;
		display: grid;
		grid-template-columns: min-content 1fr auto;
		align-items: center;
		color: var(--kit-color-font-vs-primary);
		background-color: var(--kit-color-vs-background);
		border-top-left-radius: var(--vs-shape);
		border-top-right-radius: var(--vs-shape);
		padding: 0 10px;

		> div {
			display: flex;
			justify-content: center;
			gap: 4px;

			&:nth-child(1) {
				font-size: 12px;
			}
		}

		.fake-input {
			font-size: 11px;
			display: flex;
			align-items: center;
			padding: 0px 10px;
			border: 1px solid var(--kit-color-vs-fill);
			border-radius: 6px;
			min-width: 40%;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}

		.fake-btn {
			padding: 1px 5px;
			border-radius: 8px;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}

		.fake-btn-icon {
			display: flex;
			align-items: center;
			height: 24px;
			width: 24px;
			border-radius: 9999px;
			justify-content: center;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}
	}

	#vs-code-aside {
		padding: 8px 6px;
		border-right: 1px solid var(--kit-color-vs-fill);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> div {
			display: grid;
			justify-content: center;
		}

		.fake-btn-icon {
			--kit-icon-current-size: 22px;
			width: 40px;
			height: 40px;
			color: var(--kit-color-font-vs-secondary);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}

			&.is-active {
				background-color: var(--kit-color-vs-active);
				color: var(--kit-color-font-vs-tertiary);
			}
		}
	}

	#vs-ide-tab {
		display: grid;
		padding: 6px 10px 0;
		row-gap: 2px;

		> div:first-child > div {
			display: flex;
			align-items: center;
			gap: 4px;
			padding: 1px 5px;
			border-radius: 8px;
			width: fit-content;
			cursor: pointer;
			color: var(--kit-color-font-vs-tertiary);
			background-color: var(--kit-color-vs-active);
		}

		> div:last-child {
			display: flex;
			align-items: center;
			gap: 4px;
			color: var(--kit-color-font-vs-primary);
			font-size: 12px;
		}
	}

	#vs-code-footer {
		width: 100%;
		height: 34px;
		background-color: var(--kit-color-vs-background);
		color: var(--kit-color-font-vs-primary);
		border-bottom-left-radius: var(--vs-shape);
		border-bottom-right-radius: var(--vs-shape);
		display: flex;
		justify-content: space-between;
		padding: 0 10px;

		> div {
			display: flex;
			gap: 6px;
			align-items: center;

			.fake-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				font-size: 12px;
				padding: 0 6px;
				height: 24px;

				span {
					margin: 0 4px;
				}

				&:hover {
					background-color: var(--kit-color-vs-hover);
				}
			}

			.fake-btn-icon {
				width: 24px;
				height: 24px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;

				&:hover {
					background-color: var(--kit-color-vs-hover);
				}
			}
		}
	}
</style>
