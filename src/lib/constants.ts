// types
import type { SeoEntry } from './@types';

// icons
import githubIcon from '$lib/assets/icons/github.svg?raw';
import xIcon from '$lib/assets/icons/x.svg?raw';
import discordIcon from '$lib/assets/icons/discord.svg?raw';

// cookies & storage keys
export const consent_cookie = '_lapikit_consent';
export const theme_storage_key = '@lapikit/theme';
export const npm_stats_storage_key = '@lapikit/npm-stats';

/**
 * SEO
 * Note: The SEO entries for documentation pages are generated dynamically in `src/lib/registry.ts` based on the metadata of each doc page. The entries defined here are for static pages.
 */
export const seoByPath: Record<string, SeoEntry> = {
	'/': {
		title: 'Lapikit',
		description:
			'Lapikit is a fast Svelte component library with reusable components, hooks, theming tools and documentation built for speed and discoverability.',
		type: 'website'
	},
	'/terms': {
		title: 'Legal Notices',
		description:
			'Review Lapikit legal notices, hosting information, intellectual property and privacy details.',
		type: 'article'
	}
};

export const socialMediaLinks = [
	{ label: 'Twitter', url: 'https://x.com/lapikit', icon: xIcon },
	{ label: 'GitHub', url: 'https://github.com/lapikit', icon: githubIcon },
	{ label: 'Discord', url: 'https://discord.gg/lapikit', icon: discordIcon }
];
