<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_GTM_ID, PUBLIC_GTAG_ID } from '$env/static/public';
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
	import { consentState } from '$lib/stores/consent.svelte';

	const gtmID = PUBLIC_GTM_ID?.trim() ?? '';
	const gtagID = PUBLIC_GTAG_ID?.trim() ?? '';

	type TrackingProvider = 'gtag' | 'gtm' | null;

	const provider: TrackingProvider = gtmID ? 'gtm' : gtagID ? 'gtag' : null;

	let analyticsReady = $state(false);
	let consent = $state<ConsentState | null>(null);
	let analyticsEnabled = $state(false);

	onMount(() => {
		if (!provider) return;

		const savedConsent = getCookie(consent_cookie);
		if (savedConsent === 'accept' || savedConsent === 'refuse') {
			analyticsEnabled = savedConsent === 'accept';
			void applyConsent(savedConsent);
			return;
		}

		consentState.open = true;
		consentState.view = 'summary';
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

		consentState.open = false;

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

{#if provider && consentState.open}
	<kit:dialog bind:open={consentState.open} persistent size="sm">
		{#if consentState.view === 'summary'}
			<kit:toolbar>
				<p>Privacy</p>
				<kit:spacer />
				<kit:btn variant="link" size="sm" onclick={() => void applyConsent('refuse', true)}>
					Decline non-essential cookies
				</kit:btn>
			</kit:toolbar>

			<p class="text-xl font-bold">Choose what Lapikit can store on your device.</p>
			<p class="my-4">
				Lapikit and our partners use cookies or similar technologies to enable us to improve the
				site, your experience and to ensure the proper functioning of the site, to collect
				statistics in order to optimize the services offered, and to adapt Lapikit's content. Then
				change it later from the the cookie settings button.
			</p>
			<kit:toolbar classContent="justify-end!">
				<kit:btn variant="text" onclick={() => (consentState.view = 'customize')}>Customize</kit:btn
				>
				<kit:btn onclick={() => void applyConsent('accept', true)}>Accept all</kit:btn>
			</kit:toolbar>
		{:else}
			<kit:toolbar>
				<p>Cookie preferences</p>
				<kit:spacer />
				<kit:btn variant="link" onclick={() => (consentState.view = 'summary')}>Back</kit:btn>
			</kit:toolbar>
			<h2 class="text-xl font-bold">Fine-tune your consent.</h2>
			<p class="my-4">
				Only the audience measurement category is optional on this site. Required cookies stay
				active because they are needed for core features like saving your consent choice.
			</p>
			<kit:list class="max-w-[80%]">
				<kit:list-item>
					<div>
						<strong>Necessary cookies</strong>
						<p class="whitespace-normal">
							Required for core site functions and for storing your privacy preference. These are
							always active.
						</p>
					</div>
					{#snippet append()}
						<kit:chip variant="filled" disabled>Always on</kit:chip>
					{/snippet}
				</kit:list-item>
				<kit:list-item>
					<div>
						<strong>Audience measurement</strong>
						<p class="whitespace-normal">
							Helps us measure visits and understand which pages are useful, using Google tagging
							tools only after your consent.
						</p>
					</div>
					{#snippet append()}
						<label aria-label="Toggle audience measurement cookies">
							<span class="sr-only">Enable audience measurement cookies</span>
							<input type="checkbox" class="sr-only" bind:checked={analyticsEnabled} />
							<span class="toggle" class:on={analyticsEnabled} aria-hidden="true"></span>
						</label>
					{/snippet}
				</kit:list-item>
			</kit:list>

			<kit:toolbar classContent="justify-end!">
				<kit:btn variant="outline" onclick={() => void applyConsent('refuse', true)}>
					Only necessary cookies
				</kit:btn>
				<kit:btn onclick={saveCustomPreferences}>Save choices</kit:btn>
			</kit:toolbar>
		{/if}
	</kit:dialog>
{/if}

<style>
	.toggle {
		position: relative;
		display: inline-block;
		width: 2.5rem;
		height: 1.5rem;
		border-radius: 9999px;
		background-color: #e4e4e7;
		transition: background-color 0.2s;
		flex-shrink: 0;
	}

	.toggle::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		background-color: rgb(255, 255, 255);
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.08);
		transition: transform 0.2s;
	}

	.toggle.on {
		background-color: #18181b;
	}

	.toggle.on::after {
		transform: translateX(1rem);
	}

	:global(.consent-settings-btn) {
		position: fixed !important;
		bottom: 1rem;
		left: 1rem;
		z-index: 40;
	}
</style>
