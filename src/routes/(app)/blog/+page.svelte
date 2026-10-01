<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { getBreadcrumbs } from '$lib/breadcrumbs';
	import { formatDate } from '$lib/utils';

	// components
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { Rss } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = getBreadcrumbs('/blog');
</script>

<main>
	<header>
		<Breadcrumbs items={breadcrumbs} />

		<div class="heading">
			<h1>Blog</h1>
			<kit:btn variant="text" size="sm" href="/blog/rss.xml" target="_blank">
				{#snippet prepend()}
					<kit:icon>
						<Rss />
					</kit:icon>
				{/snippet}
				RSS
			</kit:btn>
		</div>
		<p class="intro">News, release notes, guides and behind the scenes of Lapikit.</p>
	</header>

	{#if data.posts.length > 0}
		<ul>
			{#each data.posts as post (post.path.slug)}
				<li>
					<article>
						<p class="meta">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span aria-hidden="true">·</span>
							<span>{post.readingTime} min read</span>
						</p>
						<h2>
							<a href={resolve('/(app)/blog/[slug]', { slug: post.path.slug })}>{post.title}</a>
						</h2>
						<p class="description">{post.description}</p>
						<p class="meta">By {post.author}</p>
					</article>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="intro">No articles yet, come back soon.</p>
	{/if}
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

	header {
		margin-bottom: 2rem;
	}

	.heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1.5rem;

		h1 {
			margin: 0;
			font-size: 2rem;
			font-weight: 700;
			line-height: 1.25;
		}
	}

	.intro {
		margin: 0.5rem 0 0;
		color: var(--kit-color-text-muted);
	}

	ul {
		display: grid;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		border-top: 1px solid var(--kit-color-border);
	}

	article {
		position: relative;
		padding: 1.5rem 0;
	}

	h2 {
		margin: 0.25rem 0 0.5rem;
		font-size: 1.375rem;
		font-weight: 700;
		line-height: 1.3;

		a {
			color: inherit;
			text-decoration: none;

			// the whole article is clickable, the link stays the only focusable element
			&::after {
				content: '';
				position: absolute;
				inset: 0;
			}
		}
	}

	article:hover h2 a,
	h2 a:focus-visible {
		color: var(--kit-color-accent);
	}

	.description {
		margin: 0 0 0.5rem;
		line-height: 1.6;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5rem;
		margin: 0;
		color: var(--kit-color-text-muted);
		font-size: 14px;
	}
</style>
