import type { Pathname } from '$app/types';
import type { BreadcrumbItem } from '$lib/types';
import { docs, site } from './content';

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

function getDocsBreadcrumbs(pathname: string) {
	const segments = pathname
		.replace(/^\/docs\//, '')
		.split('/')
		.filter(Boolean);
	const items: BreadcrumbItem[] = [{ label: 'Documentation', href: toPathname('/docs') }];

	for (let index = 0; index < segments.length; index += 1) {
		const href = `/docs/${segments.slice(0, index + 1).join('/')}`;
		const isLast = index === segments.length - 1;

		items.push({
			label: formatSegmentLabel(segments[index]),
			href: isLast || href in docs.pages ? toPathname(href) : undefined
		});
	}

	return items;
}

function getPathLabel(pathname: string) {
	return (
		site.byPath.get(pathname)?.title ??
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
