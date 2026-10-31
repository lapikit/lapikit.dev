import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvexOptions } from './mdsvex.config.js';
import { lapikitPreprocess } from 'lapikit/preprocess';

const keyboardWidgetWarnings = [
	'a11y_no_noninteractive_tabindex',
	'a11y_no_noninteractive_element_interactions'
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		warningFilter: (warning) =>
			!(
				warning.filename?.endsWith('lapinosaure-game.svelte') &&
				keyboardWidgetWarnings.includes(warning.code)
			)
	},
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		// tested on PageSpeed (2026-10-01): 32768 inlines every stylesheet but doubles TBT
		// (130 -> 270/320 ms) and drops the scores to 86 mobile / 88 desktop. Keep 10240
		inlineStyleThreshold: 10240,
		alias: {
			$examples: 'src/content/examples'
		}
	},
	preprocess: [mdsvex(mdsvexOptions), lapikitPreprocess({ plugins: ['repl'] }), vitePreprocess()],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
