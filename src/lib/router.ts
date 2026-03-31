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
			{ label: 'Application', path: '/docs/components/application' },
			{ label: 'All', path: '/docs/components' }
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
