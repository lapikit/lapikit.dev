/**
 * Images transformed at build time by vite-imagetools (bundled with enhanced-img).
 * The import returns the URL of the generated file.
 * @url https://github.com/JonasKruckenberg/imagetools
 */

// converted only, e.g. `icon.png?format=webp`
declare module '*?format=webp' {
	const src: string;
	export default src;
}

// resized and converted, e.g. `logo.webp?h=124&format=webp`
declare module '*&format=webp' {
	const src: string;
	export default src;
}
