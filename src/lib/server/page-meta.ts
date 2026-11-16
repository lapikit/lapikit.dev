import type { DocSummary, PageSeo } from '$lib/types';
import { getBreadcrumbs } from './breadcrumbs';
import { site } from './content';

function toSeo({ title, type, state, lastModified, head }: DocSummary): PageSeo {
	return {
		title,
		...(typeof type === 'string' && { type }),
		...(state && { state }),
		...(lastModified && { lastModified }),
		...(head && { head: { title: head.title, description: head.description } })
	};
}

export function pageMeta(pathname: string) {
	const summary = site.byPath.get(pathname);
	if (!summary) throw new Error(`Missing page in the content index: ${pathname}`);

	return { seo: toSeo(summary), breadcrumbs: getBreadcrumbs(pathname) };
}
