<script lang="ts">
	import { resolve } from '$app/paths';
	import LazyRepl from '$components/lazy-repl.svelte';

	// examples
	import CardPreview from '$examples/components/card/preview.svelte';
	import CardPreviewRaw from '$examples/components/card/preview.svelte?raw';
	import BtnPreview from '$examples/components/btn/preview.svelte';
	import BtnPreviewRaw from '$examples/components/btn/preview.svelte?raw';
	import ChipPreview from '$examples/components/chip/preview.svelte';
	import ChipPreviewRaw from '$examples/components/chip/preview.svelte?raw';
	import DropdownPreview from '$examples/components/dropdown/preview.svelte';
	import DropdownPreviewRaw from '$examples/components/dropdown/preview.svelte?raw';
	import ListPreview from '$examples/components/list/preview.svelte';
	import ListPreviewRaw from '$examples/components/list/preview.svelte?raw';
	import AvatarPreview from '$examples/components/avatar/preview.svelte';
	import AvatarPreviewRaw from '$examples/components/avatar/preview.svelte?raw';

	let components = [
		{
			label: 'Card',
			tilte: 'Card',
			description: 'Description with component',
			url: '/docs/components/card',
			cta: 'Discover',
			file: 'card/preview.svelte',
			preview: CardPreview,
			raw: CardPreviewRaw
		},
		{
			label: 'Btn',
			tilte: 'Btn',
			description: 'Description with component',
			url: '/docs/components/button',
			cta: 'Explore',
			file: 'btn/preview.svelte',
			preview: BtnPreview,
			raw: BtnPreviewRaw
		},
		{
			label: 'Chip',
			tilte: 'Chip',
			description: 'Description with component',
			url: '/docs/components/chip',
			cta: 'Explore',
			file: 'chip/preview.svelte',
			preview: ChipPreview,
			raw: ChipPreviewRaw
		},
		{
			label: 'Dropdown',
			tilte: 'Dropdown',
			description: 'Description with component',
			url: '/docs/components/dropdown',
			cta: 'See more',
			file: 'dropdown/preview.svelte',
			preview: DropdownPreview,
			raw: DropdownPreviewRaw
		},
		{
			label: 'List',
			tilte: 'List',
			description: 'Description with component',
			url: '/docs/components/list',
			cta: 'Discover',
			file: 'list/preview.svelte',
			preview: ListPreview,
			raw: ListPreviewRaw
		},
		{
			label: 'Avatar',
			tilte: 'Avatar',
			description: 'Description with component',
			url: '/docs/components/avatar',
			cta: 'Explore',
			file: 'avatar/preview.svelte',
			preview: AvatarPreview,
			raw: AvatarPreviewRaw
		}
	];

	let selected = $state(components[0]);
</script>

<section>
	<h2>More components for more power !</h2>
	<p>Passphrase</p>
	<kit:toolbar>
		{#each components as component}
			<kit:btn active={selected.label === component.label} onclick={() => (selected = component)}>
				{component.label}
			</kit:btn>
		{/each}
		<kit:btn href={resolve('/docs/components')}>See more</kit:btn>
	</kit:toolbar>

	<kit:card class="grid-preview-components">
		<kit:card-container class="description-components">
			<div>
				<kit:card-title>{selected.tilte}</kit:card-title>
				<kit:card-content>{selected.description}</kit:card-content>
			</div>
			<kit-card-actions>
				<kit:btn href={selected.url}>{selected.cta}</kit:btn>
			</kit-card-actions>
		</kit:card-container>
		<kit:card-container>
			{#key selected.label}
				<LazyRepl title={selected.file} lang="svelte" content={selected.raw}>
					<selected.preview />
				</LazyRepl>
			{/key}
		</kit:card-container>
	</kit:card>
</section>

<style>
	section :global(.grid-preview-components) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	section :global(.grid-preview-components .description-components) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
