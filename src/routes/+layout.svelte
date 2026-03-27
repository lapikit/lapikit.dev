<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { docsSeoByPath } from '$lib';
	import {
		defaultSeo,
		navigationLinks,
		seoByPath,
		siteDefaultUrl,
		siteDescription,
		siteDomain,
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
</svelte:head>

<a href="#content">Skip to content</a>

<header>
	<p><a href={resolve('/')}>{siteName}</a></p>
	<p>{siteDescription}</p>

	<nav aria-label="Primary navigation">
		<ul>
			{#each navigationLinks as link (link.href)}
				<li><a href={resolve(link.href)}>{link.label}</a></li>
			{/each}
			<li><a href={resolve('/sitemap.xml')}>XML sitemap</a></li>
		</ul>
	</nav>
</header>

<main id="content">
	{@render children()}
</main>

<footer>
	<p>
		{siteName} is a Svelte component library and documentation website available on {siteDomain}.
	</p>
	<nav aria-label="Footer navigation">
		<ul>
			<li><a href={resolve('/')}>Home</a></li>
			<li><a href={resolve('/docs')}>Documentation</a></li>
			<li><a href={resolve('/theme-builder')}>Theme builder</a></li>
			<li><a href={resolve('/terms')}>Legal notices</a></li>
			<li><a href={resolve('/sitemap.xml')}>Sitemap</a></li>
		</ul>
	</nav>
</footer>
