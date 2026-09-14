<script lang="ts">
	// modules
	import ReplLayoutSvelte from './view/repl-layout-svelte.svelte';
	import ReplPageSvelte from './view/repl-page-svelte.svelte';
	import ReplViteConfig from './view/repl-vite-config.svelte';
	import ReplEslintJs from './view/repl-eslint-js.svelte';
	import ReplHeaderSvelte from './view/repl-header-svelte.svelte';
	import ReplLayoutCss from './view/repl-layout-css.svelte';

	let { view } = $props();
</script>

<div class="vs-ide text-code">
	{#if view === '+page.svelte'}
		<ReplPageSvelte />
	{:else if view === '+layout.svelte'}
		<ReplLayoutSvelte />
	{:else if view === 'layout.css'}
		<ReplLayoutCss />
	{:else if view === 'Header.svelte'}
		<ReplHeaderSvelte />
	{:else if view === 'eslint.config.js'}
		<ReplEslintJs />
	{:else if view === 'vite.config.ts'}
		<ReplViteConfig />
	{/if}
</div>
