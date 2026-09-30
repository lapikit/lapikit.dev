<script lang="ts">
	import type { LayoutProps } from './$types';
	import { PUBLIC_BASE_URL, PUBLIC_DEV } from '$env/static/public';

	import { page } from '$app/state';
	import { setContext, untrack } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	import { getBreadcrumbStructuredData, getBreadcrumbs } from '$lib/breadcrumbs';
	import { seoByPath } from '$lib/constants';
	import { capitalize } from '$lib/utils';
	import { setNpmStats } from '$lib/stores/npm.svelte';

	// components
	import ConsentMode from '$lib/components/consent-modal.svelte';
	import ConsoleMessage from '$lib/components/console-message.svelte';

	let { children, data }: LayoutProps = $props();

	import '@fontsource-variable/archivo';
	import '@fontsource-variable/jetbrains-mono';
	import '$lib/styles/layout.scss';

	import Search from '$lib/components/search.svelte';
	import ClickSpark from '$lib/components/animations/click-spark.svelte';

	const isDesktop = new MediaQuery('min-width: 1024px');
	const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const seo = $derived(seoByPath[path] ?? seoByPath['/']);
	const seoTitle = $derived(getHeadString(seo.head, 'title') ?? seo.title);
	const seoDescription = $derived(getHeadString(seo.head, 'description') ?? `Read ${seo.title}.`);
	const seoType = $derived(seo.type === 'website' ? 'website' : 'article');
	const origin = PUBLIC_BASE_URL.replace(/\/$/, '');
	const canonicalUrl = $derived(`${origin}${path}`);
	const ogImage = `${origin}/og/default.png`;
	const ogImageAlt = 'Lapikit, simple and optimized components library for Svelte';
	// error pages must not be indexed nor declare the URL they failed on as canonical
	const isError = $derived(page.status >= 400);
	// deprecated pages stay reachable for existing links but leave the index (and the sitemap)
	const noIndex = $derived(isError || seo.state === 'deprecated');
	const pageTitle = $derived(
		isError
			? `${page.status === 404 ? 'Page not found' : 'Error'} • Lapikit`
			: `${capitalize(seoTitle)} • ${path === '/' ? 'Svelte Components Library' : 'Lapikit Svelte Components'}`
	);
	const breadcrumbs = $derived(getBreadcrumbs(path));
	const breadcrumbSchema = $derived(getBreadcrumbStructuredData(breadcrumbs, origin));
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

	untrack(() => setNpmStats(data.npm));

	// states
	let searchOpen = $state(false);

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
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	{#if !isError}
		<link rel="canonical" href={canonicalUrl} />
	{/if}
	<meta name="description" content={seoDescription} />
	<meta
		name="robots"
		content={PUBLIC_DEV === 'true'
			? 'noindex, nofollow'
			: noIndex
				? 'noindex, follow'
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
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={ogImageAlt} />

	<meta name="color-scheme" content="light dark" />

	{#if !isError}
		{@html breadcrumbSchemaTag}
	{/if}
</svelte:head>

<ConsoleMessage />

{#if isDesktop.current}
	<ClickSpark sparkColor="#2a6df4" />
{/if}

<kit:app>
	{@render children()}

	<ConsentMode />
	<Search bind:open={searchOpen} />
</kit:app>

<style>
	:global(:root) {
		--app-spacing-x-page: 2rem;
		--app-spacing-y-page-top: 2rem;
		--app-spacing-y-page-bottom: 4rem;
	}
</style>
