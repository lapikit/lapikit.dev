import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

// Regenerates every icon derived from the logo. Run `bun run icons` after replacing the SVG.
// Needs ImageMagick (`magick`) with librsvg, only on the machine where you run it.
const SOURCE = 'src/lib/assets/images/lapikit.svg';
const FAVICON_SVG = 'static/favicon.svg';

// The square favicon keeps a small margin around the logo (8 units on 193, like the original)
const MARGIN_RATIO = 8 / 193;

// For each PNG: canvas size, logo height relative to the canvas, background
const PNG_ICONS = [
	{ out: 'static/favicon-96x96.png', size: 96, logo: 0.96, background: 'none' },
	{ out: 'static/icon-192.png', size: 192, logo: 0.92, background: 'none' },
	{ out: 'static/icon-512.png', size: 512, logo: 0.92, background: 'none' },
	// iOS does not support transparency: white background, more padding
	{ out: 'static/apple-touch-icon.png', size: 180, logo: 0.75, background: 'white' },
	// Android crops maskable icons to a circle: logo stays inside the 80% safe zone
	{ out: 'static/icon-maskable-512.png', size: 512, logo: 0.64, background: 'white' }
];

function magick(...args: string[]) {
	execFileSync('magick', args, { stdio: 'inherit' });
}

// 1. Square favicon.svg: same drawing, square and centered viewBox
const svg = readFileSync(SOURCE, 'utf8');
const viewBox = svg
	.match(/viewBox="([^"]+)"/)?.[1]
	.split(/[\s,]+/)
	.map(Number);
if (!viewBox || viewBox.length !== 4) throw new Error(`No viewBox found in ${SOURCE}`);

const [x, y, width, height] = viewBox;
const side = Math.max(width, height) * (1 + MARGIN_RATIO);
const squareViewBox = [x - (side - width) / 2, y - (side - height) / 2, side, side]
	.map((value) => +value.toFixed(2))
	.join(' ');

writeFileSync(
	FAVICON_SVG,
	svg.replace(/<svg[^>]*>/, (tag) =>
		tag
			.replace(/\s(width|height)="[^"]*"/g, '')
			.replace(/viewBox="[^"]*"/, `viewBox="${squareViewBox}"`)
	)
);
console.log(`✓ ${FAVICON_SVG}`);

// 2. PNG icons (rendered at high density, then downscaled for clean edges)
for (const { out, size, logo, background } of PNG_ICONS) {
	const logoHeight = Math.round(size * logo);
	magick(
		...['-background', 'none', '-density', '1200', SOURCE],
		...['-resize', `x${logoHeight}`],
		...['-background', background, '-gravity', 'center', '-extent', `${size}x${size}`],
		...(background === 'none' ? [] : ['-alpha', 'remove', '-alpha', 'off']),
		...['-depth', '8'],
		out
	);
	console.log(`✓ ${out}`);
}

// 3. favicon.ico (16, 32, 48) from the square favicon
magick(
	...['-background', 'none', '-density', '1200', FAVICON_SVG],
	...['-define', 'icon:auto-resize=48,32,16'],
	'static/favicon.ico'
);
console.log('✓ static/favicon.ico');

// 4. Raster logo used by enhanced-img in the navbars and footer (2x the SVG size)
magick(
	...['-background', 'none', '-density', '1200', SOURCE],
	...['-resize', `${width * 2}x`],
	...['-quality', '90'],
	'src/lib/assets/images/lapikit.webp'
);
console.log('✓ src/lib/assets/images/lapikit.webp');

console.log(
	'\nStill to update by hand: lapikit-inline.svg, lapikit-footer.svg, static/og/default.png'
);
