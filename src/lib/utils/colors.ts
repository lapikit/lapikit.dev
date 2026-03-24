import type { ColorFormat, ColorPalette, OklabColor, OklchColor, RgbColor } from '$lib/@types';

function clamp01(value: number) {
	return Math.min(1, Math.max(0, value));
}

function channelToSrgb(value: number) {
	const normalized = clamp01(value);

	if (normalized <= 0.0031308) {
		return normalized * 12.92;
	}

	return 1.055 * normalized ** (1 / 2.4) - 0.055;
}

function channelToLinear(value: number) {
	const normalized = value / 255;

	if (normalized <= 0.04045) {
		return normalized / 12.92;
	}

	return ((normalized + 0.055) / 1.055) ** 2.4;
}

export function parseOklch(str: string) {
	const match = str.match(/oklch\(\s*([\d.]+)(%)?\s+([\d.]+)\s+([\d.]+)\s*\)/i);

	if (!match) return null;

	const lightness = Number(match[1]);

	return {
		l: match[2] ? lightness / 100 : lightness,
		c: Number(match[3]),
		h: Number(match[4])
	};
}

export function oklchToOklab({ l, c, h }: OklchColor): OklabColor {
	const hr = (h * Math.PI) / 180;

	return {
		L: l,
		a: c * Math.cos(hr),
		b: c * Math.sin(hr)
	};
}

export function oklabToLinearSrgb({ L, a, b }: OklabColor) {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ ** 3;
	const m = m_ ** 3;
	const s = s_ ** 3;

	return {
		r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
	};
}

export function oklchToRgb(oklch: OklchColor): RgbColor {
	const linearRgb = oklabToLinearSrgb(oklchToOklab(oklch));

	return {
		r: Math.round(channelToSrgb(linearRgb.r) * 255),
		g: Math.round(channelToSrgb(linearRgb.g) * 255),
		b: Math.round(channelToSrgb(linearRgb.b) * 255)
	};
}

export function rgbToOklch({ r, g, b }: RgbColor): OklchColor {
	const red = channelToLinear(r);
	const green = channelToLinear(g);
	const blue = channelToLinear(b);

	const l = 0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue;
	const m = 0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue;
	const s = 0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue;

	const lRoot = Math.cbrt(l);
	const mRoot = Math.cbrt(m);
	const sRoot = Math.cbrt(s);

	const L = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
	const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
	const bChannel = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

	const c = Math.sqrt(a ** 2 + bChannel ** 2);
	let h = (Math.atan2(bChannel, a) * 180) / Math.PI;

	if (h < 0) {
		h += 360;
	}

	return {
		l: L,
		c,
		h
	};
}

export function rgbToHex({ r, g, b }: RgbColor) {
	const toHex = (value: number) => value.toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RgbColor) {
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const lightness = (max + min) / 2;
	const delta = max - min;

	if (delta === 0) {
		return {
			h: 0,
			s: 0,
			l: lightness
		};
	}

	const saturation =
		lightness === 0 || lightness === 1 ? 0 : (max - lightness) / Math.min(lightness, 1 - lightness);

	let hue = 0;

	switch (max) {
		case red:
			hue = ((green - blue) / delta) % 6;
			break;
		case green:
			hue = (blue - red) / delta + 2;
			break;
		default:
			hue = (red - green) / delta + 4;
	}

	hue *= 60;

	if (hue < 0) {
		hue += 360;
	}

	return {
		h: hue,
		s: saturation,
		l: lightness
	};
}

export function formatColor(color: RgbColor, format: ColorFormat) {
	switch (format) {
		case 'hex':
			return rgbToHex(color);
		case 'rgb':
			return `rgb(${color.r} ${color.g} ${color.b})`;
		case 'hsl': {
			const hsl = rgbToHsl(color);
			return `hsl(${hsl.h.toFixed(1)} ${Number((hsl.s * 100).toFixed(1))}% ${Number((hsl.l * 100).toFixed(1))}%)`;
		}
		case 'oklch':
		default: {
			const oklch = rgbToOklch(color);
			return `oklch(${Number((oklch.l * 100).toFixed(1))}% ${Number(oklch.c.toFixed(3))} ${Number(oklch.h.toFixed(3))})`;
		}
	}
}

