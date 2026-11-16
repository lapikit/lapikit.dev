import type { ConsentState } from './gtag';

function ensureGTM() {
	if (typeof window === 'undefined') return false;

	window.dataLayer = window.dataLayer || [];
	window.gtag =
		window.gtag ||
		((...args: unknown[]) => {
			window.dataLayer.push(args);
		});

	return true;
}

export function setDefaultConsentGTM() {
	if (!ensureGTM()) return;

	window.gtag?.('consent', 'default', {
		ad_storage: 'denied',
		analytics_storage: 'denied',
		functionality_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
}

export function loadGTM(gtmID: string): Promise<void> {
	if (typeof window === 'undefined' || typeof document === 'undefined' || !gtmID) {
		return Promise.resolve();
	}

	setDefaultConsentGTM();

	if (document.getElementById('gtm-script')) {
		return Promise.resolve();
	}

	window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.id = 'gtm-script';
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmID}`;
		script.onload = () => resolve();
		script.onerror = () => resolve();
		document.head.appendChild(script);
	});
}

export function updateConsentGTM(state: ConsentState) {
	if (!ensureGTM()) return;

	window.gtag?.('consent', 'update', {
		ad_storage: 'denied',
		analytics_storage: state === 'accept' ? 'granted' : 'denied',
		functionality_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
}

export function sendPageViewGTM(path: string, title: string) {
	if (!ensureGTM() || typeof window === 'undefined') return;

	window.dataLayer.push({
		event: 'page_view',
		page_path: path,
		page_title: title,
		page_location: window.location.href
	});
}
