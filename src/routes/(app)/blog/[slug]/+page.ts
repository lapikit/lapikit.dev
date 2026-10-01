import { error } from '@sveltejs/kit';
import { loadPostComponent, posts, postsBySlug } from '$lib/blog';

export const prerender = true;

export function entries() {
	return posts.map((post) => ({ slug: post.path.slug }));
}

export async function load({ params }) {
	const post = postsBySlug.get(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	const component = await loadPostComponent(post);

	return { post: { ...post, component } };
}
