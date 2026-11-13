import type { pkg_manager, lang_manager } from '$lib/constants';

export type PkgManager = keyof typeof pkg_manager;
export type LangManager = keyof typeof lang_manager;

export const preferences: {
	pkg_selected: PkgManager;
	lang_selected: LangManager;
} = $state({
	pkg_selected: 'npm',
	lang_selected: 'typescript'
});

type ConsentView = 'summary' | 'customize';

export const consentState = $state({
	open: false,
	view: 'summary' as ConsentView
});

export function openConsentPreferences() {
	consentState.view = 'customize';
	consentState.open = true;
}
