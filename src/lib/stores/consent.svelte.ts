type ConsentView = 'summary' | 'customize';

export const consentState = $state({
	open: false,
	view: 'summary' as ConsentView
});

export function openConsentPreferences() {
	consentState.view = 'customize';
	consentState.open = true;
}
