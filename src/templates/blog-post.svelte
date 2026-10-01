<script lang="ts" module>
	export { default as blockquote } from '$lib/components/markdown/blockquote.svelte';
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	import type { BlogPostSummary } from '$lib/@types';
	import { getBreadcrumbs } from '$lib/breadcrumbs';
	import { formatDate, slugify } from '$lib/utils';

	// components
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	let {
		children,
		data
	}: {
		children?: Snippet;
		data: { post: BlogPostSummary };
	} = $props();

	const post = $derived(data.post);
	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
</script>

<main>
	<article class="markdown">
		<header>
			<Breadcrumbs items={breadcrumbs} />

			<h1 id={slugify(post.title)} class="markdown-title">{post.title}</h1>

			<p class="meta">
				<span>By {post.author}</span>
				<span aria-hidden="true">·</span>
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span aria-hidden="true">·</span>
				<span>{post.readingTime} min read</span>
			</p>
			{#if post.updated}
				<p class="meta">
					Updated on <time datetime={post.updated}>{formatDate(post.updated)}</time>
				</p>
			{/if}
		</header>

		{@render children?.()}

		<kit:separator />
		<footer>
			<kit:btn variant="text" size="sm" href={resolve('/blog')}>
				{#snippet prepend()}
					<kit:icon>
						<ChevronLeft />
					</kit:icon>
				{/snippet}
				All articles
			</kit:btn>
		</footer>
	</article>
</main>

<style lang="scss">
	main {
		margin: var(--app-spacing-y-page-top) var(--app-spacing-x-page) var(--app-spacing-y-page-bottom);
		min-height: calc(
			100dvh - 64px - var(--app-spacing-y-page-top) - var(--app-spacing-y-page-bottom) - 88px
		);

		@media (min-width: 784px) {
			max-width: var(--md-max-width);
			margin-left: auto;
			margin-right: auto;
		}
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5rem;
		margin: 0.5rem 0 0;
		color: var(--kit-color-text-muted);
		font-size: 14px;
	}

	footer {
		margin-top: 2rem;
	}
</style>
