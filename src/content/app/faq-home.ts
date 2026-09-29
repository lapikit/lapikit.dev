import { links, nbComponents, nbHooks } from '$lib/constants';
import type { Icon as IconType } from 'lucide-svelte';

// assets
import { Mail, TrafficCone } from 'lucide-svelte';

type Faq = {
	question: string;
	message: string[];
};

type Contact = {
	icon: typeof IconType | string;
	label: string;
	url: string;
	description: string;
	color: string;
	background: string;
};

export const faqHome: Faq[] = [
	{
		question: 'What is included in Lapikit?',
		message: [
			`You'll start with ${nbComponents} Lapikit components, ${nbHooks} utility functions, and a full-featured preprocessor that will allow you to harness the full power of Lapikit directly within your project.`,
			'The goal is to offer you new components with each release to ensure support for new needs. All of this is open-source and free.'
		]
	},
	{
		question: 'How easy is Lapikit to use?',
		message: [
			'Lapikit was designed to reduce common frustrations in front-end development. From installation and configuration to familiar component conventions, its workflow is designed to make integration into Svelte projects straightforward.',
			'JavaScript knowledge is required, and familiarity with Svelte is recommended.'
		]
	},
	{
		question: 'Does Lapikit support Svelte 5 Runes?',
		message: [
			'Since Lapikit version 0.4, the core has been based on Svelte 5 and natively supports Runes.'
		]
	},
	{
		question: 'Can I use TypeScript with Lapikit?',
		message: [
			'Yes, you can build your project using TypeScript! In fact, Lapikit itself is developed using TypeScript.',
			'Depending on the components you integrate, some of them natively offer TypeScript interfaces to make your development process easier.'
		]
	},
	{
		question: 'Can I use TailwindCSS/UnoCSS/Bootstrap with Lapikit?',
		message: [
			'Lapikit was designed not to depend on any external libraries to ensure there are no conflicts when used with other libraries.',
			'So yes, you can use any libraries with Lapikit. The only limit is your imagination.'
		]
	},
	{
		question: 'Why does Lapikit have few dependencies?',
		message: [
			'This is a broad topic, but there are three main reasons: security, maintainability, and compatibility with other libraries.',
			'Reducing dependencies makes it simpler to maintain the project while minimizing potential conflicts with other tools used in your application.'
		]
	},
	{
		question: 'Can I use Lapikit to create a product and sell it?',
		message: [
			'Yes, Lapikit is licensed under the MIT License. Mentioning Lapikit in your project is appreciated but not required.',
			"If you build something with Lapikit, we'd also love to see and share what you've created."
		]
	},
	{
		question: 'How often is Lapikit updated?',
		message: [
			'We try to release a new version every two months and provide patch notes every two weeks.'
		]
	}
];

export const faqContact: Contact[] = [
	{
		icon: Mail,
		label: 'contact@lapikit.dev',
		url: 'mailto:contact@lapikit.dev',
		description: 'priority replies for Sponsor customers',
		color: 'on-accent',
		background: 'accent'
	},
	{
		icon: links['discord'].icon,
		label: '@discord/lapikit',
		url: links['discord'].url,
		description: 'share, support and news with Lapikit Team',
		color: links['discord']._styles.color,
		background: links['discord']._styles.background
	},
	{
		icon: TrafficCone,
		label: 'See the roadmap',
		url: '/docs/roadmap',
		description: 'what the plan for 2026 ?',
		color: 'on-svelte',
		background: 'svelte'
	}
];
