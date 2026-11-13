<script lang="ts">
	import { untrack } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { useAccordion } from 'lapikit/actions';
	import { docsNavigation } from '$lib/router';
	import { npmState } from '$lib/state/npm.svelte';
	import { isCurrentPath } from '$lib/utils';

	import { GitMerge } from 'lucide-svelte';

	let { onnavigate }: { onnavigate?: () => void } = $props();

	const deprecated_label = 'Deprecated';
	const deprecatedIndex = 0;

	const sections = docsNavigation.filter(({ label }) => label !== deprecated_label);
	const deprecated = docsNavigation.find(({ label }) => label === deprecated_label)?.pages ?? [];
	const accordion = useAccordion();

	const releases = $derived([
		{ label: 'main', color: 'info', version: npmState.version.latest || '—' },
		{
			label: 'insiders',
			color: 'warning',
			version: npmState.version.insiders?.replace('v0.0.0-', '') || '—'
		}
	]);

	let nav: HTMLElement | undefined = $state();

	untrack(() => {
		if (deprecated.some(({ url }) => isCurrentPath(page.url.pathname, url))) {
			accordion.toggle(deprecatedIndex);
		}
	});

	$effect(() => {
		if (!nav || !page.url.pathname) return;
		nav.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
	});
</script>

{#snippet pageLink(label: string, url: string)}
	{@const current = isCurrentPath(page.url.pathname, url)}
	<li>
		<a
			href={resolve(url as Pathname)}
			class:is-current={current}
			aria-current={current ? 'page' : undefined}
			onclick={onnavigate}
		>
			{label}
		</a>
	</li>
{/snippet}

<div class="docs-nav">
	<nav bind:this={nav} class="docs-nav-links" aria-label="Documentation">
		{#each sections as { label, icon, pages } (label)}
			<div class="docs-nav-group">
				<p class="docs-nav-group-title">
					<kit:icon size="sm">
						{#if typeof icon === 'string'}
							{@html icon}
						{:else}
							{@const Icon = icon}
							<Icon />
						{/if}
					</kit:icon>
					<span class="docs-nav-group-label">{label}</span>
				</p>
				<ul>
					{#each pages as { label: pageLabel, url } (url)}
						{@render pageLink(pageLabel, url)}
					{/each}
				</ul>
			</div>
		{/each}

		{#if deprecated.length}
			<kit:accordion class="docs-nav-deprecated" variant="text" density="compact" rounded="0">
				<kit:accordion-item
					index={deprecatedIndex}
					text={deprecated_label}
					open={accordion.values.includes(deprecatedIndex)}
					toggle={accordion.toggle}
				>
					<ul>
						{#each deprecated as { label, url } (url)}
							{@render pageLink(label, url)}
						{/each}
					</ul>
				</kit:accordion-item>
			</kit:accordion>
		{/if}
	</nav>

	<dl class="docs-nav-release">
		{#each releases as { label, color, version } (label)}
			<div class="docs-nav-release-row">
				<dt>
					<kit:chip size="sm" {color}>
						{#snippet prepend()}
							<kit:icon size="xs"><GitMerge /></kit:icon>
						{/snippet}
						{label}
					</kit:chip>
				</dt>
				<dd>{version}</dd>
			</div>
		{/each}
	</dl>
</div>

<style lang="scss">
	.docs-nav {
		display: flex;
		flex-direction: column;
		min-height: 0;
		height: 100%;
	}

	.docs-nav-links {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding-block: 8px;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		a {
			display: block;
			padding: 6px 20px 6px 18px;
			border-inline-start: 2px solid transparent;
			color: var(--kit-color-text-muted);
			font-size: var(--text-sm);
			text-decoration: none;
			transition:
				color 0.2s ease,
				background-color 0.2s ease;

			&:hover,
			&:focus-visible {
				background-color: var(--kit-color-surface-1);
				color: var(--kit-color-text);
			}

			&.is-current {
				border-inline-start-color: var(--kit-color-accent);
				background-color: color-mix(in oklab, var(--kit-color-accent), transparent 92%);
				color: var(--kit-color-accent);
				font-weight: 600;
			}
		}

		:global(.docs-nav-deprecated) {
			border-top: 1px solid var(--kit-color-border);
			opacity: 0.6;
		}
	}

	.docs-nav-group {
		padding-block: 12px;

		& + & {
			border-top: 1px solid var(--kit-color-border);
		}
	}

	.docs-nav-group-title {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 6px;
		padding-inline: 20px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.docs-nav-group-label {
		text-box: trim-both cap alphabetic;
	}

	.docs-nav-release {
		display: grid;
		gap: 8px;
		flex-shrink: 0;
		margin: 0;
		padding: 16px 20px;
		border-top: var(--lapikit-border);
	}

	.docs-nav-release-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;

		dd {
			margin: 0;
			font-family: var(--font-mono);
			font-size: var(--text-2xs);
			color: var(--kit-color-text-muted);
		}
	}
</style>
