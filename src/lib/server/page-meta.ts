import { getBreadcrumbs } from './breadcrumbs';
import { site } from './content';

export function pageMeta(pathname: string) {
	const seo = site.byPath.get(pathname);
	if (!seo) throw new Error(`Missing page in the content index: ${pathname}`);

	return { seo, breadcrumbs: getBreadcrumbs(pathname) };
}
