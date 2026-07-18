// types
import type { DocSummary } from './@types';

// datas
import manifest from '../manifest.json';

// icons
import githubIcon from '$lib/assets/icons/github.svg?raw';
import xIcon from '$lib/assets/icons/x.svg?raw';
import discordIcon from '$lib/assets/icons/discord.svg?raw';

// cookies & storage keys
export const consent_cookie = '_lapikit_consent';
export const theme_storage_key = '@lapikit/theme';
export const npm_stats_storage_key = '@lapikit/npm-stats';

export const seoByPath: Record<string, DocSummary> = Object.fromEntries(
	(manifest as DocSummary[]).map((doc) => [doc.path.pathname, doc])
);

export const socialMediaLinks = [
	{ label: 'Twitter', url: 'https://x.com/lapikit', icon: xIcon },
	{ label: 'GitHub', url: 'https://github.com/lapikit', icon: githubIcon },
	{ label: 'Discord', url: 'https://discord.gg/lapikit', icon: discordIcon }
];
