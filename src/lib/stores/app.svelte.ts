import type { pkg_manager, lang_manager } from '$lib/constants';

export type PkgManager = keyof typeof pkg_manager;
export type LangManager = keyof typeof lang_manager;

export const application: {
	pkg_selected: PkgManager;
	lang_selected: LangManager;
} = $state({
	pkg_selected: 'npm',
	lang_selected: 'typescript'
});
