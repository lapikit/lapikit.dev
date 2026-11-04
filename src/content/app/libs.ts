import { nbComponents, nbHooks } from '$lib/router';

// assets
import LapikitLogo from '$lib/assets/images/lapikit.webp?h=124&format=webp';
import MeltUI from '$lib/assets/images/libs/melt-ui.webp?h=124&format=webp';
import ShadcnSvelte from '$lib/assets/images/libs/shadcn-svelte.webp?h=124&format=webp';
import Skeleton from '$lib/assets/images/libs/skeleton.webp?h=124&format=webp';

type TableHome = {
	text: string;
	subject: Array<string>;
};

type TableHomeList = {
	title: string;
	logo: string;
	values: Array<Array<string | number>>;
};

export const tableHome: TableHome[] = [
	{
		text: 'Features',
		subject: ['Svelte Components', 'Theming support', 'Hooks and actions', 'Preprocessor']
	},
	{
		text: 'Environments',
		subject: [
			'Runes support',
			'No Tailwind dependencies',
			'Tailwind support',
			'UnoCSS support',
			'CSS standard support',
			'Build dependencies',
			'ESLint support'
		]
	},
	{
		text: 'Integration and support',
		subject: ['CLI integrated', 'Fully open and free', 'Release cadence']
	}
];

export const tableHomeList: TableHomeList[] = [
	{
		title: 'Lapikit',
		logo: LapikitLogo,
		values: [
			[nbComponents, 'yes', nbHooks, 'yes'],
			['yes', 'yes', 'yes', 'yes', 'yes', 2, 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Skeleton',
		logo: Skeleton,
		values: [
			[42, 'yes', 'no', 'no'],
			['yes', 'no', 'yes', 'partial', 'yes', 32, 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Shadcn Svelte',
		logo: ShadcnSvelte,
		values: [
			[62, 'yes', 2, 'no'],
			['yes', 'no', 'yes', 'no', 'yes', 4, 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Melt UI',
		logo: MeltUI,
		values: [
			[18, 'yes', 'no', 'no'],
			['partial', 'no', 'yes', 'partial', 'yes', 5, 'yes'],
			['yes', 'yes', 'Monthly']
		]
	}
];
