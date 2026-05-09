<script lang="ts" module>
	let sidebarScrollTop = 0;
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { docsNavigation, getBreadcrumbs } from '$lib';

	// Components
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Drawer from '$lib/components/drawer.svelte';
	import { Menu } from 'lucide-svelte';

	let navOpen = $state(false);
	let sidebarEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (sidebarEl) sidebarEl.scrollTop = sidebarScrollTop;
	});

	beforeNavigate(() => {
		if (sidebarEl) sidebarScrollTop = sidebarEl.scrollTop;
	});

	let {
		children
	}: {
		children?: Snippet;
	} = $props();

	const normalizedPath = $derived(page.url.pathname.replace(/\/$/, ''));
	const breadcrumbs = $derived(getBreadcrumbs(normalizedPath));
	let year: number = new Date().getFullYear();
</script>

<div class="grid md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr]">
	<Drawer bind:open={navOpen} bind:el={sidebarEl} side="left">
		<nav>
			{#each docsNavigation as { label, icon, pages } (label)}
				<kit:list density="compact" size="sm" nav>
					<kit:list-item>
						{#snippet prepend()}
							<kit:icon>
								{#if typeof icon === 'string'}
									{@html icon}
								{:else}
									{@const Icon = icon}
									<Icon />
								{/if}
							</kit:icon>
						{/snippet}
						{label}
					</kit:list-item>

					{#each pages as page (page.label)}
						<kit:list-item
							href={page.url}
							onclick={() => (navOpen = false)}
							active={normalizedPath === page.url}
						>
							{page.label}
						</kit:list-item>
					{/each}
				</kit:list>
			{/each}
		</nav>
	</Drawer>

	<div class="min-w-0">
		<kit:toolbar class="sticky! top-16 z-50 lg:hidden!">
			<kit:btn class="md:hidden!" onclick={() => (navOpen = true)} aria-label="open navigation">
				{#snippet prepend()}
					<kit:icon>
						<Menu />
					</kit:icon>
				{/snippet}

				Menu
			</kit:btn>

			<kit:spacer />
		</kit:toolbar>

		<article>
			<Breadcrumbs items={breadcrumbs} />

			<div class="kit-prose">
				{@render children?.()}
			</div>
		</article>

		<footer>
			Copyright © 2025 - {year} Lapikit -
			<a
				href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
				target="_blank"
				style="color: var(--kit-accent)">MIT License</a
			>
			- Developed by
			<a href="https://nycolaide.dev" target="_blank" style="color: var(--kit-accent)">Nycolaide</a>
		</footer>
	</div>
</div>

<style>
	article .kit-prose,
	article :global(> nav) {
		max-width: calc(var(--md-max-width) + 250px);
	}

	footer {
		max-width: calc(var(--md-max-width) + 250px);
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}
</style>
