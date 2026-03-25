import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
	plugins: [tailwindcss(), sveltekit(), ...(command === 'serve' ? [devtoolsJson()] : [])]
}));
