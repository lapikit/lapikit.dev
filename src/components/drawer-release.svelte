<script>
	import { GitMerge, PackageOpen } from 'lucide-svelte';
	import { npmState } from '$lib/stores/npm.svelte';

	/** @param {string} iso */
	function formatPublishDate(iso) {
		return new Date(iso).toLocaleDateString();
	}

	const releases = $derived([
		{
			key: 'main',
			label: 'main',
			background: 'info',
			color: 'on-info',
			version: npmState.version.latest || 'v0.0.0',
			publish: npmState.publish.latest
		},
		{
			key: 'insider',
			label: 'insider',
			background: 'warning',
			color: 'on-warning',
			version: npmState.version.insiders?.replace('v0.0.0-', '') || 'insiders-000000',
			publish: npmState.publish.insiders
		}
	]);
</script>

<kit:card
	class="sticky! bottom-3.5 mx-auto w-67.5"
	background="accent"
	density="comfortable"
	elevation="2"
	s-style_color="white"
>
	<kit:card-title>
		Release
		<kit:spacer />
		{npmState.downloads || 0}
		<kit:icon>
			<PackageOpen />
		</kit:icon>
	</kit:card-title>
	<kit:list density="compact">
		{#each releases as release (release.key)}
			<kit:list-item class="grid-cols-[94px_1fr]!" background="accent" s-style_color="white">
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

				<div class="metainfo grid">
					<span>{release.version}</span>
					<span>published {formatPublishDate(release.publish)}</span>
				</div>
			</kit:list-item>
		{/each}
	</kit:list>
</kit:card>

<style>
	.metainfo {
		line-height: 1.15;
	}

	.metainfo span:first-child {
		font-size: var(--kit-font-sm);
	}

	.metainfo span:last-child {
		font-size: var(--kit-font-xs);
		color: rgb(75, 75, 75);
	}
</style>
