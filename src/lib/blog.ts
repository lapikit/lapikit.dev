// types
import type { BlogPostSummary, DocComponent } from './@types';

// datas
import manifest from '../manifest.json';

/**
 * Blog registry
 * Same split as the documentation: metadata from the generated manifest,
 * compiled posts loaded lazily so the listing never bundles every article.
 */

const postModules = import.meta.glob('/src/content/blog/*.md', {
	import: 'default'
}) as Record<string, () => Promise<DocComponent>>;

// newest first, the slug breaks ties so the order stays stable between builds
export const posts: BlogPostSummary[] = (manifest as unknown as BlogPostSummary[])
	.filter((post) => post.path.sourcePath.startsWith('src/content/blog/'))
	.sort(
		(left, right) =>
			right.date.localeCompare(left.date) || left.path.slug.localeCompare(right.path.slug)
	);

export const postsBySlug = new Map(posts.map((post) => [post.path.slug, post] as const));

export function loadPostComponent(post: BlogPostSummary): Promise<DocComponent> {
	const loader = postModules[`/${post.path.sourcePath}`];
	if (!loader) throw new Error(`Missing compiled module for: ${post.path.sourcePath}`);

	return loader();
}
