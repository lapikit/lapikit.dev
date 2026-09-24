import type { AppNavItem, NavSection } from './@types';
import { links, urlLapikitLicense } from './constants';
import { Container, Eraser, Puzzle, SquareFunction, ToolCase, VectorSquare } from 'lucide-svelte';

import accordionImage from '$lib/assets/images/components/accordion.webp?no-inline';
import accordionIcon from '$lib/assets/images/components/accordion_icon.png?format=webp';
import alertImage from '$lib/assets/images/components/alert.webp?no-inline';
import alertIcon from '$lib/assets/images/components/alert_icon.png?format=webp';
import appbarImage from '$lib/assets/images/components/appbar.webp?no-inline';
import appbarIcon from '$lib/assets/images/components/appbar_icon.png?format=webp';
import aspectRatioImage from '$lib/assets/images/components/aspect-ratio.webp?no-inline';
import aspectRatioIcon from '$lib/assets/images/components/aspect-ratio_icon.png?format=webp';
import avatarImage from '$lib/assets/images/components/avatar.webp?no-inline';
import avatarIcon from '$lib/assets/images/components/avatar_icon.png?format=webp';
import buttonImage from '$lib/assets/images/components/button.webp?no-inline';
import buttonIcon from '$lib/assets/images/components/button_icon.png?format=webp';
import cardImage from '$lib/assets/images/components/card.webp?no-inline';
import cardIcon from '$lib/assets/images/components/card_icon.png?format=webp';
import chipImage from '$lib/assets/images/components/chip.webp?no-inline';
import chipIcon from '$lib/assets/images/components/chip_icon.png?format=webp';
import dialogImage from '$lib/assets/images/components/dialog.webp?no-inline';
import dialogIcon from '$lib/assets/images/components/dialog_icon.png?format=webp';
import dropdownImage from '$lib/assets/images/components/dropdown.webp?no-inline';
import dropdownIcon from '$lib/assets/images/components/dropdown_icon.png?format=webp';
import iconImage from '$lib/assets/images/components/icon.webp?no-inline';
import iconIcon from '$lib/assets/images/components/icon_icon.png?format=webp';
import listImage from '$lib/assets/images/components/list.webp?no-inline';
import listIcon from '$lib/assets/images/components/list_icon.png?format=webp';
import modalImage from '$lib/assets/images/components/modal.webp?no-inline';
import modalIcon from '$lib/assets/images/components/modal_icon.png?format=webp';
import popoverImage from '$lib/assets/images/components/popover.webp?no-inline';
import popoverIcon from '$lib/assets/images/components/popover_icon.png?format=webp';
import separatorImage from '$lib/assets/images/components/separator.webp?no-inline';
import separatorIcon from '$lib/assets/images/components/separator_icon.png?format=webp';
import textfieldImage from '$lib/assets/images/components/textfield.webp?no-inline';
import textfieldIcon from '$lib/assets/images/components/textfield_icon.png?format=webp';
import toolbarImage from '$lib/assets/images/components/toolbar.webp?no-inline';
import toolbarIcon from '$lib/assets/images/components/toolbar_icon.png?format=webp';
import tooltipImage from '$lib/assets/images/components/tooltip.webp?no-inline';
import tooltipIcon from '$lib/assets/images/components/tooltip_icon.png?format=webp';
import applicationImage from '$lib/assets/images/components/application.webp?no-inline';
import applicationIcon from '$lib/assets/images/components/application_icon.png?format=webp';

const appNavigation: AppNavItem[] = [
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

const footerNavigation: AppNavItem[] = [
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
				label: 'terms & privacy',
				path: '/terms'
			},
			{
				label: 'cookie settings',
				path: 'cookie-settings'
			}
		]
	}
];

