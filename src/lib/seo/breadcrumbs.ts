import type { BreadcrumbItem, BreadcrumbListSchema } from '$lib/types';

export function getBreadcrumbStructuredData(
	items: BreadcrumbItem[],
	origin: string
): BreadcrumbListSchema | null {
	if (items.length < 2) {
		return null;
	}

	const normalizedOrigin = origin.replace(/\/$/, '');
	const schemaItems = items.filter((item, index) => item.href || index === items.length - 1);

	if (schemaItems.length < 2) {
		return null;
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: schemaItems.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			...(item.href ? { item: `${normalizedOrigin}${item.href}` } : {})
		}))
	};
}
