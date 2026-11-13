import type { DocSummary } from '$lib/types';

const site_name = 'Lapikit';

function organization(origin: string) {
	return {
		'@type': 'Organization',
		name: site_name,
		url: `${origin}/`,
		logo: `${origin}/icon-512.png`
	};
}

// homepage only: lets Google show "Lapikit" as the site name above the results
export function getWebsiteStructuredData(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: site_name,
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
		isPartOf: { '@type': 'WebSite', name: site_name, url: `${origin}/` }
	};
}
