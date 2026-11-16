import { onMount } from 'svelte';
import { pkg_manager, lang_manager } from '$lib/constants';

export type PkgManager = keyof typeof pkg_manager;
export type LangManager = keyof typeof lang_manager;

export const preferences: {
	pkg_selected: PkgManager;
	lang_selected: LangManager;
} = $state({
	pkg_selected: 'npm',
	lang_selected: 'typescript'
});

const preferences_key = 'lapikit.dev:preferences';

const isPkgManager = (value: unknown): value is PkgManager =>
	typeof value === 'string' && value in pkg_manager;

const isLangManager = (value: unknown): value is LangManager =>
	typeof value === 'string' && value in lang_manager;

function restorePreferences() {
	try {
		const saved = JSON.parse(localStorage.getItem(preferences_key) ?? '{}');
		if (isPkgManager(saved.pkg_selected)) preferences.pkg_selected = saved.pkg_selected;
		if (isLangManager(saved.lang_selected)) preferences.lang_selected = saved.lang_selected;
	} catch {
		return;
	}
}

function savePreferences(value: string) {
	try {
		localStorage.setItem(preferences_key, value);
	} catch {
		return;
	}
}

export function persistPreferences() {
	onMount(() => {
		restorePreferences();

		return $effect.root(() => {
			$effect(() => {
				savePreferences(
					JSON.stringify({
						pkg_selected: preferences.pkg_selected,
						lang_selected: preferences.lang_selected
					})
				);
			});
		});
	});
}

type ConsentView = 'summary' | 'customize';

export const consentState = $state({
	open: false,
	view: 'summary' as ConsentView
});

export function openConsentPreferences() {
	consentState.view = 'customize';
	consentState.open = true;
}
