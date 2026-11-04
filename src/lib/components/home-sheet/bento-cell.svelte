<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';

	import { ArrowUpRight } from 'lucide-svelte';

	let {
		tag,
		name,
		path,
		wide = false,
		children
	}: {
		tag: string;
		name: string;
		path: Pathname;
		wide?: boolean;
		children: Snippet;
	} = $props();
</script>

<article class="bento-cell" class:wide aria-label="{name} demo">
	<header class="bento-cell-header">
		<code class="bento-cell-tag">&lt;kit:{tag}&gt;</code>
		<kit:btn
			href={resolve(path)}
			icon
			size="sm"
			variant="text"
			rounded="md"
			aria-label="{name} documentation"
			tooltip="Docs"
		>
			<kit:icon size="sm">
				<ArrowUpRight />
			</kit:icon>
		</kit:btn>
	</header>

	<div class="bento-cell-demo">
		{@render children()}
	</div>
</article>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.bento-cell {
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 260px;

		@include up(md) {
			&.wide {
				grid-column: span 2;
			}
		}
	}

	.bento-cell-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 12px 0 var(--sheet-cell-padding);
	}

	.bento-cell-tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
	}

	.bento-cell-demo {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: var(--sheet-cell-padding);
	}
</style>
