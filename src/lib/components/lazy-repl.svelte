<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	type FileContent = { code: string; lang?: string };
	type ContentType = string | Record<string, string | FileContent>;

	let {
		content = '' as ContentType,
		presentation = false,
		title = '',
		children
	}: {
		content?: ContentType;
		presentation?: boolean;
		title?: string;
		children?: Snippet;
	} = $props();

	let container = $state<HTMLElement | null>(null);
	let loaded = $state(false);

	// Flatten content to plain text for SEO (rendered during SSR, indexed by crawlers)
	const staticCode = $derived(
		typeof content === 'string'
			? content
			: Object.entries(content as Record<string, string | FileContent>)
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
		{#if children}
			<kit:repl {content} {presentation} {title}>
				{@render children()}
			</kit:repl>
		{:else}
			<kit:repl {content} {presentation} {title} />
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
