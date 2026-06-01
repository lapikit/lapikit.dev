import type { NavSection } from './@types';

import { Container, Eraser, Puzzle, SquareFunction, ToolCase, VectorSquare } from 'lucide-svelte';

import accordionImage from '$lib/assets/images/components/accordion.webp';
import alertImage from '$lib/assets/images/components/alert.webp';
import appbarImage from '$lib/assets/images/components/appbar.webp';
import aspectRatioImage from '$lib/assets/images/components/aspect-ratio.webp';
import avatarImage from '$lib/assets/images/components/avatar.webp';
import buttonImage from '$lib/assets/images/components/button.webp';
import cardImage from '$lib/assets/images/components/card.webp';
import chipImage from '$lib/assets/images/components/chip.webp';
import dialogImage from '$lib/assets/images/components/dialog.webp';
import dropdownImage from '$lib/assets/images/components/dropdown.webp';
import iconImage from '$lib/assets/images/components/icon.webp';
import listImage from '$lib/assets/images/components/list.webp';
import modalImage from '$lib/assets/images/components/modal.webp';
import popoverImage from '$lib/assets/images/components/popover.webp';
import separatorImage from '$lib/assets/images/components/separator.webp';
import textfieldImage from '$lib/assets/images/components/textfield.webp';
import toolbarImage from '$lib/assets/images/components/toolbar.webp';
import tooltipImage from '$lib/assets/images/components/tooltip.webp';
import applicationImage from '$lib/assets/images/components/application.webp';

export const appNavigation: NavSection[] = [
	{ label: 'Label Menu Page1', url: '/' },
	{ label: 'Label Menu Page2', url: '/' },
	{ label: 'Label Menu Page3', url: '/' }
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
				label: 'Application',
				url: '/docs/components/application',
				description: 'Root wrapper that initializes the Lapikit theme and global styles.',
				image: applicationImage
			},
			{
				label: 'Accordion',
				url: '/docs/components/accordion',
				description: 'Collapsible sections to progressively reveal content.',
				image: accordionImage
			},
			{
				label: 'Alert',
				url: '/docs/components/alert',
				description: 'Contextual feedback messages for user actions.',
				image: alertImage
			},
			{
				label: 'Appbar',
				url: '/docs/components/appbar',
				description: 'Top navigation bar with slots for branding and actions.',
				image: appbarImage
			},
			{
				label: 'Aspect ratio',
				url: '/docs/components/aspect-ratio',
				description: 'Constrains content to a fixed width-to-height ratio.',
				image: aspectRatioImage
			},
			{
				label: 'Avatar',
				url: '/docs/components/avatar',
				description: 'User profile picture with fallback initials.',
				image: avatarImage
			},
			{
				label: 'Button',
				url: '/docs/components/button',
				description: 'Interactive element with multiple variants and sizes.',
				image: buttonImage
			},
			{
				label: 'Card',
				url: '/docs/components/card',
				description: 'Surface container for grouped, related content.',
				image: cardImage
			},
			{
				label: 'Chip',
				url: '/docs/components/chip',
				description: 'Compact element for tags, filters or selections.',
				image: chipImage
			},
			{
				label: 'Dialog',
				url: '/docs/components/dialog',
				description: 'Accessible modal dialog for confirmations and forms.',
				image: dialogImage
			},
			{
				label: 'Dropdown',
				url: '/docs/components/dropdown',
				description: 'Floating menu triggered by a reference element.',
				image: dropdownImage
			},
			{
				label: 'Icon',
				url: '/docs/components/icon',
				description: 'SVG icon wrapper with size and color control.',
				image: iconImage
			},
			{
				label: 'List',
				url: '/docs/components/list',
				description: 'Vertical list of items with optional leading and trailing slots.',
				image: listImage
			},
			{
				label: 'Modal',
				url: '/docs/components/modal',
				description: 'Full-screen overlay for focused tasks or content.',
				image: modalImage
			},
			{
				label: 'Popover',
				url: '/docs/components/popover',
				description: 'Lightweight floating panel anchored to a trigger.',
				image: popoverImage
			},
			{
				label: 'Separator',
				url: '/docs/components/separator',
				description: 'Visual divider between sections or list items.',
				image: separatorImage
			},
			{
				label: 'Textfield',
				url: '/docs/components/textfield',
				description: 'Text input with label, helper text and validation states.',
				image: textfieldImage
			},
			{
				label: 'Toolbar',
				url: '/docs/components/toolbar',
				description: 'Horizontal bar grouping actions and controls.',
				image: toolbarImage
			},
			{
				label: 'Tooltip',
				url: '/docs/components/tooltip',
				description: 'Short contextual hint shown on hover or focus.',
				image: tooltipImage
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
