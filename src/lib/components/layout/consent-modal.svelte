<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_GTM_ID, PUBLIC_GTAG_ID } from '$env/static/public';
	import { onMount } from 'svelte';
	import type { ConsentState } from '$lib/analytics';
	import {
		loadGTM,
		loadGtag,
		sendPageView,
		sendPageViewGTM,
		updateConsent,
		updateConsentGTM
	} from '$lib/analytics';
	import { deleteCookie, getCookie, setCookie } from '$lib/utils';
	import { consent_cookie } from '$lib/constants';
	import { consentState } from '$lib/state/ui.svelte';

	import { ArrowLeft } from 'lucide-svelte';

	const gtmID = PUBLIC_GTM_ID?.trim() ?? '';
	const gtagID = PUBLIC_GTAG_ID?.trim() ?? '';

	type TrackingProvider = 'gtag' | 'gtm' | null;

	const provider: TrackingProvider = gtmID ? 'gtm' : gtagID ? 'gtag' : null;

	let analyticsReady = $state(false);
	let consent = $state<ConsentState | null>(null);
	let analyticsEnabled = $state(false);
	let acceptButton: HTMLElement | null = $state(null);

	$effect(() => {
		if (consentState.open && consentState.view === 'summary') acceptButton?.focus();
	});

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
		return loadGTM(gtmID);
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
	<kit:dialog
		bind:open={consentState.open}
		persistent
		size="sm"
		rounded="0"
		color="surface"
		classContent="consent-dialog"
		aria-labelledby="consent-title"
	>
		{#if consentState.view === 'summary'}
			<header class="consent-head">
				<p class="consent-eyebrow">// Privacy</p>
				<h2 id="consent-title" class="consent-title">
					Choose what Lapikit can store on your device.
				</h2>
				<p class="consent-text">
					Lapikit and our partners use cookies or similar technologies to improve the site and your
					experience, ensure the site works properly, and collect statistics to optimize the
					services offered. You can change your choice later from the cookie settings link in the
					footer.
				</p>
			</header>

			<div class="consent-actions">
				<kit:btn
					class="consent-customize"
					variant="text"
					rounded="md"
					onclick={() => (consentState.view = 'customize')}
				>
					Customize
				</kit:btn>
				<kit:btn variant="outline" rounded="md" onclick={() => void applyConsent('refuse', true)}>
					Decline
				</kit:btn>
				<kit:btn
					bind:ref={acceptButton}
					color="accent"
					rounded="md"
					onclick={() => void applyConsent('accept', true)}
				>
					Accept all
				</kit:btn>
			</div>
		{:else}
			<header class="consent-head">
				<div class="consent-head-top">
					<p class="consent-eyebrow">// Cookie preferences</p>
					<kit:btn
						variant="text"
						size="sm"
						density="compact"
						rounded="md"
						onclick={() => (consentState.view = 'summary')}
					>
						{#snippet prepend()}
							<kit:icon size="sm"><ArrowLeft /></kit:icon>
						{/snippet}
						Back
					</kit:btn>
				</div>
				<h2 id="consent-title" class="consent-title">Fine-tune your consent.</h2>
				<p class="consent-text">
					Only the audience measurement category is optional on this site. Required cookies stay
					active because they are needed for core features like saving your consent choice.
				</p>
			</header>

			<ul class="consent-categories">
				<li class="consent-category">
					<div>
						<p class="consent-category-name">Necessary cookies</p>
						<p class="consent-category-text">
							Required for core site functions and for storing your privacy preference.
						</p>
					</div>
					<span class="consent-always">Always on</span>
				</li>
				<li class="consent-category">
					<div>
						<p id="consent-analytics" class="consent-category-name">Audience measurement</p>
						<p id="consent-analytics-text" class="consent-category-text">
							Helps us measure visits and understand which pages are useful, using Google tagging
							tools only after your consent.
						</p>
					</div>
					<label class="consent-switch">
						<input
							type="checkbox"
							role="switch"
							aria-labelledby="consent-analytics"
							aria-describedby="consent-analytics-text"
							bind:checked={analyticsEnabled}
						/>
						<span class="consent-switch-track" aria-hidden="true"></span>
					</label>
				</li>
			</ul>

			<div class="consent-actions">
				<kit:btn variant="outline" rounded="md" onclick={() => void applyConsent('refuse', true)}>
					Only necessary
				</kit:btn>
				<kit:btn color="accent" rounded="md" onclick={saveCustomPreferences}>Save choices</kit:btn>
			</div>
		{/if}
	</kit:dialog>
{/if}

<style lang="scss">
	:global(div.kit-dialog__content.consent-dialog) {
		padding: 0;
		border: var(--lapikit-border);
	}

	.consent-head {
		display: grid;
		gap: 10px;
		padding: var(--lapikit-spacing-block);
	}

	.consent-head-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.consent-eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--kit-color-accent);
	}

	.consent-title {
		margin: 0;
		font-size: var(--text-2xl);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
	}

	.consent-text {
		margin: 0;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	.consent-categories {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: var(--lapikit-border);
	}

	.consent-category {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px var(--lapikit-spacing-block);

		& + & {
			border-top: 1px solid var(--kit-color-border);
		}
	}

	.consent-category-name {
		margin: 0;
		font-weight: 600;
	}

	.consent-category-text {
		margin: 4px 0 0;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.consent-always {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.consent-switch {
		position: relative;
		flex-shrink: 0;
		display: inline-flex;
		cursor: pointer;

		input {
			position: absolute;
			inset: 0;
			z-index: 1;
			margin: 0;
			opacity: 0;
			cursor: inherit;
		}
	}

	.consent-switch-track {
		position: relative;
		width: 44px;
		height: 24px;
		border: var(--lapikit-border);
		border-radius: 999px;
		background-color: var(--kit-color-surface-1);
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;

		&::after {
			content: '';
			position: absolute;
			top: 2px;
			left: 2px;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background-color: var(--kit-color-text-muted);
			transition:
				transform 0.2s ease,
				background-color 0.2s ease;
		}

		input:checked + & {
			border-color: var(--kit-color-accent);
			background-color: var(--kit-color-accent);

			&::after {
				background-color: var(--kit-color-surface);
				transform: translateX(20px);
			}
		}

		input:focus-visible + & {
			outline: 2px solid var(--kit-color-accent);
			outline-offset: 2px;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;

			&::after {
				transition: none;
			}
		}
	}

	.consent-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 8px;
		padding: 16px var(--lapikit-spacing-block);
		border-top: var(--lapikit-border);

		:global(.consent-customize) {
			margin-right: auto;
		}
	}
</style>
