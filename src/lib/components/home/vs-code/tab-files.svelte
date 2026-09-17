<script lang="ts">
	// assets
	import { ChevronRight, X } from 'lucide-svelte';
	import svelteIcon from '$lib/assets/icons/vscode/svelte.svg?raw';
	import cssIcon from '$lib/assets/icons/vscode/css.svg?raw';
	import eslintIcon from '$lib/assets/icons/vscode/eslint.svg?raw';
	import viteIcon from '$lib/assets/icons/vscode/vite.svg?raw';

	let { view } = $props();
</script>

<div id="vs-ide-tab">
	<div>
		<div>
			<kit:icon>
				{#if view.includes('.svelte')}
					{@html svelteIcon}
				{:else if view.includes('.css')}
					{@html cssIcon}
				{:else if view.includes('eslint.config')}
					{@html eslintIcon}
				{:else if view.includes('vite.config')}
					{@html viteIcon}
				{/if}
			</kit:icon>
			{view}
			<kit:icon>
				<X />
			</kit:icon>
		</div>
	</div>
	<div>
		{#if view.includes('.svelte') || view.includes('.css')}
			src
			<kit:icon>
				<ChevronRight />
			</kit:icon>
			{#if !view.includes('+') && !view.includes('.css')}
				lib
			{:else}
				routes
			{/if}

			<kit:icon>
				<ChevronRight />
			</kit:icon>
		{/if}
		<kit:icon>
			{#if view.includes('.svelte')}
				{@html svelteIcon}
			{:else if view.includes('.css')}
				{@html cssIcon}
			{:else if view.includes('eslint.config')}
				{@html eslintIcon}
			{:else if view.includes('vite.config')}
				{@html viteIcon}
			{/if}
		</kit:icon>
		{view}
	</div>
</div>

<style lang="scss">
	#vs-ide-tab {
		display: grid;
		padding: 6px 10px 0;
		row-gap: 2px;

		> div:first-child > div {
			display: flex;
			align-items: center;
			gap: 4px;
			padding: 1px 5px;
			border-radius: 8px;
			width: fit-content;
			cursor: pointer;
			color: var(--kit-color-font-vs-tertiary);
			background-color: var(--kit-color-vs-active);
		}

		> div:last-child {
			display: flex;
			align-items: center;
			gap: 4px;
			color: var(--kit-color-font-vs-primary);
			font-size: 14px;
		}
	}
</style>
