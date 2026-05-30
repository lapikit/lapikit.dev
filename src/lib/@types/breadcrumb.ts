import type { Pathname } from '$app/types';

export type BreadcrumbItem = {
	label: string;
	href?: Pathname;
};

export type BreadcrumbListSchema = {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item?: string;
	}>;
};