export function getRelativeLuminanceFromOklch(oklchString: string) {
	const parsed = parseOklch(oklchString);
	if (!parsed) return null;

	const oklab = oklchToOklab(parsed);
	const rgb = oklabToLinearSrgb(oklab);

	const r = clamp01(rgb.r);
	const g = clamp01(rgb.g);
	const b = clamp01(rgb.b);

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getRelativeLuminanceFromRgb({ r, g, b }: RgbColor) {
	const red = channelToLinear(r);
	const green = channelToLinear(g);
	const blue = channelToLinear(b);

	return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastRatioOnWhite(oklchString: string) {
	const luminance = getRelativeLuminanceFromOklch(oklchString);
	if (luminance == null) return 0;

	return Number((1.05 / (luminance + 0.05)).toFixed(2));
}

export function getContrastRatioOnWhiteFromRgb(color: RgbColor) {
	const luminance = getRelativeLuminanceFromRgb(color);
	return Number((1.05 / (luminance + 0.05)).toFixed(2));
}

export function getContrastLevel(ratio: number) {
	if (ratio >= 7) return 'AAA';
	if (ratio >= 4.5) return 'AA';
	if (ratio >= 3) return 'AA Large';
	return 'Low contrast';
}

export function findColorName(
	selectedColor: string | undefined,
	colors: ColorPalette
): string | null {
	if (!selectedColor) return null;

	for (const [colorName, scale] of Object.entries(colors)) {
		for (const [shade, value] of Object.entries(scale)) {
			if (value === selectedColor) {
				return `${colorName}-${shade}`;
			}
		}
	}

	return null;
}

export function findColorNameByRgb(
	selectedColor: RgbColor | null,
	colors: ColorPalette
): string | null {
	if (!selectedColor) return null;

	for (const [colorName, scale] of Object.entries(colors)) {
		for (const [shade, value] of Object.entries(scale)) {
			const parsed = parseOklch(value);
			if (!parsed) continue;

			const candidate = oklchToRgb(parsed);
			if (
				candidate.r === selectedColor.r &&
				candidate.g === selectedColor.g &&
				candidate.b === selectedColor.b
			) {
				return `${colorName}-${shade}`;
			}
		}
	}

	return null;
}

export function getTokenInitialsColor(value: string) {
	const rgb = cssColorToRgb(value);
	if (!rgb) return '#111';

	const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	return brightness < 140 ? '#fff' : '#111';
}

export function detectColorFormat(value: string): ColorFormat {
	const normalizedValue = value.trim().toLowerCase();

	if (normalizedValue.startsWith('oklch(')) return 'oklch';
	if (normalizedValue.startsWith('#')) return 'hex';
	if (normalizedValue.startsWith('rgb(') || normalizedValue.startsWith('rgba(')) return 'rgb';
	if (normalizedValue.startsWith('hsl(') || normalizedValue.startsWith('hsla(')) return 'hsl';

	return 'oklch';
}

export function cssColorToRgb(value: string): RgbColor | null {
	if (!value) return null;

	const parsedOklch = parseOklch(value);
	if (parsedOklch) {
		return oklchToRgb(parsedOklch);
	}

	if (typeof window === 'undefined' || !CSS.supports('color', value)) return null;

	const probe = document.createElement('div');
	probe.style.color = value;
	document.body.appendChild(probe);

	const computedColor = getComputedStyle(probe).color;
	probe.remove();

	const match = computedColor.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/i);
	if (!match) return null;

	return {
		r: Math.round(Number(match[1])),
		g: Math.round(Number(match[2])),
		b: Math.round(Number(match[3]))
	};
}
