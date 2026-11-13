import { renderSheetPage } from '$lib/server/sheet-pages';

export function load() {
	return renderSheetPage('/docs');
}