export const docsNavigation: NavSection[] = [
	{
		label: 'Getting Started',
		icon: Container,
		pages: [
			{ label: 'Introduction', url: '/docs/introduction' },
			{ label: 'Quick Start', url: '/docs/getting-started' }
		]
	},
	{
		label: 'Essentials',
		icon: ToolCase,
		pages: [
			{ label: 'Initialize application', url: '/docs/essentials/initialize-application' },
			{ label: 'Customization', url: '/docs/customize' },
			{ label: 'Template syntax', url: '/docs/essentials/template-syntax' },
			{ label: 'Classes and Styles', url: '/docs/essentials/class-and-style' }
		]
	},
	{
		label: 'Components',
		icon: Puzzle,
		pages: [
			{
				label: 'All components',
				url: '/docs/components'
			},
			{
				name: 'kit:app',
				label: 'Application',
				url: '/docs/components/application',
				description: 'Root wrapper that initializes the Lapikit theme and global styles.',
				image: applicationImage,
				icon: applicationIcon
			},
			{
				name: 'kit:accordion',
				label: 'Accordion',
				url: '/docs/components/accordion',
				description: 'Collapsible sections to progressively reveal content.',
				image: accordionImage,
				icon: accordionIcon
			},
			{
				name: 'kit:alert',
				label: 'Alert',
				url: '/docs/components/alert',
				description: 'Contextual feedback messages for user actions.',
				image: alertImage,
				icon: alertIcon
			},
			{
				name: 'kit:appbar',
				label: 'Appbar',
				url: '/docs/components/appbar',
				description: 'Top navigation bar with slots for branding and actions.',
				image: appbarImage,
				icon: appbarIcon
			},
			{
				name: 'kit:aspect-ratio',
				label: 'Aspect ratio',
				url: '/docs/components/aspect-ratio',
				description: 'Constrains content to a fixed width-to-height ratio.',
				image: aspectRatioImage,
				icon: aspectRatioIcon
			},
			{
				name: 'kit:avatar',
				label: 'Avatar',
				url: '/docs/components/avatar',
				description: 'User profile picture with fallback initials.',
				image: avatarImage,
				icon: avatarIcon
			},
			{
				name: 'kit:btn',
				label: 'Button',
				url: '/docs/components/button',
				description: 'Interactive element with multiple variants and sizes.',
				image: buttonImage,
				icon: buttonIcon
			},
			{
				name: 'kit:card',
				label: 'Card',
				url: '/docs/components/card',
				description: 'Surface container for grouped, related content.',
				image: cardImage,
				icon: cardIcon
			},
			{
				name: 'kit:chip',
				label: 'Chip',
				url: '/docs/components/chip',
				description: 'Compact element for tags, filters or selections.',
				image: chipImage,
				icon: chipIcon
			},
			{
				name: 'kit:dialog',
				label: 'Dialog',
				url: '/docs/components/dialog',
				description: 'Accessible modal dialog for confirmations and forms.',
				image: dialogImage,
				icon: dialogIcon
			},
			{
				name: 'kit:dropdown',
				label: 'Dropdown',
				url: '/docs/components/dropdown',
				description: 'Floating menu triggered by a reference element.',
				image: dropdownImage,
				icon: dropdownIcon
			},
			{
				name: 'kit:icon',
				label: 'Icon',
				url: '/docs/components/icon',
				description: 'SVG icon wrapper with size and color control.',
				image: iconImage,
				icon: iconIcon
			},
			{
				name: 'kit:list',
				label: 'List',
				url: '/docs/components/list',
				description: 'Vertical list of items with optional leading and trailing slots.',
				image: listImage,
				icon: listIcon
			},
			{
				name: 'kit:modal',
				label: 'Modal',
				url: '/docs/components/modal',
				description: 'Full-screen overlay for focused tasks or content.',
				image: modalImage,
				icon: modalIcon
			},
			{
				name: 'kit:popover',
				label: 'Popover',
				url: '/docs/components/popover',
				description: 'Lightweight floating panel anchored to a trigger.',
				image: popoverImage,
				icon: popoverIcon
			},
			{
				name: 'kit:separator',
				label: 'Separator',
				url: '/docs/components/separator',
				description: 'Visual divider between sections or list items.',
				image: separatorImage,
				icon: separatorIcon
			},
			{
				name: 'kit:textfield',
				label: 'Textfield',
				url: '/docs/components/textfield',
				description: 'Text input with label, helper text and validation states.',
				image: textfieldImage,
				icon: textfieldIcon
			},
			{
				name: 'kit:toolbar',
				label: 'Toolbar',
				url: '/docs/components/toolbar',
				description: 'Horizontal bar grouping actions and controls.',
				image: toolbarImage,
				icon: toolbarIcon
			},
			{
				name: 'kit:tooltip',
				label: 'Tooltip',
				url: '/docs/components/tooltip',
				description: 'Short contextual hint shown on hover or focus.',
				image: tooltipImage,
				icon: tooltipIcon
			}
		]
	},
	{
		label: 'Stores and Hooks',
		icon: SquareFunction,
		pages: [
			{
				label: 'All hooks',
				url: '/docs/hooks'
			},
			{
				label: 'useAccordion',
				url: '/docs/hooks/use-accordion',
				description: 'Controls accordion open/close states and syncs sections automatically'
			},
			{
				label: 'useTheme',
				url: '/docs/hooks/use-theme',
				description: 'Manages theme switching and keeps dark/light modes in sync across the app'
			}
		]
	},
	{
		label: 'Extra Topics',
		icon: VectorSquare,
		pages: [
			{ label: 'Migration Guide', url: '/docs/migration-guide' },
			{ label: 'Typescripts and Linter', url: '/docs/environments' }
		]
	},
	{
		label: 'Deprecated',
		icon: Eraser,
		pages: [
			{ label: 'Breakpoints', url: '/docs/breakpoints' },
			{ label: '$breakpoints', url: '/docs/hooks/store-breakpoints' },
			{ label: '$devices', url: '/docs/hooks/store-devices' },
			{ label: '$theme', url: '/docs/hooks/store-theme' }
		]
	}
];

export const router = {
	app: appNavigation,
	footer: footerNavigation,
	documentation: docsNavigation
};
