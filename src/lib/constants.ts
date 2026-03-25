export type SeoEntry = {
	title: string;
	description: string;
	type?: 'website' | 'article';
};

export const siteName = 'Lapikit';
export const siteDomain = 'lapikit.dev';
export const siteDefaultUrl = 'https://lapikit.dev';
export const siteDescription =
	'Lapikit is a fast Svelte component library with reusable components, hooks, theming tools and documentation built for speed and discoverability.';

export const navigationLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/docs', label: 'Documentation' },
	{ href: '/docs/components', label: 'Components' },
	{ href: '/docs/hooks', label: 'Hooks' },
	{ href: '/theme-builder', label: 'Theme Builder' },
	{ href: '/terms', label: 'Legal notices' }
] as const;

export const defaultSeo: SeoEntry = {
	title: 'Fast Svelte Component Library',
	description: siteDescription,
	type: 'website'
};

export const seoByPath: Record<string, SeoEntry> = {
	'/': defaultSeo,
	'/docs': {
		title: 'Documentation',
		description:
			'Read the Lapikit documentation to discover the component library, hooks, theming workflow and implementation patterns.',
		type: 'article'
	},
	'/docs/components': {
		title: 'Svelte Components',
		description:
			'Explore Lapikit Svelte components and the UI building blocks available for fast, reusable interfaces.',
		type: 'article'
	},
	'/docs/hooks': {
		title: 'Svelte Hooks',
		description:
			'Browse Lapikit hooks and reusable logic helpers for state management and interface behavior in Svelte.',
		type: 'article'
	},
	'/theme-builder': {
		title: 'Theme Builder',
		description:
			'Generate light and dark CSS theme tokens for Lapikit with the interactive theme builder.',
		type: 'website'
	},
	'/terms': {
		title: 'Legal Notices',
		description:
			'Review Lapikit legal notices, hosting information, intellectual property and privacy details.',
		type: 'article'
	}
};
