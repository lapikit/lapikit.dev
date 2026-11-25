<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { preferences } from '$lib/state/ui.svelte';

	type FileContent = { code: string; lang?: string };
	type ContentMap = Record<string, string | FileContent>;
	type ContentType = string | ContentMap;
	type Lang = 'sh' | 'svelte' | 'js' | 'html' | 'css' | 'json' | 'bash';
	type CodeVariant = { content: ContentType; lang?: string };

	let {
		content = '' as ContentType,
		presentation = false,
		title = '',
		children,
		lang = 'sh',
		javascript
	}: {
		content?: ContentType;
		presentation?: boolean;
		title?: string;
		children?: Snippet;
		lang?: Lang;
		javascript?: CodeVariant;
	} = $props();

	let container = $state<HTMLElement | null>(null);
	let loaded = $state(false);

	const typescript = $derived<CodeVariant>({ content, lang });
	const active = $derived(
		preferences.lang_selected === 'javascript' && javascript ? javascript : typescript
	);
	const skeleton_variants = $derived(
		javascript
			? [
					{ key: 'typescript', ...typescript },
					{ key: 'javascript', ...javascript }
				]
			: [{ key: 'any', ...typescript }]
	);

	const flattenCode = (value: ContentType) =>
		typeof value === 'string'
			? value
			: Object.entries(value)
					.map(([name, file]) => {
						const code = typeof file === 'string' ? file : file.code;
						return `// ${name}\n${code}`;
					})
					.join('\n\n');

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loaded = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '300px 0px' }
		);

		if (container) observer.observe(container);
		return () => observer.disconnect();
	});
</script>

<div bind:this={container} class="lazy-repl">
	{#if loaded}
		{@const replContent =
			typeof active.content === 'string'
				? { Root: { code: active.content, lang: active.lang } }
				: active.content}
		{#if children}
			<kit:repl content={replContent} {presentation} {title}>
				{@render children()}
			</kit:repl>
		{:else}
			<kit:repl content={replContent} {presentation} {title} />
		{/if}
	{:else}
		<!--
			Skeleton 
		-->
		<div
			class="lazy-repl__skeleton"
			aria-label={title || 'Code example'}
			aria-busy="true"
			role="region"
		>
			{#if presentation && children}
				<div class="lazy-repl__preview">
					{@render children()}
				</div>
			{/if}

			{#each skeleton_variants as variant (variant.key)}
				<div class="lazy-repl__code" data-code-variant={variant.key}>
					<div class="lazy-repl__toolbar">
						<span class="lazy-repl__title">{title || variant.lang}</span>
					</div>

					<pre><code>{flattenCode(variant.content)}</code></pre>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.lazy-repl {
		position: relative;
	}

	:global(html[data-code-lang='javascript']) [data-code-variant='typescript'],
	:global(html:not([data-code-lang='javascript'])) [data-code-variant='javascript'] {
		display: none;
	}

	.lazy-repl__skeleton {
		border: 1px solid var(--md-color-border, #d0d7de);
		border-radius: 8px;
		overflow: hidden;
		background: var(--md-color-surface, #f6f8fa);
	}

	.lazy-repl__toolbar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--md-color-border, #d0d7de);
		background: var(--md-color-bg, #ffffff);
	}

	.lazy-repl__title {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--md-color-muted, #555);
	}

	.lazy-repl__preview {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--md-color-border, #d0d7de);
		background: var(--md-color-bg, #ffffff);
	}

	.lazy-repl__skeleton pre {
		margin: 0;
		padding: 1rem 1.25rem;
		overflow-x: auto;
		font-family: ui-monospace, 'Cascadia Code', 'Fira Code', Consolas, monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		background: transparent;
		border: none;
		border-radius: 0;
	}

	.lazy-repl__skeleton code {
		font-family: inherit;
		font-size: inherit;
		color: var(--md-color-text, #1a1a1a);
		background: none;
		border: none;
		padding: 0;
		white-space: pre;
	}
</style>
