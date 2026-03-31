<script lang="ts">
	import { resolve } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import type { ConsentState } from '$lib/hooks';
	import {
		loadGtag,
		sendPageView,
		sendPageViewGTM,
		updateConsent,
		updateConsentGTM
	} from '$lib/hooks';
	import { deleteCookie, getCookie, setCookie } from '$lib/utils';
	import { consent_cookie } from '$lib/constants';

	const gtmID = env.PUBLIC_GTM_ID?.trim() ?? '';
	const gtagID = env.PUBLIC_GTAG_ID?.trim() ?? '';

	type TrackingProvider = 'gtag' | 'gtm' | null;
	type ConsentView = 'summary' | 'customize';

	const provider: TrackingProvider = gtmID ? 'gtm' : gtagID ? 'gtag' : null;

	let analyticsReady = $state(false);
	let consent = $state<ConsentState | null>(null);
	let analyticsEnabled = $state(false);
	let open = $state(false);
	let view = $state<ConsentView>('summary');

	onMount(() => {
		if (!provider) return;

		const savedConsent = getCookie(consent_cookie);
		if (savedConsent === 'accept' || savedConsent === 'refuse') {
			analyticsEnabled = savedConsent === 'accept';
			void applyConsent(savedConsent);
			return;
		}

		open = true;
		view = 'summary';
	});

	afterNavigate(() => {
		if (consent !== 'accept' || !analyticsReady) return;
		sendCurrentPageView();
	});

	async function applyConsent(state: ConsentState, persist = false) {
		consent = state;
		analyticsEnabled = state === 'accept';

		if (persist) {
			setCookie(consent_cookie, state, 180);
		}

		open = false;

		if (state === 'refuse') {
			updateLoadedConsent('refuse');
			analyticsReady = false;
			clearAnalyticsCookies();
			return;
		}

		await loadTrackingProvider();
		updateLoadedConsent('accept');
		sendCurrentPageView();
	}

	function saveCustomPreferences() {
		void applyConsent(analyticsEnabled ? 'accept' : 'refuse', true);
	}

	function openPreferences() {
		view = 'customize';
		open = true;
	}

	async function loadTrackingProvider() {
		if (analyticsReady || !provider) return;

		if (provider === 'gtm') {
			await loadGtagManager();
		} else {
			await loadGoogleTag();
		}

		analyticsReady = true;
	}

	function updateLoadedConsent(state: ConsentState) {
		if (provider === 'gtm') {
			updateConsentGTM(state);
			return;
		}

		if (provider === 'gtag') {
			updateConsent(state);
		}
	}

	function sendCurrentPageView() {
		if (provider === 'gtm') {
			sendPageViewGTM(window.location.pathname, document.title);
			return;
		}

		if (provider === 'gtag') {
			sendPageView(window.location.pathname, document.title);
		}
	}

	function loadGtagManager() {
		return import('$lib/hooks').then(({ loadGTM }) => loadGTM(gtmID));
	}

	function loadGoogleTag() {
		return loadGtag(gtagID);
	}

	function clearAnalyticsCookies() {
		if (typeof document === 'undefined') return;

		const analyticsCookieNames = document.cookie
			.split(';')
			.map((entry) => entry.trim().split('=')[0])
			.filter(
				(name) =>
					name === '_ga' ||
					name === '_gid' ||
					name.startsWith('_ga_') ||
					name.startsWith('_gat') ||
					name.startsWith('_dc_gtm_')
			);

		for (const name of analyticsCookieNames) {
			deleteCookie(name);
		}
	}
</script>

{#if provider && open}
	<div role="dialog" aria-labelledby="consent-title">
		<div>
			{#if view === 'summary'}
				<p>Privacy</p>
				<h2>Choose what Lapikit can store on your device.</h2>
				<p>
					Required cookies keep the site working and remember your privacy choices. Audience
					measurement cookies are optional and help us understand how the documentation is used. You
					can accept, refuse, or customize your choice now, then change it later from the
					<a href={resolve('/terms')}>legal notices page</a> or the cookie settings button.
				</p>
				<div>
					<button type="button" onclick={() => (view = 'customize')}> Customize </button>
					<button type="button" onclick={() => void applyConsent('refuse', true)}>
						Refuse optional cookies
					</button>
					<button type="button" onclick={() => void applyConsent('accept', true)}>
						Accept analytics
					</button>
				</div>
			{:else}
				<p>Cookie preferences</p>
				<h2>Fine-tune your consent.</h2>
				<p>
					Only the audience measurement category is optional on this site. Required cookies stay
					active because they are needed for core features like saving your consent choice.
				</p>
				<div>
					<section>
						<div>
							<h3>Necessary cookies</h3>
							<p>
								Required for core site functions and for storing your privacy preference. These are
								always active.
							</p>
						</div>
						<div aria-label="Necessary cookies are always active">Always on</div>
					</section>
					<section aria-labelledby="analytics-title">
						<div>
							<h3>Audience measurement</h3>
							<p>
								Helps us measure visits and understand which pages are useful, using Google tagging
								tools only after your consent.
							</p>
						</div>
						<label>
							<span>Enable audience measurement cookies</span>
							<input type="checkbox" bind:checked={analyticsEnabled} />
							<span aria-hidden="true"></span>
						</label>
					</section>
				</div>
				<div>
					<button type="button" onclick={() => (view = 'summary')}> Back </button>
					<button type="button" onclick={() => void applyConsent('refuse', true)}>
						Only necessary cookies
					</button>
					<button type="button" onclick={saveCustomPreferences}> Save choices </button>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if provider && consent}
	<button type="button" onclick={openPreferences}> Cookie settings </button>
{/if}
