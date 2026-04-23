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

// cookies
export const consent_cookie = '_lapikit_consent';

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

import githubIcon from '$lib/assets/icons/github.svg?raw';
import xIcon from '$lib/assets/icons/x.svg?raw';
import discordIcon from '$lib/assets/icons/discord.svg?raw';

export const socialMediaLinks = [
	{ label: 'Twitter', url: 'https://x.com/lapikit', icon: xIcon },
	{ label: 'GitHub', url: 'https://github.com/lapikit', icon: githubIcon },
	{ label: 'Discord', url: 'https://discord.gg/lapikit', icon: discordIcon }
];

export const docsNavigation = [
	{
		label: 'Getting Started',
		icon: xIcon,
		pages: [
			{ label: 'Introduction', url: '/docs/introduction' },
			{ label: 'Quick Start', url: '/docs/quick-start' }
		]
	},
	{
		label: 'Essentials',
		icon: xIcon,
		pages: [
			{ label: 'Customization', url: '/docs/customize' },
			{ label: 'Initialize application', url: '/docs/essentials/initialize-application' },
			{ label: 'Template syntax', url: '/docs/essentials/template-syntax' },
			{ label: 'Classes & Styles', url: '/docs/essentials/class-and-style' }
		]
	},
	{
		label: 'Components',
		icon: xIcon,
		pages: [
			{ label: 'Application', url: '/docs/components/application' },
			{ label: 'Accordion', url: '/docs/components/accordion' },
			{ label: 'Alert', url: '/docs/components/alert' },
			{ label: 'Appbar', url: '/docs/components/appbar' },
			{ label: 'Aspect ratio', url: '/docs/components/aspect-ratio' },
			{ label: 'Avatar', url: '/docs/components/avatar' },
			{ label: 'Button', url: '/docs/components/button' },
			{ label: 'Card', url: '/docs/components/card' },
			{ label: 'Chip', url: '/docs/components/chip' },
			{ label: 'Dialog', url: '/docs/components/dialog' },
			{ label: 'Dropdown', url: '/docs/components/dropdown' },
			{ label: 'Icon', url: '/docs/components/icon' },
			{ label: 'List', url: '/docs/components/list' },
			{ label: 'Modal', url: '/docs/components/modal' },
			{ label: 'Popover', url: '/docs/components/popover' },
			{ label: 'Separator', url: '/docs/components/separator' },
			{ label: 'Textfield', url: '/docs/components/textfield' },
			{ label: 'Toolbar', url: '/docs/components/toolbar' },
			{ label: 'Tooltip', url: '/docs/components/tooltip' }
		]
	},
	{
		label: 'Stores & Hooks',
		icon: xIcon,
		pages: [{ label: 'useAccordion', url: '/docs/hooks/actions/use-accordion' }]
	},
	{
		label: 'Extra Topics',
		icon: xIcon,
		pages: [
			{ label: 'Migration Guide', url: '/docs/migration-guide' },
			{ label: 'Typescripts & Linter', url: '/docs/environments' }
		]
	}
] as const;
