<script lang="ts">
	import type { DocSummary } from '$lib/types';
	import { links } from '$lib/constants';
	import { docEditUrl, docIssueUrl } from '$lib/utils';

	import { Pencil } from 'lucide-svelte';

	let { doc }: { doc: DocSummary } = $props();

	const topic = $derived(doc.head?.title || doc.title);
	const issueUrl = $derived(docIssueUrl(topic, doc.path.pathname));
	const lastModified = $derived(
		doc.lastModified
			? new Date(doc.lastModified).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					timeZone: 'UTC'
				})
			: undefined
	);
</script>

<footer class="page-meta" data-prose-skip>
	<div class="page-meta-source">
		<a
			class="page-meta-edit"
			href={docEditUrl(doc.path.sourcePath)}
			rel="external noopener noreferrer"
			target="_blank"
		>
			<kit:icon size="sm"><Pencil /></kit:icon>
			Edit this page on GitHub
		</a>
		{#if lastModified && doc.lastModified}
			<p class="page-meta-date">
				Last updated on <time datetime={doc.lastModified}>{lastModified}</time>
			</p>
		{/if}
	</div>

	<div class="page-meta-help">
		<p class="page-meta-question">Have a question?</p>
		<div class="page-meta-links">
			<kit:btn
				href={issueUrl}
				target="_blank"
				rel="noopener noreferrer"
				size="sm"
				variant="outline"
				rounded="0"
			>
				{#snippet prepend()}
					<kit:icon size="sm">{@html links.github.icon}</kit:icon>
				{/snippet}
				Ask on GitHub
			</kit:btn>
			<kit:btn
				href={links.discord.url}
				target="_blank"
				rel="noopener noreferrer"
				size="sm"
				variant="outline"
				rounded="0"
			>
				{#snippet prepend()}
					<kit:icon size="sm">{@html links.discord.icon}</kit:icon>
				{/snippet}
				Ask on Discord
			</kit:btn>
		</div>
	</div>
</footer>

<style lang="scss">
	.page-meta {
		margin-top: 4rem;
		padding-top: 24px;
		border-top: 1px solid var(--kit-color-border);
	}

	.page-meta-source,
	.page-meta-help {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px 16px;
	}

	.page-meta-help {
		margin-top: 20px;
	}

	.page-meta-edit {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
		text-decoration: none;
		transition: color 0.15s ease;

		&:hover,
		&:focus-visible {
			color: var(--kit-color-accent);
		}
	}

	.page-meta-date,
	.page-meta-question {
		margin: 0;
		color: var(--kit-color-text-muted);
		font-size: var(--text-sm);
	}

	.page-meta-question {
		color: var(--kit-color-text);
		font-weight: 600;
	}

	.page-meta-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
