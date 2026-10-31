<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, ArrowUp, RotateCcw, X } from 'lucide-svelte';

	import spriteUrl from '$lib/assets/images/mascot/lapinosaure-with-glass.webp?url';
	import {
		WORLD_HEIGHT,
		createGame,
		type GameInput,
		type GameStatus,
		type Palette
	} from './engine';

	let { onclose }: { onclose: () => void } = $props();

	const STEP = 1 / 120;
	const MAX_FRAME_TIME = 0.1;
	const KEY_ACTIONS: Record<string, keyof GameInput> = {
		ArrowLeft: 'left',
		KeyA: 'left',
		ArrowRight: 'right',
		KeyD: 'right',
		ArrowUp: 'jump',
		KeyW: 'jump',
		Space: 'jump'
	};

	const input: GameInput = { left: false, right: false, jump: false };

	let container: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let replayButton: HTMLElement | null = $state(null);

	let status: GameStatus = $state('playing');
	let carrots = $state(0);
	let totalCarrots = $state(0);
	let finalTime = $state(0);

	let game: ReturnType<typeof createGame> | undefined;

	function readPalette(element: HTMLElement): Palette {
		const styles = getComputedStyle(element);
		const token = (name: string, fallback: string) =>
			styles.getPropertyValue(name).trim() || fallback;

		return {
			sky: token('--kit-color-surface', '#ffffff'),
			ground: token('--kit-color-text', '#14171f'),
			groundTop: token('--kit-color-success', '#30915a'),
			block: token('--kit-color-surface-2', '#ebebf0'),
			blockEdge: token('--kit-color-accent', '#2a6df4'),
			carrot: token('--kit-color-warning', '#cf7d17'),
			leaf: token('--kit-color-success', '#30915a'),
			flag: token('--kit-color-accent', '#2a6df4'),
			pole: token('--kit-color-text-muted', '#5c6370')
		};
	}

	function releaseAll() {
		input.left = false;
		input.right = false;
		input.jump = false;
	}

	function press(action: keyof GameInput) {
		if (action === 'jump' && !input.jump) game?.pressJump();
		input[action] = true;
	}

	function release(action: keyof GameInput) {
		input[action] = false;
	}

	function handleKey(event: KeyboardEvent, pressed: boolean) {
		if (event.key === 'Escape') {
			if (pressed) onclose();
			return;
		}
		if (event.target !== container) return;

		const action = KEY_ACTIONS[event.code];
		if (!action) return;

		event.preventDefault();
		if (pressed) press(action);
		else release(action);
	}

	function replay() {
		game?.reset();
		status = 'playing';
		carrots = 0;
		container?.focus();
	}

	$effect(() => {
		if (status === 'won') replayButton?.focus();
	});

	onMount(() => {
		if (!canvas || !container) return;
		const element = container;
		const context = canvas.getContext('2d');
		if (!context) return;

		const sprite = new Image();
		sprite.src = spriteUrl;
		const instance = createGame(sprite);
		game = instance;
		totalCarrots = instance.stats.totalCarrots;

		let palette = readPalette(element);
		let viewWidth = 0;

		const resize = () => {
			if (!canvas) return;
			const { width, height } = canvas.getBoundingClientRect();
			const ratio = window.devicePixelRatio || 1;
			const scale = height / WORLD_HEIGHT;

			canvas.width = Math.round(width * ratio);
			canvas.height = Math.round(height * ratio);
			viewWidth = width / scale;
			context.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
		};

		const refreshPalette = () => (palette = readPalette(element));
		const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
		const themeObserver = new MutationObserver(refreshPalette);
		const resizeObserver = new ResizeObserver(resize);

		themeObserver.observe(document.documentElement, { attributes: true });
		colorScheme.addEventListener('change', refreshPalette);
		resizeObserver.observe(canvas);

		let last = performance.now();
		let accumulator = 0;
		let frame = 0;

		const loop = (now: number) => {
			accumulator += Math.min((now - last) / 1000, MAX_FRAME_TIME);
			last = now;

			while (accumulator >= STEP) {
				instance.step(STEP, input);
				accumulator -= STEP;
			}

			const stats = instance.stats;
			if (stats.carrots !== carrots) carrots = stats.carrots;
			if (instance.status !== status) {
				status = instance.status;
				finalTime = stats.time;
			}

			instance.render(context, viewWidth, palette);
			frame = requestAnimationFrame(loop);
		};

		frame = requestAnimationFrame(loop);
		element.focus();

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			colorScheme.removeEventListener('change', refreshPalette);
		};
	});
