<script lang="ts">
	import { createTheme } from 'lapikit/actions';

	// assets
	import { ArrowRight, Moon, Sun } from 'lucide-svelte';
	import LogoLinear from '$lib/assets/images/lapikit-inline.svg?raw';

	const themePreviewVscode = createTheme();

	let {
		version = 'v0.0.0'
	}: {
		version?: string;
	} = $props();
</script>

<div id="preview-vscode" use:themePreviewVscode.action={{ name: 'light' }}>
	<kit:appbar is="div" density="compact" elevation="2">
		<span class="logo" role="img" aria-label="Lapikit logo">{@html LogoLinear}</span>
		<kit:spacer />
		<kit:btn variant="text" size="sm">Features</kit:btn>
		<kit:btn variant="text" size="sm">About</kit:btn>
		<kit:btn size="sm">Discover</kit:btn>
		<kit:btn
			size="sm"
			icon
			onclick={() =>
				themePreviewVscode.set(themePreviewVscode.active === 'dark' ? 'light' : 'dark')}
		>
			<kit:icon>
				{#if themePreviewVscode.active === 'dark'}
					<Sun />
				{:else}
					<Moon />
				{/if}
			</kit:icon>
		</kit:btn>
	</kit:appbar>

	<div>
		<div>
			<kit:chip size="sm" rounded="sm" s-style_--kit-chip-p="2px">
				{#snippet prepend()}
					<kit:chip size="xs" rounded="xs" background="accent" color="on-accent">
						Current
					</kit:chip>
				{/snippet}

				{version}

				{#snippet append()}
					<kit:icon>
						<ArrowRight />
					</kit:icon>
				{/snippet}
			</kit:chip>

			<p>Build your interface with low code</p>

			<div>
				<kit:btn rounded="lg" background="warning" color="on-warning"> Get started </kit:btn>
				<kit:btn variant="outline" rounded="lg" color="warning"> Learn more </kit:btn>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	#preview-vscode {
		display: grid;
		grid-template-rows: min-content 1fr;
		position: relative;
		height: 100%;
		color: var(--kit-color-text);
		background: var(--kit-color-surface);

		.logo {
			display: inline-flex;
			height: 32px;
			aspect-ratio: 393 / 561;

			// the path has no fill of its own: it follows the text color of the theme
			:global(svg) {
				width: 100%;
				height: 100%;
				fill: currentColor;
			}
		}

		> div {
			display: flex;
			align-items: center;
			justify-content: center;
			max-width: 80%;
			margin: 0 auto;

			> div {
				text-align: center;

				p {
					font-size: 32px;
					margin: 10px 0 20px;
				}
			}
		}
	}
</style>
