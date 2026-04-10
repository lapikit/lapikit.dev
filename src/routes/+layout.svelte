<script lang="ts">
	//import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import './layout.css';

	// images
	import favicon from '$lib/assets/favicon.svg';

	import { House } from 'lucide-svelte';
	import { docsSeoByPath, primaryNavigation, socialMediaLinks } from '$lib';
	import {
		defaultSeo,
		getBreadcrumbStructuredData,
		getBreadcrumbs,
		seoByPath,
		siteDefaultUrl,
		siteName
	} from '$lib';
	import { resolve } from '$app/paths';

	import type { ModelDropdownProps } from 'lapikit/labs/types';

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

<kit:app>
	<kit:appbar>
		<a href={resolve('/')} class="header-lapikit" aria-label="Home">
			<House size={20} />

			<enhanced:img
				src="$lib/assets/images/lapikit.webp?w=36;72"
				alt=""
				class="logo-img"
				sizes="36px"
				fetchpriority="high"
				loading="eager"
			/>
			<span>Lapikit</span>
		</a>

		<nav aria-label="Primary navigation">
			{#each primaryNavigation as { href, label } (label)}
				<kit:btn
					href={resolve(href)}
					aria-current={normalizedPath.startsWith(href) ? 'page' : undefined}
				>
					{label}
				</kit:btn>
			{/each}
		</nav>
		<kit:btn
			href={resolve('/docs')}
			aria-current={normalizedPath.startsWith('/docs') ? 'page' : undefined}
		>
			Documentation
		</kit:btn>
	</kit:appbar>

	<main>
		{@render children()}
	</main>

	<footer>
		<div>
			<p>Theme</p>
			<div>
				<kit:dropdown closeOnClick>
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#snippet activator({
						toggle,
						open
					}: {
						toggle: (el: HTMLElement | PointerEvent | null) => void;
						open: boolean;
						close: () => void;
					})}
						<kit:btn onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
							>{String(open)}</kit:btn
						>
					{/snippet}
					<kit:list>
						<kit:listitem>Light</kit:listitem>
						<kit:listitem>Dark</kit:listitem>
						<kit:listitem>System</kit:listitem>
					</kit:list>
				</kit:dropdown>
				<kit:dropdown closeOnClick>
					{#snippet activator({ toggle, open })}
						<kit:btn onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
							>{String(open)}</kit:btn
						>
					{/snippet}
					<kit:list>
						<kit:listitem>Light</kit:listitem>
						<kit:listitem>Dark</kit:listitem>
						<kit:listitem>System</kit:listitem>
					</kit:list>
				</kit:dropdown>
			</div>
		</div>
		<div>
			<p>Social</p>
			<div class="social-links">
				{#each socialMediaLinks as { label, url, icon } (icon)}
					<a
						href={url}
						target="_blank"
						rel="external noopener noreferrer"
						aria-label={label}
						class="social-link"
					>
						{@html icon}
					</a>
				{/each}
			</div>
		</div>
		<div>
			<enhanced:img
				src="$lib/assets/images/lapikit-footer.webp?w=320;640;1024;1280;1920;2560"
				alt="lapikit"
				aria-label="Lapikit"
				class="footer-img"
				sizes="100vw"
				loading="lazy"
			/>
		</div>
		<div>
			Copyright © 2025 - 2026 Lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				rel="noopener noreferrer">MIT License</a
			>
		</div>
	</footer>
</kit:app>

<style>
	.header-lapikit {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-img {
		height: 2.25rem;
		width: auto;
	}

	.footer-img {
		width: 100%;
		height: auto;
		display: block;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		color: currentColor;
	}
</style>
