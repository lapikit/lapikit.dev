<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	type FileContent = { code: string | ContentLoader; lang?: string };
	type ContentLoader = () => Promise<{ default: string }>;
	type ContentMap = Record<string, string | FileContent>;
	type ContentType = string | ContentMap | ContentLoader;

	let {
		content = '' as ContentType,
		presentation = false,
		title = '',
		children,
		lang = 'sh'
	}: {
		content?: ContentType;
		presentation?: boolean;
		title?: string;
		children?: Snippet;
		lang?: 'sh' | 'svelte' | 'js' | 'html' | 'css' | 'json' | 'bash';
	} = $props();

	let resolvedContent = $state<string | ContentMap>('');
	let container = $state<HTMLElement | null>(null);
	let loaded = $state(false);

	$effect(() => {
		if (typeof content === 'function') {
			(content as ContentLoader)().then((m) => {
				resolvedContent = m.default;
			});
		} else if (content !== null && typeof content === 'object') {
			const entries = Object.entries(content as ContentMap);
			Promise.all(
				entries.map(async ([name, val]) => {
					if (typeof val === 'string') return [name, val] as const;
					if (typeof val.code === 'function') {
						const m = await (val.code as ContentLoader)();
						return [name, { code: m.default, lang: val.lang }] as const;
					}
					return [name, val] as const;
				})
			).then((resolved) => {
				resolvedContent = Object.fromEntries(resolved);
			});
		} else {
			resolvedContent = content as string;
		}
	});

	// Flatten content to plain text for SEO (rendered during SSR, indexed by crawlers)
	// Utilise resolvedContent partout à la place de content
	const staticCode = $derived(
		typeof resolvedContent === 'string'
			? resolvedContent
			: Object.entries(resolvedContent as Record<string, string | FileContent>)
					.map(([name, file]) => {
						const code = typeof file === 'string' ? file : file.code;
						return `// ${name}\n${code}`;
					})
					.join('\n\n')
	);

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
			typeof resolvedContent === 'string'
				? { Root: { code: resolvedContent, lang: lang } }
				: resolvedContent}
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
			{#if title}
				<div class="lazy-repl__toolbar">
					<span class="lazy-repl__title">{title}</span>
				</div>
			{/if}

			{#if presentation && children}
				<div class="lazy-repl__preview">
					{@render children()}
				</div>
			{/if}

			<pre><code>{staticCode}</code></pre>
		</div>
	{/if}
</div>

<style>
	.lazy-repl {
		position: relative;
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
