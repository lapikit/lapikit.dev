<script lang="ts">
	import { PUBLIC_DEV } from '$env/static/public';

	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { onMount, setContext } from 'svelte';
	import { createGlobalTheme } from 'lapikit/actions';
	import { getBreadcrumbStructuredData, getBreadcrumbs, seoByPath } from '$lib';
	import { capitalize } from '$lib/utils';

	// components
	import ConsentMode from '../components/consent-mode.svelte';

	// api
	import { loadNpmData } from '$lib/stores/npm.svelte';

	// images
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const app = createGlobalTheme();

	import './layout.css';
	import SearchV2 from '$components/search-v2.svelte';

	onMount(() => {
		if (browser) loadNpmData();
	});

	const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const seo = $derived(seoByPath[path] ?? seoByPath['/']);
	const seoTitle = $derived(getHeadString(seo.head, 'title') ?? seo.title);
	const seoDescription = $derived(getHeadString(seo.head, 'description') ?? `Read ${seo.title}.`);
	const seoType = $derived(seo.type === 'website' ? 'website' : 'article');
	const canonicalUrl = $derived(`${page.url.origin}${path === '/' ? '' : path}`);
	const pageTitle = $derived(
		`${capitalize(seoTitle)} • ${path === '/' ? 'Svelte Components Library' : 'Lapikit Svelte Components'}`
	);
	const breadcrumbs = $derived(getBreadcrumbs(path));
	const breadcrumbSchema = $derived(getBreadcrumbStructuredData(breadcrumbs, page.url.origin));
	const breadcrumbSchemaTag = $derived(breadcrumbSchema ? toJsonLdScriptTag(breadcrumbSchema) : '');

	function getHeadString(head: unknown, key: 'title' | 'description') {
		if (typeof head !== 'object' || head === null) return undefined;
		const value = (head as Record<string, unknown>)[key];
		return typeof value === 'string' && value.trim() ? value.trim() : undefined;
	}

	function toJsonLdScriptTag(data: unknown) {
		const json = JSON.stringify(data).replace(/</g, '\\u003c');

		// eslint-disable-next-line no-useless-escape
		return `<script type="application/ld+json">${json}<\/script>`;
	}

	// states
	let searchOpen = $state(false);

	$effect(() => {
		console.log('GW1 SEO', seo);
	});

	setContext('search', {
		get open() {
			return searchOpen;
		},
		toggle() {
			searchOpen = !searchOpen;
		}
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
	<meta name="description" content={seoDescription} />
	<meta
		name="robots"
		content={PUBLIC_DEV === 'true'
			? 'noindex, nofollow'
			: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
	/>
	<meta name="generator" content="Lapikit" />
	<meta name="application-name" content="Lapikit" />
	<meta name="referrer" content="strict-origin-when-cross-origin" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Lapikit" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:type" content={seoType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={seoDescription} />

	<meta name="color-scheme" content="light dark" />

	{@html breadcrumbSchemaTag}
</svelte:head>

<kit:app>
	<!-- <p>Thème actif : {app.active}</p> -->
	<!-- <main> -->
	{@render children()}
	<!-- </main> -->

	<ConsentMode />
	<SearchV2 bind:open={searchOpen} />
</kit:app>

<style>
	:global(:root) {
		--lpk-page-padding-side: 2rem;
		--lpk-page-padding-top: 2rem;
		--lpk-page-padding-bottom: 4rem;
	}
</style>
