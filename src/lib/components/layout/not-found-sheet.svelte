<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	import { ArrowLeft, ArrowRight, BookMarked } from 'lucide-svelte';
	import Mascot from '$lib/assets/images/mascot/default.webp?enhanced';

	import SearchBtn from '$lib/components/search/search-btn.svelte';

	const notFound = $derived(page.status === 404);
	const suggestions = $derived(notFound ? (page.error?.suggestions ?? []) : []);
</script>

<div class="not-found">
	<div class="not-found-grid">
		<div class="not-found-intro">
			<p class="not-found-eyebrow">// Error {page.status}</p>
			<h1 class="not-found-title">
				{#if notFound}
					This page <span class="accent-text">hopped away.</span>
				{:else}
					Something <span class="accent-text">went wrong.</span>
				{/if}
			</h1>
			<p class="not-found-message">
				{#if notFound}
					It doesn't exist or has moved. Try the search, or pick up from the docs.
				{:else}
					{page.error?.message ?? 'An unexpected error occurred.'} Please try again in a moment.
				{/if}
			</p>

			<div class="not-found-actions">
				<kit:btn href={resolve('/')} color="accent" rounded="md" size="lg">
					{#snippet prepend()}
						<kit:icon><ArrowLeft /></kit:icon>
					{/snippet}
					Back to home
				</kit:btn>
				<kit:btn href={resolve('/docs')} variant="outline" rounded="md" size="lg">
					{#snippet prepend()}
						<kit:icon><BookMarked /></kit:icon>
					{/snippet}
					Browse the docs
				</kit:btn>
				<SearchBtn />
			</div>
		</div>

		<div class="not-found-visual" aria-hidden="true">
			<span class="not-found-status">{page.status}</span>
			<enhanced:img class="not-found-mascot" src={Mascot} alt="" sizes="240px" />
		</div>

		{#if suggestions.length > 0}
			<nav class="not-found-suggestions" aria-labelledby="not-found-suggestions-title">
				<h2 id="not-found-suggestions-title" class="not-found-eyebrow">Did you mean</h2>
				<ul>
					{#each suggestions as { title, path } (path)}
						<li>
							<a href={resolve(path)}>
								{title}
								<kit:icon size="sm"><ArrowRight /></kit:icon>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</div>

<style lang="scss">
	.not-found {
		container-type: inline-size;
	}

	.not-found-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--lapikit-border-width);
		background-color: var(--lapikit-border-color);

		> * {
			background-color: var(--kit-color-surface);
		}
	}

	@container (min-width: 720px) {
		.not-found-grid {
			grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
		}

		.not-found-intro {
			grid-column: 1;
		}

		.not-found-visual {
			grid-column: 2;
			grid-row: 1;
		}

		.not-found-suggestions {
			grid-column: 1 / -1;
		}
	}

	.not-found-intro {
		display: grid;
		align-content: center;
		gap: 20px;
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.not-found-eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-accent);
		letter-spacing: 0.04em;
	}

	.not-found-title {
		margin: 0;
		font-size: var(--text-4xl);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.04em;
	}

	.not-found-message {
		max-width: 46ch;
		margin: 0;
		color: var(--kit-color-text-muted);
		font-size: var(--text-lg);
		line-height: 1.6;
	}

	.not-found-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 8px;
	}

	.not-found-visual {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 280px;
		padding: var(--sheet-cell-padding);
		overflow: hidden;
		background-image: radial-gradient(var(--kit-color-border) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	.not-found-status {
		position: absolute;
		font-size: clamp(7rem, 4rem + 14cqi, 14rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.06em;
		color: transparent;
		-webkit-text-stroke: 2px var(--kit-color-border);
		user-select: none;
	}

	.not-found-visual :global(.not-found-mascot) {
		position: relative;
		width: min(200px, 50%);
		height: auto;
		transform: rotate(-6deg);
	}

	.not-found-suggestions {
		display: grid;
		gap: 12px;
		padding: var(--sheet-cell-padding);

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			border-top: 1px solid var(--kit-color-border);
		}

		li {
			border-bottom: 1px solid var(--kit-color-border);
		}

		a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			padding: 14px 4px;
			color: var(--kit-color-text);
			font-weight: 600;
			text-decoration: none;

			:global(.kit-icon) {
				color: var(--kit-color-text-muted);
				transition: transform 0.2s ease;
			}

			&:hover,
			&:focus-visible {
				color: var(--kit-color-accent);

				:global(.kit-icon) {
					color: inherit;
					transform: translateX(4px);
				}
			}
		}
	}
</style>
