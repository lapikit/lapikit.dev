<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DropdownTriggerModel, DropdownTriggerProps } from 'lapikit/components';
	import type { DocSummary } from '$lib/@types';
	import { copyToClipboard, docEditUrl, docIssueUrl } from '$lib/utils';

	import {
		Check,
		ChevronDown,
		Download,
		FileText,
		MessageCircleQuestion,
		Pencil,
		Sparkles
	} from 'lucide-svelte';

	const COPIED_DURATION = 2000;

	let { doc }: { doc: DocSummary } = $props();

	const topic = $derived(doc.head?.title || doc.title);
	const markdownUrl = $derived(resolve('/docs/[...slug].md', { slug: doc.path.slug }));
	const issueUrl = $derived(docIssueUrl(topic, doc.path.pathname));
	const fileName = $derived(`lapikit-${doc.path.slugSegments.join('-')}.md`);

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	const withPromptContext = (markdown: string) =>
		[
			`The following is the Lapikit documentation page "${topic}".`,
			'Lapikit is a Svelte 5 component library. Components are written with the <kit:*> syntax, compiled by the Lili preprocessor.',
			'Use it as context to answer my questions.',
			'',
			markdown
		].join('\n');

	async function copyForAi() {
		const text = fetch(markdownUrl)
			.then((response) => response.text())
			.then((markdown) => new Blob([withPromptContext(markdown)], { type: 'text/plain' }));

		if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
			await navigator.clipboard.write([new ClipboardItem({ 'text/plain': text })]);
		} else {
			copyToClipboard(await (await text).text());
		}

		copied = true;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = false), COPIED_DURATION);
	}
</script>

<div class="page-actions" role="group" aria-label="Page actions" data-prose-skip>
	<kit:btn size="sm" variant="outline" rounded="0" onclick={copyForAi}>
		{#snippet prepend()}
			<kit:icon size="sm" color={copied ? 'success' : undefined}>
				{#if copied}
					<Check />
				{:else}
					<Sparkles />
				{/if}
			</kit:icon>
		{/snippet}
		{copied ? 'Copied' : 'Copy for AI'}
	</kit:btn>

	<kit:dropdown closeOnClick rounded="0">
		{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
			<kit:btn
				icon
				size="sm"
				variant="outline"
				rounded="0"
				active={open}
				aria-label="More page actions"
				{...props}
			>
				<kit:icon size="sm"><ChevronDown /></kit:icon>
			</kit:btn>
		{/snippet}

		<kit:list density="compact" rounded="0" class="page-actions-menu">
			<kit:list-item href={markdownUrl} download={fileName}>
				{#snippet prepend()}
					<kit:icon size="sm"><Download /></kit:icon>
				{/snippet}
				Download as Markdown
			</kit:list-item>
			<kit:list-item href={markdownUrl} target="_blank">
				{#snippet prepend()}
					<kit:icon size="sm"><FileText /></kit:icon>
				{/snippet}
				View as Markdown
			</kit:list-item>
			<kit:separator />
			<kit:list-item
				href={docEditUrl(doc.path.sourcePath)}
				target="_blank"
				rel="noopener noreferrer"
			>
				{#snippet prepend()}
					<kit:icon size="sm"><Pencil /></kit:icon>
				{/snippet}
				Edit this page on GitHub
			</kit:list-item>
			<kit:list-item href={issueUrl} target="_blank" rel="noopener noreferrer">
				{#snippet prepend()}
					<kit:icon size="sm"><MessageCircleQuestion /></kit:icon>
				{/snippet}
				Ask on GitHub
			</kit:list-item>
		</kit:list>
	</kit:dropdown>

	<p class="sr-only" aria-live="polite">{copied ? 'Page copied to clipboard' : ''}</p>
</div>

<style lang="scss">
	.page-actions {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 20px;
	}
</style>