</script>

{#snippet touchControl(action: keyof GameInput)}
	<kit:btn
		icon
		size="lg"
		variant="tonal"
		tabindex={-1}
		aria-hidden="true"
		onpointerdown={() => press(action)}
		onpointerup={() => release(action)}
		onpointerleave={() => release(action)}
		onpointercancel={() => release(action)}
		oncontextmenu={(event: Event) => event.preventDefault()}
	>
		<kit:icon>
			{#if action === 'left'}
				<ArrowLeft />
			{:else if action === 'right'}
				<ArrowRight />
			{:else}
				<ArrowUp />
			{/if}
		</kit:icon>
	</kit:btn>
{/snippet}

<div
	bind:this={container}
	class="game"
	role="application"
	aria-label="Lapinosaure game"
	aria-describedby="lapinosaure-game-help"
	tabindex="0"
	onkeydown={(event) => handleKey(event, true)}
	onkeyup={(event) => handleKey(event, false)}
	onblur={releaseAll}
>
	<div class="game-hud">
		<p class="game-score" aria-live="polite">Carrots {carrots}/{totalCarrots}</p>
		<p id="lapinosaure-game-help" class="game-help">
			<kbd>←</kbd> <kbd>→</kbd> move · <kbd>Space</kbd> jump · <kbd>Esc</kbd> quit
		</p>
		<kit:btn icon variant="text" density="compact" aria-label="Close game" onclick={onclose}>
			<kit:icon><X /></kit:icon>
		</kit:btn>
	</div>

	<canvas bind:this={canvas} class="game-canvas" aria-hidden="true"></canvas>

	<div class="game-touch">
		<div class="game-touch-move">
			{@render touchControl('left')}
			{@render touchControl('right')}
		</div>
		{@render touchControl('jump')}
	</div>

	{#if status === 'won'}
		<div class="game-end" role="status">
			<p class="game-end-title">Well done!</p>
			<p>
				{carrots}/{totalCarrots} carrots in {finalTime.toFixed(1)}s
			</p>
			<div class="game-end-actions">
				<kit:btn bind:ref={replayButton} color="accent" onclick={replay}>
					{#snippet prepend()}
						<kit:icon><RotateCcw /></kit:icon>
					{/snippet}
					Play again
				</kit:btn>
				<kit:btn variant="text" onclick={onclose}>Quit</kit:btn>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.game {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		outline: none;

		&:focus-visible {
			outline: 2px solid var(--kit-color-accent);
			outline-offset: -2px;
		}
	}

	.game-hud {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 8px 8px 8px var(--lapikit-spacing-block);
		border-bottom: var(--lapikit-border);
	}

	.game-score {
		flex: 1;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.game-help {
		display: none;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);

		kbd {
			padding: 1px 6px;
			border: 1px solid var(--kit-color-border);
			border-radius: 4px;
			font-family: inherit;
			font-size: var(--text-xs);
		}

		@include up(md) {
			display: block;
		}
	}

	.game-canvas {
		display: block;
		width: 100%;
		height: 240px;
		touch-action: none;

		@include up(md) {
			height: 288px;
		}
	}

	.game-touch {
		display: none;
		justify-content: space-between;
		padding: 12px var(--lapikit-spacing-block);
		border-top: var(--lapikit-border);
		touch-action: none;
		user-select: none;

		@media (hover: none) and (pointer: coarse) {
			display: flex;
		}
	}

	.game-touch-move {
		display: flex;
		gap: 12px;
	}

	.game-end {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 8px;
		padding: var(--lapikit-spacing-block);
		background: color-mix(in oklab, var(--kit-color-surface), transparent 10%);
		text-align: center;
	}

	.game-end-title {
		font-size: var(--text-3xl);
		font-weight: 700;
	}

	.game-end-actions {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
</style>
