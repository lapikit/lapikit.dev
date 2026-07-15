<script lang="ts">
	import { PUBLIC_DEV } from '$env/static/public';

	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createGlobalTheme } from 'lapikit/actions';
	import { docsSeoByPath, getBreadcrumbStructuredData, getBreadcrumbs, seoByPath } from '$lib';
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

	onMount(() => {
		if (browser) loadNpmData();
	});

	const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const seo = $derived(docsSeoByPath[path] ?? seoByPath[path] ?? seoByPath['/']);
	const canonicalUrl = $derived(`${page.url.origin}${path === '/' ? '' : path}`);
	const pageTitle = $derived(
		`${capitalize(seo.title)} • ${path === '/' ? 'Svelte Components Library' : 'Lapikit Svelte Components'}`
	);
	const breadcrumbs = $derived(getBreadcrumbs(path));
	const breadcrumbSchema = $derived(getBreadcrumbStructuredData(breadcrumbs, page.url.origin));
	const breadcrumbSchemaTag = $derived(breadcrumbSchema ? toJsonLdScriptTag(breadcrumbSchema) : '');

	function toJsonLdScriptTag(data: unknown) {
		const json = JSON.stringify(data).replace(/</g, '\\u003c');

		// eslint-disable-next-line no-useless-escape
		return `<script type="application/ld+json">${json}<\/script>`;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
	<meta name="description" content={seo.description} />
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
	<meta property="og:description" content={seo.description} />
	<meta property="og:type" content={seo.type ?? 'website'} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={seo.description} />

	<meta name="color-scheme" content="light dark" />

	{@html breadcrumbSchemaTag}
</svelte:head>

<kit:app>
	<!-- <p>Thème actif : {app.active}</p> -->
	<main>
		{@render children()}
	</main>

	<ConsentMode />
</kit:app>
