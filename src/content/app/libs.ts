import { nbComponents, nbHooks } from '$lib/constants';

// assets
import LapikitLogo from '$lib/assets/images/lapikit.webp';
import MeltUI from '$lib/assets/images/melt-ui.webp';
import ShadcnSvelte from '$lib/assets/images/shadcn-svelte.webp';
import Skeleton from '$lib/assets/images/skeleton.webp';

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
		subject: ['Svelte Components', 'Theming supports', 'Hooks and actions']
	},
	{
		text: 'Environnements (TEMP Big title Section ? OMG is good or no..., you can do it ! Answer ! big name) ',
		subject: [
			'Runes support',
			'No Tailwind dependances',
			'Tailwind support',
			'UnoCss support',
			'CSS standard support',
			'Dependencies dev/build',
			'Eslint support (testTEMP long value for testing css , soooo looooonnngg ! yeah ! LEROYYYYYY JEYYYKINNNNNNSSSS !!!!!) '
		]
	},
	{
		text: 'Integration and support',
		subject: ['CLI integrated', 'Full open and free', 'Release cadence']
	}
];

export const tableHomeList: TableHomeList[] = [
	{
		title: 'Lapikit',
		logo: LapikitLogo,
		values: [
			[nbComponents, 'yes', nbHooks],
			['yes', 'yes', 'yes', 'yes', 'yes', '27 / 1', 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Skeleton',
		logo: Skeleton,
		values: [
			[42, 'yes', 'no'],
			['yes', 'no', 'yes', 'partial', 'yes', '0 / 32', 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Shadcn Svelte',
		logo: ShadcnSvelte,
		values: [
			[62, 'yes', 2],
			['yes', 'no', 'yes', 'no', 'yes', '25 / 4', 'yes'],
			['yes', 'yes', 'Bi-Monthly']
		]
	},
	{
		title: 'Melt UI',
		logo: MeltUI,
		values: [
			[18, 'yes', 'no'],
			['partial', 'no', 'yes', 'partial', 'yes', '10 / 5', 'yes'],
			['yes', 'yes', 'Monthly']
		]
	}
];
