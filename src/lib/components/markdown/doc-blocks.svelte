<script lang="ts">
	import type { Component, ComponentProps } from 'svelte';
	import type { DocBlock } from '$lib/types';
	import Blockquote from '$lib/components/markdown/blockquote.svelte';
	import CommandRepl from '$lib/components/markdown/command-repl.svelte';
	import LazyRepl from '$lib/components/markdown/lazy-repl.svelte';
	import SummaryComponents from '$lib/components/docs/summary-components.svelte';
	import SummaryHooks from '$lib/components/docs/summary-hooks.svelte';
	import { command } from '$lib/constants';
	import { preferences } from '$lib/state/ui.svelte';

	type ReplLang = ComponentProps<typeof LazyRepl>['lang'];
	type CommandKey = ComponentProps<typeof CommandRepl>['commandkey'];

	let { blocks, demos = {} }: { blocks: DocBlock[]; demos?: Record<string, Component> } = $props();
</script>

{#each blocks as block, index (index)}
	{#if block.type === 'html'}
		{@html block.html}
	{:else if block.type === 'callout'}
		<Blockquote>{@html block.html}</Blockquote>
	{:else if block.type === 'repl'}
		{@const Demo = block.demo ? demos[block.demo] : undefined}
		{#if Demo}
			<LazyRepl
				content={block.content}
				lang={block.lang as ReplLang}
				title={block.title}
				presentation={block.presentation}
			>
				<Demo />
			</LazyRepl>
		{:else}
			<LazyRepl
				content={block.content}
				lang={block.lang as ReplLang}
				title={block.title}
				presentation={block.presentation}
			/>
		{/if}
	{:else if block.type === 'command'}
		{#if block.selected}
			<LazyRepl lang="sh" content={command[preferences.pkg_selected][block.key as CommandKey]} />
		{:else}
			<CommandRepl commandkey={block.key as CommandKey} />
		{/if}
	{:else if block.type === 'demo'}
		{@const Demo = demos[block.path]}
		<Demo />
	{:else if block.type === 'component' && block.name === 'summary-components'}
		<SummaryComponents />
	{:else if block.type === 'component' && block.name === 'summary-hooks'}
		<SummaryHooks key={block.props.key} />
	{/if}
{/each}
