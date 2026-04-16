<script lang="ts">
	//import { resolve } from '$app/paths';

	//import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import ConsentMode from '$lib/components/consent-mode.svelte';
	import Search from '$lib/components/search.svelte';
</script>

<header>
	<!--<p><a href={resolve('/')}>{siteName}</a></p>-->
	<!--<p>{siteDescription}</p>-->
</header>

<main id="content">
	<!--<Breadcrumbs items={breadcrumbs} />-->
	<Search />

	<enhanced:img
		src="$lib/assets/images/demo.webp"
		alt="gnome test"
		sizes="100vw"
		fetchpriority="high"
		loading="eager"
	/>
</main>

<ConsentMode />

<!-- 
	<footer>
		<div>
			<p>theme</p>
			<div>
				<ul>
					<li>light</li>
					<li>dark</li>
					<li>system</li>
				</ul>
			</div>
		</div>
		<div>
			<p>social</p>
			<div>
				{#each socialMediaLinks as { label, url, icon } (icon)}
					<a href={url} target="_blank" rel="external noopener noreferrer" aria-label={label}>
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
			copyright © 2025 - 2026 lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				rel="noopener noreferrer"
			>
				mit license
			</a>
		</div>
	</footer> -->

<!-- <header>
		<a href={resolve('/')} aria-label="Home">home</a>
		<nav aria-label="Primary navigation">
			{#each primaryNavigation as { href, label } (label)}
				<a href={resolve(href)} aria-current={normalizedPath.startsWith(href) ? 'page' : undefined}>
					{label}
				</a>
			{/each}
			<a
				href={resolve('/docs')}
				aria-current={normalizedPath.startsWith('/docs') ? 'page' : undefined}
			>
				documentation
			</a>
		</nav>
	</header> -->
