// types
import type { DocSummary } from './@types';

// datas
import manifest from '../manifest.json';

// icons
import { Moon, Sun, SunMoon } from 'lucide-svelte';
import githubIcon from '$lib/assets/icons/github.svg?raw';
import xIcon from '$lib/assets/icons/x.svg?raw';
import discordIcon from '$lib/assets/icons/discord.svg?raw';
import npmIcon from '$lib/assets/icons/npm_color.svg?raw';
import yarnIcon from '$lib/assets/icons/yarn_color.svg?raw';
import bunIcon from '$lib/assets/icons/bun_color.svg?raw';
import typescriptIcon from '$lib/assets/icons/typescript_color.svg?raw';
import javascriptIcon from '$lib/assets/icons/javascript_color.svg?raw';

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

export const manifestPage = manifest;

export const urlLapikitLicense = 'https://github.com/lapikit/lapikit.dev/blob/main/LICENSE';

export type LinkName = keyof typeof links;

export const links = {
	'github-repo-lapikit': {
		label: 'github',
		url: 'https://github.com/lapikit/lapikit',
		icon: githubIcon,
		_styles: {
			color: 'on-error',
			background: 'error'
		}
	},
	github: {
		label: 'github',
		url: 'https://github.com/lapikit',
		icon: githubIcon,
		_styles: {
			color: 'on-error',
			background: 'error'
		}
	},
	npm: {
		label: 'npm',
		url: 'https://www.npmjs.com/package/lapikit',
		icon: npmIcon,
		_styles: {
			color: 'on-error',
			background: 'error'
		}
	},
	discord: {
		label: 'discord',
		url: 'https://discord.gg/c8vp54EnGD',
		icon: discordIcon,
		_styles: {
			color: 'on-error',
			background: 'error'
		}
	}
};

export type ThemeManager = keyof typeof themes;

export const themes = {
	light: { label: 'light', icon: Sun },
	dark: { label: 'dark', icon: Moon },
	system: { label: 'system', icon: SunMoon }
};

export const pkg_manager = {
	npm: {
		label: 'npm',
		icon: npmIcon
	},
	yarn: {
		label: 'yarn',
		icon: yarnIcon
	},
	bun: {
		label: 'bun',
		icon: bunIcon
	}
};

export const lang_manager = {
	javascript: {
		label: 'javascript',
		icon: javascriptIcon
	},
	typescript: {
		label: 'typescript',
		icon: typescriptIcon
	}
};
