import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
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
		alias: {
			$components: 'src/components',
			$examples: 'src/content/examples'
		}
	},
	preprocess: [mdsvex(mdsvexOptions), lapikitPreprocess({ plugins: ['repl'] })],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
