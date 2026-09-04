<script lang="ts">
	// types
	interface Props {
		/** Taille d'un pixel du damier, en CSS px. */
		pixelSize?: number;
		/** Couleur des pixels, format "r,g,b" (0-255) ou "#rrggbb". */
		colorRGB?: string;
		/** Seuil de coupure du bruit : plus haut = motif plus clairsemé. 0 → 1 */
		threshold?: number;
		/** Zoom du bruit : plus petit = blobs plus larges. */
		noiseScale?: number;
		/** Vitesse d'évolution du bruit (multiplié par le temps en ms). */
		evolveSpeed?: number;
		/** Fondu sur les bords du canvas, en fraction de la largeur/hauteur. 0 = désactivé. */
		edgeFade?: number;
		/** Impact dégradé au clic. */
		ripple?: boolean;
		/** Vitesse d'étalement de l'impact, en px/seconde. */
		rippleSpeed?: number;
		/** Opacité de l'impact en son centre, 0 → 1. À 1 le coeur devient un aplat. */
		rippleStrength?: number;
		class?: string;
	}

	let {
		pixelSize = 6,
		colorRGB = '42,109,244',
		threshold = 0.05,
		noiseScale = 0.009,
		evolveSpeed = 0.00035,
		edgeFade = 0.3,
		ripple = true,
		rippleSpeed = 260,
		rippleStrength = 0.9,
		class: className = ''
	}: Props = $props();

	// constants
	const MAX_RIPPLES = 10;
	const RIPPLE_LIFE = 1.2; // secondes

	const VERTEX_SHADER = `#version 300 es
	void main() {
		// triangle plein écran généré sans buffer (gl_VertexID : 0, 1, 2)
		vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
		gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
	}`;

	const FRAGMENT_SHADER = `#version 300 es
	precision highp float;

	out vec4 fragColor;

	uniform vec2 uResolution;
	uniform float uTime;
	uniform float uPixelSize;
	uniform vec3 uColor;
	uniform float uThreshold;
	uniform float uNoiseScale;
	uniform float uEvolveSpeed;
	uniform float uEdgeFade;
	uniform float uRippleSpeed;
	uniform float uRippleStrength;
	uniform vec3 uRipples[${MAX_RIPPLES}];

	// --- simplex noise 3D (Ashima Arts, MIT) ---------------------------------
	vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
	vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
	vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
	vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

	float snoise(vec3 v) {
		const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
		const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

		vec3 i = floor(v + dot(v, C.yyy));
		vec3 x0 = v - i + dot(i, C.xxx);

		vec3 g = step(x0.yzx, x0.xyz);
		vec3 l = 1.0 - g;
		vec3 i1 = min(g.xyz, l.zxy);
		vec3 i2 = max(g.xyz, l.zxy);

		vec3 x1 = x0 - i1 + C.xxx;
		vec3 x2 = x0 - i2 + C.yyy;
		vec3 x3 = x0 - D.yyy;

		i = mod289(i);
		vec4 p = permute(permute(permute(
			i.z + vec4(0.0, i1.z, i2.z, 1.0))
			+ i.y + vec4(0.0, i1.y, i2.y, 1.0))
			+ i.x + vec4(0.0, i1.x, i2.x, 1.0));

		float n_ = 0.142857142857;
		vec3 ns = n_ * D.wyz - D.xzx;

		vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
		vec4 x_ = floor(j * ns.z);
		vec4 y_ = floor(j - 7.0 * x_);

		vec4 x = x_ * ns.x + ns.yyyy;
		vec4 y = y_ * ns.x + ns.yyyy;
		vec4 h = 1.0 - abs(x) - abs(y);

		vec4 b0 = vec4(x.xy, y.xy);
		vec4 b1 = vec4(x.zw, y.zw);

		vec4 s0 = floor(b0) * 2.0 + 1.0;
		vec4 s1 = floor(b1) * 2.0 + 1.0;
		vec4 sh = -step(h, vec4(0.0));

		vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
		vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

		vec3 p0 = vec3(a0.xy, h.x);
		vec3 p1 = vec3(a0.zw, h.y);
		vec3 p2 = vec3(a1.xy, h.z);
		vec3 p3 = vec3(a1.zw, h.w);

		vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
		p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

		vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
		m = m * m;
		return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
	}

	// bruit fractal : 3 octaves suffisent pour ce rendu
	float fbm(vec3 p) {
		float value = 0.0;
		float amplitude = 0.5;
		for (int i = 0; i < 3; i++) {
			value += amplitude * snoise(p);
			p *= 2.0;
			amplitude *= 0.5;
		}
		return value;
	}

	// --- tramage ordonné 4x4 (Bayer) -----------------------------------------
	const float BAYER[16] = float[16](
		0.0,  8.0,  2.0, 10.0,
		12.0, 4.0, 14.0,  6.0,
		3.0, 11.0,  1.0,  9.0,
		15.0, 7.0, 13.0,  5.0
	);

	float dither(vec2 cell) {
		int x = int(mod(cell.x, 4.0));
		int y = int(mod(cell.y, 4.0));
		return (BAYER[y * 4 + x] + 0.5) / 16.0;
	}

	void main() {
		vec2 frag = gl_FragCoord.xy;

		// on raisonne par cellule, pas par pixel écran : c'est ça qui pixelise
		vec2 cell = floor(frag / uPixelSize);
		vec2 cellCenter = (cell + 0.5) * uPixelSize;

		float n = fbm(vec3(cellCenter * uNoiseScale, uTime * uEvolveSpeed));
		n = n * 0.5 + 0.5;

		// impact au clic : un disque dégradé qui s'étale et se dilue
		float life = ${RIPPLE_LIFE.toFixed(1)};
		float impact = 0.0;
		for (int i = 0; i < ${MAX_RIPPLES}; i++) {
			vec3 r = uRipples[i];
			float age = (uTime - r.z) * 0.001;
			if (r.z < 0.0 || age < 0.0 || age > life) continue;

			float d = distance(cellCenter, r.xy);
			float radius = 30.0 + age * uRippleSpeed;                    // le disque s'étale
			float core = 1.0 - smoothstep(radius * 0.3, radius, d);      // coeur plein, bord dégradé
			float fade = 1.0 - smoothstep(0.4, 1.0, age / life);         // tient, puis se dilue
			impact = max(impact, core * fade * uRippleStrength);
		}

		// remise à l'échelle par le seuil : sous le seuil, plus rien ne s'allume
		float v = clamp((n - uThreshold) / max(1.0 - uThreshold, 0.001), 0.0, 1.0);

		// l'impact tire vers le plein au lieu de s'ajouter au bruit : le dégradé
		// reste lisible quelle que soit la valeur du bruit dessous
		v = mix(v, 1.0, clamp(impact, 0.0, 1.0));

		if (uEdgeFade > 0.0) {
			vec2 uv = frag / uResolution;
			v *= smoothstep(0.0, uEdgeFade, uv.x) * smoothstep(0.0, uEdgeFade, 1.0 - uv.x)
			   * smoothstep(0.0, uEdgeFade, uv.y) * smoothstep(0.0, uEdgeFade, 1.0 - uv.y);
		}

		// le tramage décide *si* la cellule s'allume, v décide de sa *taille*
		float on = step(dither(cell), v);
		float size = mix(0.3, 1.0, v) * on;
		if (size <= 0.0) discard;

		// carré centré dans la cellule
		vec2 local = fract(frag / uPixelSize) - 0.5;
		if (max(abs(local.x), abs(local.y)) > size * 0.5) discard;

		float intensity = mix(0.35, 1.0, v);
		fragColor = vec4(uColor, intensity);
	}`;

	// states
	let canvas = $state<HTMLCanvasElement>();

	/** Accepte "42,109,244" ou "#2a6df4". */
	const parseColor = (value: string): [number, number, number] => {
		const hex = value.trim().match(/^#?([\da-f]{6})$/i);
		if (hex) {
			const int = parseInt(hex[1], 16);
			return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
		}
		const parts = value.split(',').map((n) => Number(n.trim()) / 255);
		return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
	};

	const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
		const shader = gl.createShader(type)!;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('[pixel-blast]', gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	};

	// L'effet ne lit que `canvas` : les props sont lues dans la boucle de rendu,
	// donc les changer ne recrée jamais le contexte WebGL.
	$effect(() => {
		const el = canvas;
		if (!el) return;

		const gl = el.getContext('webgl2', {
			alpha: true,
			premultipliedAlpha: false,
			antialias: false,
			powerPreference: 'low-power'
		});
		// pas de WebGL2 (vieux Safari, GPU bloqué) : on laisse le fond nu
		if (!gl) return;

		const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
		const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
		if (!vs || !fs) return;

		const program = gl.createProgram()!;
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('[pixel-blast]', gl.getProgramInfoLog(program));
			return;
		}
		gl.useProgram(program);
		gl.bindVertexArray(gl.createVertexArray()); // VAO vide, requis par le pilote

		const u = {
			resolution: gl.getUniformLocation(program, 'uResolution'),
			time: gl.getUniformLocation(program, 'uTime'),
			pixelSize: gl.getUniformLocation(program, 'uPixelSize'),
			color: gl.getUniformLocation(program, 'uColor'),
			threshold: gl.getUniformLocation(program, 'uThreshold'),
			noiseScale: gl.getUniformLocation(program, 'uNoiseScale'),
			evolveSpeed: gl.getUniformLocation(program, 'uEvolveSpeed'),
			edgeFade: gl.getUniformLocation(program, 'uEdgeFade'),
			rippleSpeed: gl.getUniformLocation(program, 'uRippleSpeed'),
			rippleStrength: gl.getUniformLocation(program, 'uRippleStrength'),
			ripples: gl.getUniformLocation(program, 'uRipples')
		};

		let dpr = 1;
		const ripples = new Float32Array(MAX_RIPPLES * 3).fill(-1);
		let rippleIndex = 0;

		const resize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rect = el.getBoundingClientRect();
			const w = Math.max(1, Math.round(rect.width * dpr));
			const h = Math.max(1, Math.round(rect.height * dpr));
			if (el.width === w && el.height === h) return;
			el.width = w;
			el.height = h;
			gl.viewport(0, 0, w, h);
		};

		const draw = (time: number) => {
			gl.uniform2f(u.resolution, el.width, el.height);
			gl.uniform1f(u.time, time);
			gl.uniform1f(u.pixelSize, Math.max(1, pixelSize * dpr));
			gl.uniform3fv(u.color, parseColor(colorRGB));
			gl.uniform1f(u.threshold, threshold);
			gl.uniform1f(u.noiseScale, noiseScale / dpr);
			gl.uniform1f(u.evolveSpeed, evolveSpeed);
			gl.uniform1f(u.edgeFade, edgeFade);
			gl.uniform1f(u.rippleSpeed, rippleSpeed * dpr);
			gl.uniform1f(u.rippleStrength, rippleStrength);
			gl.uniform3fv(u.ripples, ripples);

			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frame = 0;
		let visible = true;

		const loop = (time: number) => {
			frame = requestAnimationFrame(loop);
			draw(time);
		};

		const start = () => {
			if (frame) return;
			if (reduced.matches) {
				draw(0); // une seule image fixe
				return;
			}
			frame = requestAnimationFrame(loop);
		};

		const stop = () => {
			cancelAnimationFrame(frame);
			frame = 0;
		};

		const addRipple = (event: PointerEvent) => {
			if (!ripple) return;
			const rect = el.getBoundingClientRect();
			const offset = rippleIndex * 3;
			ripples[offset] = (event.clientX - rect.left) * dpr;
			// gl_FragCoord a son origine en bas à gauche
			ripples[offset + 1] = (rect.height - (event.clientY - rect.top)) * dpr;
			ripples[offset + 2] = performance.now();
			rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
			if (reduced.matches) draw(performance.now());
		};

		const observer = new ResizeObserver(() => {
			resize();
			if (reduced.matches) draw(0);
		});
		observer.observe(el);

		// on ne fait pas tourner le GPU quand le hero est hors écran ou l'onglet caché
		const sync = () => {
			if (visible && !document.hidden) start();
			else stop();
		};

		const intersection = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			sync();
		});
		intersection.observe(el);

		document.addEventListener('visibilitychange', sync);
		el.addEventListener('pointerdown', addRipple);
		reduced.addEventListener('change', sync);

		resize();
		start();

		return () => {
			stop();
			observer.disconnect();
			intersection.disconnect();
			document.removeEventListener('visibilitychange', sync);
			el.removeEventListener('pointerdown', addRipple);
			reduced.removeEventListener('change', sync);
			gl.deleteProgram(program);
			gl.deleteShader(vs);
			gl.deleteShader(fs);
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		};
	});
</script>

<canvas bind:this={canvas} class={className}></canvas>

<style lang="scss">
	canvas {
		display: block;
		width: 100%;
		height: 100%;
		touch-action: none;
	}
</style>
