import { sheets } from './content';
import { pageMeta } from './page-meta';
import { renderMarkdown } from './renderer';

export function renderSheetPage(pathname: string) {
	const page = sheets[pathname];
	if (!page) throw new Error(`Missing page: ${pathname}`);

	const { title, category } = page.summary;
	const { blocks, summary } = renderMarkdown(page.source, page.file);

	return { ...pageMeta(pathname), sheet: { title, category, summary, blocks } };
}
