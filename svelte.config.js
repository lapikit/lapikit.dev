import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvexOptions } from './mdsvex.config.js';
import { lapikitPreprocess } from 'lapikit/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		// high on purpose: the root layout and homepage CSS (~30 KB each) are then inlined too,
		// leaving no render-blocking stylesheet. Mobile FCP -330 ms for ~+10 KB of brotli HTML
		inlineStyleThreshold: 32768,
		alias: {
			$examples: 'src/content/examples'
		}
	},
	preprocess: [mdsvex(mdsvexOptions), lapikitPreprocess({ plugins: ['repl'] }), vitePreprocess()],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
