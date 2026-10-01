import type { BlogPostSummary, DocSummary } from './@types';

const SITE_NAME = 'Lapikit';

function organization(origin: string) {
	return {
		'@type': 'Organization',
		name: SITE_NAME,
		url: `${origin}/`,
		logo: `${origin}/icon-512.png`
	};
}

// homepage only: lets Google show "Lapikit" as the site name above the results
export function getWebsiteStructuredData(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		alternateName: ['Lapikit Svelte', 'lapikit.dev'],
		url: `${origin}/`,
		inLanguage: 'en'
	};
}

// documentation pages: dateModified comes from the last commit on the source file
export function getTechArticleStructuredData(
	doc: DocSummary,
	{
		origin,
		url,
		headline,
		description,
		image
	}: { origin: string; url: string; headline: string; description: string; image: string }
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline,
		description,
		url,
		mainEntityOfPage: url,
		image,
		inLanguage: 'en',
		...(doc.lastModified && { dateModified: doc.lastModified }),
		author: organization(origin),
		publisher: organization(origin),
		isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${origin}/` }
	};
}

// blog posts: dates come from the frontmatter, the author is a person rather than the project
export function getBlogPostingStructuredData(
	post: BlogPostSummary,
	{
		origin,
		url,
		headline,
		description,
		image
	}: { origin: string; url: string; headline: string; description: string; image: string }
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline,
		description,
		url,
		mainEntityOfPage: url,
		image,
		inLanguage: 'en',
		datePublished: post.date,
		dateModified: post.updated ?? post.date,
		author: { '@type': 'Person', name: post.author },
		publisher: organization(origin),
		isPartOf: { '@type': 'Blog', name: `${SITE_NAME} Blog`, url: `${origin}/blog` }
	};
}
