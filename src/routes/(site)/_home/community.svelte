<script lang="ts">
	import { links, urlJoinLapikitTeam } from '$lib/constants';
	import { npmState } from '$lib/state/npm.svelte';
	import { profilGithub } from './profil-github';

	import { Plus, Star } from 'lucide-svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';
	import GitLog from './git-log.svelte';

	const downloadsText = $derived(
		npmState.downloads ? ` and already counts ${npmState.downloads} downloads on npm` : ''
	);
</script>

<SheetSection labelledby="community-title">
	<SheetGrid columns={{ lg: 2 }}>
		<div class="community-text">
			<SheetHeading id="community-title" eyebrow="// 06 — Open source">
				Free, open source <span class="accent-text">and built together.</span>
				{#snippet description()}
					Lapikit is MIT licensed{downloadsText}. Bug reports, ideas and pull requests from
					developers around the world shape every release.
				{/snippet}
			</SheetHeading>

			<div class="community-actions">
				<kit:btn
					href={links['github-repo-lapikit'].url}
					target="_blank"
					rel="noopener noreferrer"
					color={links['github-repo-lapikit']._styles.background}
					rounded="md"
				>
					{#snippet prepend()}
						<kit:icon class="community-star"><Star /></kit:icon>
					{/snippet}
					Star on GitHub
				</kit:btn>

				<kit:btn
					href={links.discord.url}
					target="_blank"
					rel="noopener noreferrer"
					color={links.discord._styles.background}
					rounded="md"
				>
					{#snippet prepend()}
						<kit:icon>{@html links.discord.icon}</kit:icon>
					{/snippet}
					Join the Discord
				</kit:btn>

				<kit:btn
					href={links.buymeacoffee.url}
					target="_blank"
					rel="noopener noreferrer"
					color={links.buymeacoffee._styles.background}
					rounded="md"
				>
					{#snippet prepend()}
						<kit:icon>{@html links.buymeacoffee.icon}</kit:icon>
					{/snippet}
					Buy the team a coffee
				</kit:btn>
			</div>
		</div>

		<div class="community-visual">
			<div class="community-log">
				<kit:aspect-ratio ratio="4/3">
					<GitLog />
				</kit:aspect-ratio>
			</div>

			<div class="community-contributors">
				<p class="community-contributors-label">Contributors</p>
				<ul class="community-avatars">
					{#each profilGithub as { src, href, alt } (href)}
						<li>
							<a {href} target="_blank" rel="external noopener noreferrer" aria-label={alt}>
								<kit:avatar size="lg">
									<img {src} alt="" loading="lazy" decoding="async" />
								</kit:avatar>
							</a>
						</li>
					{/each}
					<li>
						<kit:btn
							href={urlJoinLapikitTeam}
							target="_blank"
							rel="noopener noreferrer"
							icon
							variant="outline"
							rounded="full"
							size="lg"
							aria-label="Become a contributor"
							tooltip="Your face here?"
						>
							<kit:icon><Plus /></kit:icon>
						</kit:btn>
					</li>
				</ul>
			</div>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.community-text {
		display: grid;
		align-content: center;
		justify-items: start;
		gap: 32px;
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.community-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;

		:global(.community-star) {
			color: var(--kit-color-star);
		}

		:global(.community-star svg) {
			fill: currentColor;
		}
	}

	.community-visual {
		display: grid;
		align-content: center;
		gap: 24px;
		padding: var(--sheet-cell-padding);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.community-log {
		display: none;

		@include up(md) {
			display: block;
		}
	}

	.community-contributors {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.community-contributors-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.community-avatars {
		display: flex;
		align-items: center;
		gap: 8px;

		a {
			display: block;
			border-radius: 50%;
		}
	}
</style>
