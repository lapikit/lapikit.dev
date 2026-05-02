export const primaryNavigation = [
	{ href: '/docs', label: 'documentation' },
	{ href: '/docs/components', label: 'components' },
	{ href: '/docs/hooks', label: 'hooks' }
] as const;

export const legacyRoutes = [
	'breakpoints',
	'hooks/store-theme',
	'hooks/store-devices',
	'hooks/store-theme'
] as const;

export const navigationRouteLinks = [
	{
		label: 'Environnement',
		items: [
			{ label: 'Installation', path: '/docs/installation' },
			{ label: 'Configuration', path: '/docs/configuration' },
			{ label: 'All', path: '/docs' }
		]
	},
	{
		label: 'Components',
		items: [
			{ label: 'All', path: '/docs/components' },
			{ label: 'Application', path: '/docs/components/application' },
			{ label: 'Accordion', path: '/docs/components/accordion' }
		]
	},
	{
		label: 'Hooks',
		items: [
			{ label: 'Stores', path: '/docs/hooks/stores' },
			{ label: 'Actions', path: '/docs/hooks/actions' },
			{ label: 'All', path: '/docs/hooks' }
		]
	}
] as const;
