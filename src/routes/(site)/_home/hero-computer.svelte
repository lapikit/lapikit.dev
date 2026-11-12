<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import Mascot from '$lib/assets/images/mascot/default.webp?enhanced';

	type Point3 = [number, number, number];

	const cos = Math.cos(Math.PI / 6);
	const sin = 0.5;

	const code = '<kit:btn>Hello</kit:btn>';
	const prompt = '> ';
	const type_delay = 70;
	const compile_delay = 450;
	const render_delay = 350;
	const hold_delay = 2800;

	const plate = { x: [0, 265], y: [0, 205], z: [0, 6] };
	const body = { x: [30, 190], y: [32, 102], z: [6, 156] };
	const keyboard = { x: [38, 182], y: [120, 182], z: [6, 13] };
	const screen = { u: [18, 142], z: [68, 146] };
	const bezel = { u: [10, 150], z: [58, 152] };
	const mascotFoot: Point3 = [242, 52, 6];
	const mascotWidth = 104;

	const project = ([x, y, z]: Point3) => [(x - y) * cos, (x + y) * sin - z] as const;
	const toPoints = (points: Point3[]) => points.map((point) => project(point).join(',')).join(' ');

	function boxFaces({ x: [x0, x1], y: [y0, y1], z: [z0, z1] }: typeof body) {
		return {
			top: toPoints([
				[x0, y0, z1],
				[x1, y0, z1],
				[x1, y1, z1],
				[x0, y1, z1]
			]),
			front: toPoints([
				[x0, y1, z1],
				[x1, y1, z1],
				[x1, y1, z0],
				[x0, y1, z0]
			]),
			side: toPoints([
				[x1, y0, z1],
				[x1, y1, z1],
				[x1, y1, z0],
				[x1, y0, z0]
			])
		};
	}

	const frontRect = (u0: number, u1: number, z0: number, z1: number) =>
		toPoints([
			[body.x[0] + u0, body.y[1], z1],
			[body.x[0] + u1, body.y[1], z1],
			[body.x[0] + u1, body.y[1], z0],
			[body.x[0] + u0, body.y[1], z0]
		]);

	const plateFaces = boxFaces(plate);
	const bodyFaces = boxFaces(body);
	const keyboardFaces = boxFaces(keyboard);

	const bezelShape = frontRect(bezel.u[0], bezel.u[1], bezel.z[0], bezel.z[1]);
	const screenShape = frontRect(screen.u[0], screen.u[1], screen.z[0], screen.z[1]);
	const floppySlot = frontRect(92, 146, 34, 39);
	const powerLight = frontRect(14, 18, 26, 28);

	const frontVents = Array.from({ length: 7 }, (_, index) => {
		const u = 14 + index * 4;
		return [project([body.x[0] + u, body.y[1], 34]), project([body.x[0] + u, body.y[1], 46])];
	});

	const sideVents = Array.from({ length: 6 }, (_, index) => {
		const z = 110 + index * 6;
		return [project([body.x[1], 44, z]), project([body.x[1], 90, z])];
	});

	const topVents = Array.from({ length: 5 }, (_, index) => {
		const y = 42 + index * 5;
		return [project([body.x[0] + 30, y, body.z[1]]), project([body.x[1] - 30, y, body.z[1]])];
	});

	const key_columns = 13;
	const key_rows = 4;
	const key_gap = 1.4;
	const keyArea = {
		x: [keyboard.x[0] + 6, keyboard.x[1] - 6],
		y: [keyboard.y[0] + 6, keyboard.y[1] - 6]
	};
	const keyWidth = (keyArea.x[1] - keyArea.x[0]) / key_columns;
	const keyDepth = (keyArea.y[1] - keyArea.y[0]) / (key_rows + 1);

	const keyShape = (x0: number, x1: number, y0: number, y1: number) =>
		toPoints([
			[x0 + key_gap, y0 + key_gap, keyboard.z[1]],
			[x1 - key_gap, y0 + key_gap, keyboard.z[1]],
			[x1 - key_gap, y1 - key_gap, keyboard.z[1]],
			[x0 + key_gap, y1 - key_gap, keyboard.z[1]]
		]);

	const keys = [
		...Array.from({ length: key_rows * key_columns }, (_, index) => {
			const column = index % key_columns;
			const row = Math.floor(index / key_columns);
			const x0 = keyArea.x[0] + column * keyWidth;
			const y0 = keyArea.y[0] + row * keyDepth;
			return keyShape(x0, x0 + keyWidth, y0, y0 + keyDepth);
		}),
		keyShape(
			keyArea.x[0] + keyWidth * 3,
			keyArea.x[0] + keyWidth * 10,
			keyArea.y[0] + key_rows * keyDepth,
			keyArea.y[1]
		)
	];

	const cable = (() => {
		const [sx, sy] = project([keyboard.x[1] - 8, keyboard.y[0], 10]);
		const [cx, cy] = project([keyboard.x[1] + 22, keyboard.y[0] - 4, 8]);
		const [ex, ey] = project([body.x[1] - 6, body.y[1], 14]);
		return `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
	})();

	const [screenOriginX, screenOriginY] = project([body.x[0] + screen.u[0], body.y[1], screen.z[1]]);
	const screenTransform = `matrix(${cos} ${sin} 0 1 ${screenOriginX} ${screenOriginY})`;
	const screenWidth = screen.u[1] - screen.u[0];

	const allPoints = [plateFaces.top, plateFaces.front, plateFaces.side, bodyFaces.top]
		.join(' ')
		.split(' ')
		.map((pair) => pair.split(',').map(Number));
	const margin = 8;
	const minX = Math.min(...allPoints.map(([x]) => x)) - margin;
	const maxX = Math.max(...allPoints.map(([x]) => x)) + margin;
	const minY = Math.min(...allPoints.map(([, y]) => y)) - margin;
	const maxY = Math.max(...allPoints.map(([, y]) => y)) + margin;
	const viewWidth = maxX - minX;
	const viewHeight = maxY - minY;

	const [footX, footY] = project(mascotFoot);
	const mascotStyle = [
		`left: ${((footX - mascotWidth / 2 - minX) / viewWidth) * 100}%`,
		`bottom: ${((maxY - footY) / viewHeight) * 100}%`,
		`width: ${(mascotWidth / viewWidth) * 100}%`
	].join('; ');

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');

	let typed = $state(code.length);
	let compiled = $state(true);
	let rendered = $state(true);
	let root: HTMLDivElement | undefined = $state();
	let visible = $state(false);

	$effect(() => {
		if (!root) return;
		const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		observer.observe(root);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (reducedMotion.current) {
			typed = code.length;
			compiled = true;
			rendered = true;
			return;
		}

		if (!visible) return;

		let timer: ReturnType<typeof setTimeout>;
		const wait = (delay: number, next: () => void) => (timer = setTimeout(next, delay));

		let count = 0;

		const restart = () => {
			count = 0;
			typed = 0;
			compiled = false;
			rendered = false;
			typeNext();
		};

		const typeNext = () => {
			if (count < code.length) {
				count += 1;
				typed = count;
				wait(type_delay, typeNext);
				return;
			}
			wait(compile_delay, () => {
				compiled = true;
				wait(render_delay, () => {
					rendered = true;
					wait(hold_delay, restart);
				});
			});
		};

		restart();
		return () => clearTimeout(timer);
	});
</script>

<div bind:this={root} class="hero-computer" style:aspect-ratio="{viewWidth} / {viewHeight}">
	<svg
		viewBox="{minX} {minY} {viewWidth} {viewHeight}"
		role="img"
		aria-label="A retro computer typing &lt;kit:btn&gt;Hello&lt;/kit:btn&gt;, next to the Lapikit mascot"
	>
		<g class="plate">
			<polygon class="face-top" points={plateFaces.top} />
			<polygon class="face-front" points={plateFaces.front} />
			<polygon class="face-side" points={plateFaces.side} />
		</g>

		<g class="body">
			<polygon class="face-top" points={bodyFaces.top} />
			<polygon class="face-front" points={bodyFaces.front} />
			<polygon class="face-side" points={bodyFaces.side} />

			{#each topVents as [[x1, y1], [x2, y2]], index (index)}
				<line class="detail" {x1} {y1} {x2} {y2} />
			{/each}
			{#each sideVents as [[x1, y1], [x2, y2]], index (index)}
				<line class="detail" {x1} {y1} {x2} {y2} />
			{/each}
			{#each frontVents as [[x1, y1], [x2, y2]], index (index)}
				<line class="detail" {x1} {y1} {x2} {y2} />
			{/each}

			<polygon class="bezel" points={bezelShape} />
			<polygon class="screen" points={screenShape} />
			<polygon class="slot" points={floppySlot} />
			<polygon class="light" points={powerLight} />

			<g class="screen-content" transform={screenTransform}>
				<text class="screen-code" x="6" y="14">
					<tspan class="screen-prompt">{prompt}</tspan>{code.slice(0, typed)}<tspan
						class="screen-cursor"
						class:is-blinking={typed === code.length}>▌</tspan
					>
				</text>
				{#if compiled}
					<text class="screen-muted" x="6" y="27">✓ compiled by Lili</text>
				{/if}
				{#if rendered}
					<g class="screen-btn">
						<rect x="6" y="37" width="40" height="16" rx="4" />
						<text x="26" y="47.4" text-anchor="middle">Hello</text>
					</g>
				{/if}
				<rect class="screen-glare" x="0" y="0" width={screenWidth} height="4" />
			</g>
		</g>

		<path class="cable" d={cable} />

		<g class="keyboard">
			<polygon class="face-top" points={keyboardFaces.top} />
			<polygon class="face-front" points={keyboardFaces.front} />
			<polygon class="face-side" points={keyboardFaces.side} />
			{#each keys as points, index (index)}
				<polygon class="key" {points} />
			{/each}
		</g>
	</svg>

	<div class="hero-computer-mascot" style={mascotStyle}>
		<enhanced:img src={Mascot} alt="" sizes="120px" />
	</div>
</div>

<style lang="scss">
	.hero-computer {
		--computer-line: color-mix(in oklab, var(--kit-color-text) 55%, transparent);
		--computer-detail: color-mix(in oklab, var(--kit-color-text) 28%, transparent);
		--computer-top: var(--kit-color-surface);
		--computer-front: var(--kit-color-surface-1);
		--computer-side: var(--kit-color-surface-2);
		--computer-screen: color-mix(in oklab, var(--kit-color-text) 7%, var(--kit-color-surface));

		position: relative;
		width: 100%;

		svg {
			display: block;
			width: 100%;
			height: 100%;
			overflow: visible;
		}

		polygon,
		path,
		line {
			stroke: var(--computer-line);
			stroke-width: 0.9;
			stroke-linejoin: round;
			stroke-linecap: round;
		}
	}

	.face-top {
		fill: var(--computer-top);
	}

	.face-front {
		fill: var(--computer-front);
	}

	.face-side {
		fill: var(--computer-side);
	}

	.plate .face-top {
		fill: color-mix(in oklab, var(--kit-color-surface-1), var(--kit-color-surface) 40%);
	}

	line.detail {
		stroke: var(--computer-detail);
	}

	.bezel {
		fill: var(--computer-top);
	}

	.screen {
		fill: var(--computer-screen);
	}

	.slot {
		fill: var(--computer-side);
	}

	.light {
		fill: var(--kit-color-success);
		stroke: none;
	}

	.cable {
		fill: none;
	}

	.key {
		fill: var(--computer-top);
		stroke: var(--computer-detail);
	}

	.screen-content text {
		font-family: var(--font-mono);
		font-size: 7px;
		fill: var(--kit-color-text);
	}

	.screen-content .screen-prompt,
	.screen-content .screen-muted {
		fill: var(--kit-color-text-muted);
	}

	.screen-cursor {
		fill: var(--kit-color-accent);

		&.is-blinking {
			animation: computer-blink 1s steps(1) infinite;
		}
	}

	.screen-btn {
		animation: computer-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);

		rect {
			fill: var(--kit-color-accent);
		}

		text {
			fill: var(--kit-color-on-accent);
			font-family: var(--kit-font);
			font-weight: 600;
		}
	}

	.screen-glare {
		fill: color-mix(in oklab, var(--kit-color-surface) 45%, transparent);
	}

	.hero-computer-mascot {
		position: absolute;

		:global(img) {
			display: block;
			width: 100%;
			height: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.screen-cursor.is-blinking,
		.screen-btn {
			animation: none;
		}
	}

	@keyframes computer-blink {
		50% {
			opacity: 0;
		}
	}

	@keyframes computer-pop {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
	}
</style>
