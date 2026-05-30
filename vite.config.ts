import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

// legacy
import { lapikit } from 'lapikit/vite';

export default defineConfig(({ command }) => ({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		lapikit({ config: 'src/plugins/lapikit.ts' }), //legacy
		...(command === 'serve' ? [devtoolsJson()] : [])
	]
}));
