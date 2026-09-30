<script>
	import { GitMerge, PackageOpen } from 'lucide-svelte';
	import { npmState } from '$lib/stores/npm.svelte';

	/** @param {string} iso */
	function formatPublishDate(iso) {
		return new Date(iso).toLocaleDateString('en-US', { timeZone: 'UTC' });
	}

	const releases = $derived([
		{
			key: 'main',
			label: 'main',
			background: 'info',
			color: 'on-info',
			version: npmState.version.latest || '-',
			publish: npmState.publish.latest
		},
		{
			key: 'insider',
			label: 'insiders',
			background: 'warning',
			color: 'on-warning',
			version: npmState.version.insiders?.replace('v0.0.0-', '') || '-',
			publish: npmState.publish.insiders
		}
	]);
</script>

<kit:card
	class="release-card"
	background="surface-2"
	density="comfortable"
	elevation="3"
	s-style_color="text"
	s-style_border="2px solid var(--kit-color-accent)"
>
	<kit:card-title>
		Release
		<kit:spacer />
		{#if npmState.downloads}
			{npmState.downloads}
			<kit:icon>
				<PackageOpen />
			</kit:icon>
		{/if}
	</kit:card-title>
	<kit:list density="compact">
		{#each releases as release (release.key)}
			<kit:list-item class="release-item">
				{#snippet prepend()}
					<kit:chip size="sm" background={release.background} color={release.color}>
						{#snippet prepend()}
							<kit:icon size="xs">
								<GitMerge />
							</kit:icon>
						{/snippet}
						{release.label}
					</kit:chip>
				{/snippet}

				<div class="metainfo">
					<span class="version">{release.version}</span>
					{#if release.publish}
						<span class="published">published {formatPublishDate(release.publish)}</span>
					{/if}
				</div>
			</kit:list-item>
		{/each}
	</kit:list>
</kit:card>

<style lang="scss">
	.metainfo {
		display: grid; // équivalent grid
		line-height: 1.15;

		.version {
			font-size: var(--kit-font-sm);
		}

		.published {
			font-size: var(--kit-font-xs);
			color: rgb(75, 75, 75);
		}
	}

	:global(.release-card) {
		position: sticky !important;
		bottom: 0.875rem;
		margin-inline: auto;
		margin-top: 1.375rem;
		width: 16.875rem;
	}

	:global(.release-item) {
		grid-template-columns: 94px 1fr !important;
	}
</style>
