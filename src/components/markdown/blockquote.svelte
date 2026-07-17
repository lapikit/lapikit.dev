<script lang="ts">
	import { Lightbulb, CircleCheck, Info, TriangleAlert, CircleX } from 'lucide-svelte';

	let props = $props();

	let ref: null | HTMLElement = $state(null);
	let type = $state('');
	let text: null | string = $state(null);

	$effect.pre(() => {
		if (ref?.textContent) {
			if (ref.textContent.includes('[!INFO]')) {
				type = 'info';
				text = ref.textContent.replace('[!INFO]', '');
			} else if (ref.textContent.includes('[!WARNING]')) {
				type = 'warning';
				text = ref.textContent.replace('[!WARNING]', '');
			} else if (ref.textContent.includes('[!IMPORTANT]')) {
				type = 'error';
				text = ref.textContent.replace('[!IMPORTANT]', '');
			} else if (ref.textContent.includes('[!GOOD]')) {
				type = 'good';
				text = ref.textContent.replace('[!GOOD]', '');
			} else if (ref.textContent.includes('[!NOTE]')) {
				type = 'note';
				text = ref.textContent.replace('[!NOTE]', '');
			}
		}
	});

	// # DEMO
	// > [!NOTE]
	// > Available since 2.27
</script>

{#if type === 'note'}
	<blockquote bind:this={ref} class="blockquote-note">
		<kit:icon color="warning">
			<Lightbulb />
		</kit:icon>

		{#if text}
			{text}
		{:else}
			{@render props.children?.()}
		{/if}
	</blockquote>
{:else}
	<kit:alert multiline tone={type} class="mb-4">
		{#snippet prepend()}
			{#if type === 'info'}
				<kit:icon><Info /></kit:icon>
			{:else if type === 'warning'}
				<kit:icon><TriangleAlert /></kit:icon>
			{:else if type === 'important'}
				<kit:icon><CircleX /></kit:icon>
			{:else if type === 'good'}
				<kit:icon><CircleCheck /></kit:icon>
			{/if}
		{/snippet}
		<div bind:this={ref}>
			{#if text}
				{text}
			{:else}
				{@render props.children?.()}
			{/if}
		</div>
	</kit:alert>
{/if}

<style>
	blockquote.blockquote-note {
		border-left: 0;
		display: flex;
		align-items: center;
		gap: var(--kit-space-comfortable);
		background: transparent;
	}
</style>
