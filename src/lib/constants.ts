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
import applicationImage from '$lib/assets/images/application.webp';

export const socialMediaLinks = [
	{ label: 'Twitter', url: 'https://x.com/lapikit', icon: xIcon },
	{ label: 'GitHub', url: 'https://github.com/lapikit', icon: githubIcon },
	{ label: 'Discord', url: 'https://discord.gg/lapikit', icon: discordIcon }
];

export type NavPage = {
	label: string;
	url: string;
	description?: string;
	image?: string;
};

export type NavSection = {
	label: string;
	icon: string;
	pages: NavPage[];
};

export const docsNavigation: NavSection[] = [
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
			{ label: 'Application', url: '/docs/components/application', description: 'Root wrapper that initializes the Lapikit theme and global styles.', image: applicationImage },
			{ label: 'Accordion', url: '/docs/components/accordion', description: 'Collapsible sections to progressively reveal content.' },
			{ label: 'Alert', url: '/docs/components/alert', description: 'Contextual feedback messages for user actions.' },
			{ label: 'Appbar', url: '/docs/components/appbar', description: 'Top navigation bar with slots for branding and actions.' },
			{ label: 'Aspect ratio', url: '/docs/components/aspect-ratio', description: 'Constrains content to a fixed width-to-height ratio.' },
			{ label: 'Avatar', url: '/docs/components/avatar', description: 'User profile picture with fallback initials.' },
			{ label: 'Button', url: '/docs/components/button', description: 'Interactive element with multiple variants and sizes.' },
			{ label: 'Card', url: '/docs/components/card', description: 'Surface container for grouped, related content.' },
			{ label: 'Chip', url: '/docs/components/chip', description: 'Compact element for tags, filters or selections.' },
			{ label: 'Dialog', url: '/docs/components/dialog', description: 'Accessible modal dialog for confirmations and forms.' },
			{ label: 'Dropdown', url: '/docs/components/dropdown', description: 'Floating menu triggered by a reference element.' },
			{ label: 'Icon', url: '/docs/components/icon', description: 'SVG icon wrapper with size and color control.' },
			{ label: 'List', url: '/docs/components/list', description: 'Vertical list of items with optional leading and trailing slots.' },
			{ label: 'Modal', url: '/docs/components/modal', description: 'Full-screen overlay for focused tasks or content.' },
			{ label: 'Popover', url: '/docs/components/popover', description: 'Lightweight floating panel anchored to a trigger.' },
			{ label: 'Separator', url: '/docs/components/separator', description: 'Visual divider between sections or list items.' },
			{ label: 'Textfield', url: '/docs/components/textfield', description: 'Text input with label, helper text and validation states.' },
			{ label: 'Toolbar', url: '/docs/components/toolbar', description: 'Horizontal bar grouping actions and controls.' },
			{ label: 'Tooltip', url: '/docs/components/tooltip', description: 'Short contextual hint shown on hover or focus.' }
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
];
