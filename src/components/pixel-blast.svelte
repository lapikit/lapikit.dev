<script lang="ts">
	interface PixelBlastProps {
		pixelSize?: number;
		colorRGB?: string;
		noiseScale?: number;
		octaves?: number;
		persistence?: number;
		lacunarity?: number;
		threshold?: number;
		evolveSpeed?: number;
		driftSpeedX?: number;
		driftSpeedY?: number;
		maxDotScale?: number;
		updateFps?: number;
		class?: string;
	}

	let {
		pixelSize = 7,
		colorRGB = '255,138,61',
		noiseScale = 0.009,
		octaves = 3,
		persistence = 0.55,
		lacunarity = 2.1,
		threshold = 0.52,
		evolveSpeed = 0.00004,
		driftSpeedX = 4,
		driftSpeedY = 0,
		maxDotScale = 1,
		updateFps = 20,
		class: className = ''
	}: PixelBlastProps = $props();

	let containerEl: HTMLDivElement;
	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	let width = 0;
	let height = 0;
	let dpr = 1;
	let cols = 0;
	let rows = 0;

	let rafId = 0;
	let reduceMotion = false;
	let resizeObserver: ResizeObserver | null = null;

	let t = 0;
	let offsetX = 0;
	let offsetY = 0;
	let lastFrameTime = 0;
	let lastUpdateTime = 0;
	let paused = false;

	let perm: Uint8Array;

	function buildPermutation() {
		const base = Array.from({ length: 256 }, (_, i) => i);
		for (let i = base.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[base[i], base[j]] = [base[j], base[i]];
		}
		perm = new Uint8Array(512);
		for (let i = 0; i < 512; i++) perm[i] = base[i & 255];
	}

	function fade(x: number) {
		return x * x * x * (x * (x * 6 - 15) + 10);
	}

	function lerp(a: number, b: number, w: number) {
		return a + w * (b - a);
	}

	function grad(hash: number, x: number, y: number, z: number) {
		const h = hash & 15;
		const u = h < 8 ? x : y;
		const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
		return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
	}

	function noise3D(x: number, y: number, z: number) {
		const X = Math.floor(x) & 255;
		const Y = Math.floor(y) & 255;
		const Z = Math.floor(z) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);
		z -= Math.floor(z);
		const u = fade(x);
		const v = fade(y);
		const w = fade(z);
		const A = perm[X] + Y;
		const AA = perm[A] + Z;
		const AB = perm[A + 1] + Z;
		const B = perm[X + 1] + Y;
		const BA = perm[B] + Z;
		const BB = perm[B + 1] + Z;

		return lerp(
			lerp(
				lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
				lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
				v
			),
			lerp(
				lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
				lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u),
				v
			),
			w
		);
	}

	function fbm(x: number, y: number, z: number) {
		let total = 0;
		let amplitude = 1;
		let frequency = 1;
		let maxValue = 0;
		for (let i = 0; i < octaves; i++) {
			total += noise3D(x * frequency, y * frequency, z) * amplitude;
			maxValue += amplitude;
			amplitude *= persistence;
			frequency *= lacunarity;
		}
		return total / maxValue;
	}

	function resize() {
		if (!containerEl || !canvasEl) return;
		const rect = containerEl.getBoundingClientRect();
		width = Math.max(1, rect.width);
		height = Math.max(1, rect.height);
		dpr = Math.min(window.devicePixelRatio || 1, 2);

		canvasEl.width = Math.max(1, Math.floor(width * dpr));
		canvasEl.height = Math.max(1, Math.floor(height * dpr));
		ctx = canvasEl.getContext('2d');
		ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

		cols = Math.ceil(width / pixelSize) + 1;
		rows = Math.ceil(height / pixelSize) + 1;

		render();
	}

	function render() {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = `rgb(${colorRGB})`;

		for (let gx = 0; gx < cols; gx++) {
			const nx = (gx * pixelSize + offsetX) * noiseScale;
			for (let gy = 0; gy < rows; gy++) {
				const ny = (gy * pixelSize + offsetY) * noiseScale;
				const raw = fbm(nx, ny, t);
				const v = (raw + 1) / 2;
				if (v < threshold) continue;

				const strength = Math.min(1, (v - threshold) / (1 - threshold));
				const eased = strength * strength * (3 - 2 * strength);
				const size = pixelSize * maxDotScale * (0.18 + 0.82 * eased);
				const alpha = 0.12 + 0.85 * eased;

				const cx = gx * pixelSize + pixelSize / 2;
				const cy = gy * pixelSize + pixelSize / 2;

				ctx.globalAlpha = alpha;
				ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
			}
		}
		ctx.globalAlpha = 1;
	}

	function frame(time: number) {
		if (paused) {
			rafId = requestAnimationFrame(frame);
			return;
		}
		if (!lastFrameTime) lastFrameTime = time;
		const dt = time - lastFrameTime;
		lastFrameTime = time;

		if (!reduceMotion) {
			t += dt * evolveSpeed;
			offsetX += (driftSpeedX * dt) / 1000;
			offsetY += (driftSpeedY * dt) / 1000;
		}

		const updateInterval = 1000 / updateFps;
		if (reduceMotion) {
			if (lastUpdateTime === 0) render();
		} else if (time - lastUpdateTime >= updateInterval) {
			lastUpdateTime = time;
			render();
		}

		rafId = requestAnimationFrame(frame);
	}

	function handleVisibility() {
		paused = document.hidden;
		if (!paused) lastFrameTime = 0;
	}

	$effect(() => {
		buildPermutation();
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		resizeObserver = new ResizeObserver(() => resize());
		resizeObserver.observe(containerEl);
		resize();

		document.addEventListener('visibilitychange', handleVisibility);
		rafId = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(rafId);
			resizeObserver?.disconnect();
			document.removeEventListener('visibilitychange', handleVisibility);
		};
	});
</script>

<div bind:this={containerEl} class="pixel-blast {className}">
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.pixel-blast {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.pixel-blast canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
