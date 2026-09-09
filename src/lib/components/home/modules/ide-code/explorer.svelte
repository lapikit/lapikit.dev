<script lang="ts">
	// assets
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import githubFolderIcon from '$lib/assets/icons/vscode/folder-github.svg?raw';
	import sveltekitFolderIcon from '$lib/assets/icons/vscode/folder-svelte.svg?raw';
	import vscodeFolderIcon from '$lib/assets/icons/vscode/folder-vscode.svg?raw';
	import nodemodulesFolderIcon from '$lib/assets/icons/vscode/folder-node.svg?raw';
	import srcFolderIcon from '$lib/assets/icons/vscode/folder-src.svg?raw';
	import libFolderIcon from '$lib/assets/icons/vscode/folder-lib.svg?raw';
	import routesFolderIcon from '$lib/assets/icons/vscode/folder-routes.svg?raw';
	import staticFolderIcon from '$lib/assets/icons/vscode/folder-resource.svg?raw';
	import testFolderIcon from '$lib/assets/icons/vscode/folder-test.svg?raw';
	import svelteIcon from '$lib/assets/icons/vscode/svelte.svg?raw';
	import cssIcon from '$lib/assets/icons/vscode/css.svg?raw';
	import typescriptdefIcon from '$lib/assets/icons/vscode/typescript-def.svg?raw';
	import htmlIcon from '$lib/assets/icons/vscode/html.svg?raw';
	import eslintIcon from '$lib/assets/icons/vscode/eslint.svg?raw';
	import packageIcon from '$lib/assets/icons/vscode/nodejs.svg?raw';
	import tsconfigIcon from '$lib/assets/icons/vscode/tsconfig.svg?raw';
	import viteIcon from '$lib/assets/icons/vscode/vite.svg?raw';

	let { view = $bindable() } = $props();

	const treemap = [
		{ indentation: 0, value: 'lapikit-svelte-project' },
		{ indentation: 1, value: '.github', type: 'folder', icon: githubFolderIcon },
		{
			indentation: 1,
			value: '.svelte-kit',
			disabled: true,
			type: 'folder',
			icon: sveltekitFolderIcon
		},
		{ indentation: 1, value: '.vscode', type: 'folder', icon: vscodeFolderIcon },
		{
			indentation: 1,
			value: 'node_modules',
			disabled: true,
			type: 'folder',
			icon: nodemodulesFolderIcon
		},
		{ indentation: 1, value: 'src', open: true, type: 'folder', icon: srcFolderIcon },
		{ indentation: 2, value: 'lib', open: true, type: 'folder', icon: libFolderIcon },
		{
			indentation: 3,
			value: 'Header.svelte',
			type: 'file',
			icon: svelteIcon,
			view: 'Header.svelte'
		},
		{ indentation: 2, value: 'routes', open: true, type: 'folder', icon: routesFolderIcon },
		{
			indentation: 3,
			value: '+layout.svelte',
			type: 'file',
			icon: svelteIcon,
			view: '+layout.svelte'
		},
		{
			indentation: 3,
			value: '+page.svelte',
			type: 'file',
			icon: svelteIcon,
			view: '+page.svelte'
		},
		{ indentation: 3, value: 'layout.css', type: 'file', icon: cssIcon, view: 'layout.css' },
		{ indentation: 2, value: 'app.d.ts', type: 'file', icon: typescriptdefIcon },
		{ indentation: 2, value: 'app.html', type: 'file', icon: htmlIcon },
		{ indentation: 1, value: 'static', type: 'folder', icon: staticFolderIcon },
		{ indentation: 1, value: 'tests', type: 'folder', icon: testFolderIcon },
		{
			indentation: 1,
			value: 'eslint.config.js',
			type: 'file',
			icon: eslintIcon,
			view: 'eslint.config.js'
		},
		{ indentation: 1, value: 'package.json', type: 'file', icon: packageIcon },
		{ indentation: 1, value: 'tsconfig.json', type: 'file', icon: tsconfigIcon },
		{
			indentation: 1,
			value: 'vite.config.ts',
			type: 'file',
			icon: viteIcon,
			view: 'vite.config.ts'
		}
	];
</script>

<kit:list density="none" rounded="0">
	{#each treemap as item, index (index)}
		{#if item.view}
			<kit:list-item
				s-class_vs-indent-={String(item.indentation)}
				s-style_background-color={item.view === view ? 'var(--kit-color-vs-active)' : 'transparent'}
				s-style_border-radius={'4px'}
				s-style_font-size={'14px'}
				s-style_font-weight={'300'}
				color="font-vs-tertiary"
				onclick={() => (view = item.view)}
			>
				{#snippet prepend()}
					{#if item.type === 'folder'}
						<kit:icon>
							{#if item.open}
								<ChevronDown />
							{:else}
								<ChevronRight />
							{/if}
						</kit:icon>
					{/if}
					{#if item?.icon}
						<kit:icon>
							{@html item.icon}
						</kit:icon>
					{/if}
				{/snippet}

				{item.value}
			</kit:list-item>
		{:else}
			<kit:list-item
				s-class_vs-indent-={String(item.indentation)}
				s-style_background-color={'transparent'}
				s-style_border-radius={'4px'}
				s-style_font-size={'14px'}
				s-style_font-weight={'300'}
				color="font-vs-tertiary"
			>
				{#snippet prepend()}
					{#if item.type === 'folder'}
						<kit:icon>
							{#if item.open}
								<ChevronDown />
							{:else}
								<ChevronRight />
							{/if}
						</kit:icon>
					{/if}
					{#if item?.icon}
						<kit:icon>
							{@html item.icon}
						</kit:icon>
					{/if}
				{/snippet}

				{item.value}
			</kit:list-item>
		{/if}
	{/each}
</kit:list>
