import type { AppNavItem } from '$lib/types';
import { links, urlLapikitLicense } from './constants';

const app_links: AppNavItem[] = [
	{
		label: 'quick start',
		path: '/docs/getting-started'
	},
	{
		label: 'customize',
		path: '/docs/customize'
	},
	{
		label: 'components',
		path: '/docs/components'
	},
	{
		label: 'tools',
		path: '/docs/hooks'
	}
];

const footer_links: AppNavItem[] = [
	{
		label: 'documentation',
		child: [
			{
				label: 'quick start',
				path: '/docs/getting-started'
			},
			{
				label: 'customize',
				path: '/docs/customize'
			},
			{
				label: 'components',
				path: '/docs/components'
			},
			{
				label: 'stores and hooks',
				path: '/docs/hooks'
			}
		]
	},
	{
		label: 'community',
		child: [
			{
				label: 'roadmap',
				path: '/docs/roadmap'
			}
			// {
			// 	label: 'contributing',
			// 	path: 'docs/contributing'
			// },
			// {
			// 	label: 'code of conduct',
			// 	path: '/docs/code-of-conduct'
			// }
		]
	},
	{
		label: 'resources',
		child: [
			{
				label: 'support',
				path: links['discord'].url
			},
			{
				label: 'changelog',
				path: '/docs/changelog'
			},
			{
				label: 'LLMs.txt',
				path: '/llms.txt'
			},
			{
				label: links['npm'].label,
				path: links['npm'].url
			},
			{
				label: links['github'].label,
				path: links['github'].url
			},
			{
				label: 'MIT License',
				path: urlLapikitLicense
			}
		]
	},
	{
		label: 'policies',
		child: [
			{
				label: 'terms and privacy',
				path: '/terms'
			},
			{
				label: 'cookie settings',
				path: 'cookie-settings'
			}
		]
	}
];

export const site_links = {
	app: app_links,
	footer: footer_links
};
