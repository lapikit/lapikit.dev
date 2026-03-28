import type { Pathname } from '$app/types';
import type { BreadcrumbItem, BreadcrumbListSchema } from './@types';
import { seoByPath, siteDefaultUrl } from './constants';
import { docsByPath } from './registry';

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
	const normalizedPath = normalizePath(pathname);
	const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: toPathname('/') }];

	if (normalizedPath === '/') {
		return breadcrumbs;
	}

	if (normalizedPath === '/docs') {
		return [...breadcrumbs, { label: 'Documentation', href: toPathname('/docs') }];
	}

	if (normalizedPath.startsWith('/docs/')) {
		return [...breadcrumbs, ...getDocsBreadcrumbs(normalizedPath)];
	}

	return [
		...breadcrumbs,
		{ label: getPathLabel(normalizedPath), href: toPathname(normalizedPath) }
	];
}

export function getBreadcrumbStructuredData(
	items: BreadcrumbItem[],
	origin = siteDefaultUrl
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
			...(item.href ? { item: `${normalizedOrigin}${item.href === '/' ? '' : item.href}` } : {})
		}))
	};
}

function getDocsBreadcrumbs(pathname: string) {
	const segments = pathname
		.replace(/^\/docs\//, '')
		.split('/')
		.filter(Boolean);
	const items: BreadcrumbItem[] = [{ label: 'Documentation', href: toPathname('/docs') }];

	for (let index = 0; index < segments.length; index += 1) {
		const href = `/docs/${segments.slice(0, index + 1).join('/')}`;
		const label = docsByPath.get(href)?.metadata.title ?? formatSegmentLabel(segments[index]);
		const isLast = index === segments.length - 1;

		items.push({
			label,
			href: isLast || docsByPath.has(href) ? toPathname(href) : undefined
		});
	}

	return items;
}

function getPathLabel(pathname: string) {
	return (
		seoByPath[pathname]?.title ??
		formatSegmentLabel(pathname.split('/').filter(Boolean).at(-1) ?? '')
	);
}

function formatSegmentLabel(segment: string) {
	return segment
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function normalizePath(pathname: string) {
	if (!pathname || pathname === '/') {
		return '/';
	}

	return pathname.replace(/\/$/, '');
}

function toPathname(pathname: string): Pathname {
	return pathname as Pathname;
}
