export type OklchColor = {
	l: number;
	c: number;
	h: number;
};

export type OklabColor = {
	L: number;
	a: number;
	b: number;
};

export type RgbColor = {
	r: number;
	g: number;
	b: number;
};

export type ColorFormat = 'oklch' | 'hex' | 'rgb' | 'hsl';

export type ColorScale = Record<string, string>;
export type ColorPalette = Record<string, ColorScale>;
export type ColorPaletteName = string;
