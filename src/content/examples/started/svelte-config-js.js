import adapter from '@sveltejs/adapter-node';
import { lapikitPreprocess } from 'lapikit/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: lapikitPreprocess(),
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
