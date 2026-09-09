<script lang="ts">
	// modules
	import ReplLayoutSvelte from './view/repl-layout-svelte.svelte';
	import ReplPageSvelte from './view/repl-page-svelte.svelte';
	import ReplViteConfig from './view/repl-vite-config.svelte';
	import ReplEslintJs from './view/repl-eslint-js.svelte';
	import ReplHeaderSvelte from './view/repl-header-svelte.svelte';
	import ReplLayoutCss from './view/repl-layout-css.svelte';

	let { view, ...rest } = $props();

	// states
	const sizeList = ['xs', 'sm', 'md', 'lg', 'xl'];
	const variantList = ['filled', 'outline', 'text'];
	const densityList = ['none', 'compact', 'default', 'comfortable'];
	const roundedList = ['0', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
	const elevationList = ['0', '1', '2', '3', '4', '5'];
	const backgroundList = ['surface-2', 'accent', 'info', 'success', 'warning', 'error'];
	const colorList = [
		'text',
		'on-accent',
		'on-info',
		'on-success',
		'on-warning',
		'on-error',
		...backgroundList
	];
</script>

<div class="vs-ide">
	{#if view === '+page.svelte'}
		<ReplPageSvelte />
	{:else if view === '+layout.svelte'}
		<ReplLayoutSvelte />
	{:else if view === 'layout.css'}
		<ReplLayoutCss />
	{:else if view === 'Header.svelte'}
		<ReplHeaderSvelte {sizeList} {variantList} {elevationList} {densityList} {...rest} />
	{:else if view === 'eslint.config.js'}
		<ReplEslintJs />
	{:else if view === 'vite.config.ts'}
		<ReplViteConfig />
	{/if}
</div>
