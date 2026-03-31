<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import ConsentMode from '$lib/components/consent-mode.svelte';
	import Search from '$lib/components/search.svelte';
	import { docsSeoByPath } from '$lib';
	import {
		defaultSeo,
		getBreadcrumbStructuredData,
		getBreadcrumbs,
		seoByPath,
		siteDefaultUrl,
		siteDescription,
		siteName
	} from '$lib';

	let { children } = $props();

	const normalizedPath = $derived(
		page.url.pathname === '/' ? '/' : page.url.pathname.replace(/\/$/, '')
	);
	const seo = $derived(docsSeoByPath[normalizedPath] ?? seoByPath[normalizedPath] ?? defaultSeo);
	const siteUrl = $derived(
		(PUBLIC_BASE_URL || page.url.origin || siteDefaultUrl).replace(/\/$/, '')
	);
	const canonicalUrl = $derived(`${siteUrl}${normalizedPath === '/' ? '' : normalizedPath}`);
	const pageTitle = $derived(
		normalizedPath === '/' ? `${siteName} | ${seo.title}` : `${seo.title} | ${siteName}`
	);
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
	const breadcrumbSchema = $derived(getBreadcrumbStructuredData(breadcrumbs, siteUrl));
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
	<meta name="description" content={seo.description} />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta name="generator" content={siteName} />
	<meta name="application-name" content={siteName} />
	<meta name="referrer" content="strict-origin-when-cross-origin" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:type" content={seo.type ?? 'website'} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={seo.description} />

	{@html breadcrumbSchemaTag}
</svelte:head>

<header>
	<p><a href={resolve('/')}>{siteName}</a></p>
	<p>{siteDescription}</p>
</header>

<main id="content">
	<Breadcrumbs items={breadcrumbs} />
	<Search />
	{@render children()}
</main>

<ConsentMode />
