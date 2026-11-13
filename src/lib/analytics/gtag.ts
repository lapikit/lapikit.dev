export type ConsentState = 'accept' | 'refuse';

function ensureGtag() {
	if (typeof window === 'undefined') return false;

	window.dataLayer = window.dataLayer || [];
	window.gtag =
		window.gtag ||
		((...args: unknown[]) => {
			window.dataLayer.push(args);
		});

	return true;
}

export function setDefaultConsent() {
	if (!ensureGtag()) return;

	window.gtag?.('consent', 'default', {
		ad_storage: 'denied',
		analytics_storage: 'denied',
		functionality_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
}

export function loadGtag(gtagID: string): Promise<void> {
	if (typeof window === 'undefined' || typeof document === 'undefined' || !gtagID) {
		return Promise.resolve();
	}

	setDefaultConsent();

	if (document.getElementById('gtag-script')) {
		return Promise.resolve();
	}

	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.id = 'gtag-script';
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagID}`;
		script.onload = () => {
			window.gtag?.('js', new Date());
			window.gtag?.('config', gtagID, { send_page_view: false });
			resolve();
		};
		script.onerror = () => resolve();
		document.head.appendChild(script);
	});
}

export function sendPageView(path: string, title: string) {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

	window.gtag('event', 'page_view', {
		page_path: path,
		page_title: title,
		page_location: window.location.href
	});
}

export function updateConsent(state: ConsentState) {
	if (!ensureGtag()) return;

	window.gtag?.('consent', 'update', {
		ad_storage: 'denied',
		analytics_storage: state === 'accept' ? 'granted' : 'denied',
		functionality_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
}
