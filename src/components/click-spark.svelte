<script lang="ts">
	type Easing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

	interface ClickSparkProps {
		sparkColor?: string;
		sparkSize?: number;
		sparkRadius?: number;
		sparkCount?: number;
		duration?: number;
		easing?: Easing;
		extraScale?: number;
		zIndex?: number;
	}

	let {
		sparkColor = '#fff',
		sparkSize = 10,
		sparkRadius = 15,
		sparkCount = 8,
		duration = 400,
		easing = 'ease-out',
		extraScale = 1.0,
		zIndex = 9999
	}: ClickSparkProps = $props();

	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	let width = 0;
	let height = 0;
	let dpr = 1;
	let rafId = 0;

	type Spark = { x: number; y: number; angle: number; start: number };
	let sparks: Spark[] = [];

	function easeValue(p: number): number {
		switch (easing) {
			case 'linear':
				return p;
			case 'ease-in':
				return p * p;
			case 'ease-in-out':
				return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
			case 'ease-out':
			default:
				return 1 - Math.pow(1 - p, 3);
		}
	}

	function resize() {
		if (!canvasEl) return;
		width = window.innerWidth;
		height = window.innerHeight;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvasEl.width = Math.max(1, Math.floor(width * dpr));
		canvasEl.height = Math.max(1, Math.floor(height * dpr));
		ctx = canvasEl.getContext('2d');
		ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function spawnSparks(x: number, y: number) {
		const now = performance.now();
		for (let i = 0; i < sparkCount; i++) {
			sparks.push({ x, y, angle: (i * 2 * Math.PI) / sparkCount, start: now });
		}
	}

	function handlePointerDown(e: PointerEvent) {
		spawnSparks(e.clientX, e.clientY);
	}

	function frame(time: number) {
		if (ctx) {
			ctx.clearRect(0, 0, width, height);
			sparks = sparks.filter((s) => time - s.start < duration);

			for (const s of sparks) {
				const progress = (time - s.start) / duration;
				const eased = easeValue(Math.min(1, progress));

				const distance = eased * sparkRadius * extraScale;
				const length = sparkSize * (1 - eased) * extraScale;
				const alpha = 1 - progress;

				const x1 = s.x + Math.cos(s.angle) * distance;
				const y1 = s.y + Math.sin(s.angle) * distance;
				const x2 = s.x + Math.cos(s.angle) * (distance + length);
				const y2 = s.y + Math.sin(s.angle) * (distance + length);

				ctx.strokeStyle = sparkColor;
				ctx.globalAlpha = Math.max(0, alpha);
				ctx.lineWidth = 2;
				ctx.lineCap = 'round';
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		}
		rafId = requestAnimationFrame(frame);
	}

	$effect(() => {
		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('pointerdown', handlePointerDown, { capture: true });
		rafId = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
		};
	});
</script>

<canvas bind:this={canvasEl} class="click-spark-overlay" style:z-index={zIndex}></canvas>

<style>
	.click-spark-overlay {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
	}
</style>
