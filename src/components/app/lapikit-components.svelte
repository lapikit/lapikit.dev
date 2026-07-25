<script lang="ts">
	import LazyRepl from '$components/lazy-repl.svelte';

	// examples
	import CardPreview from '$examples/components/card/preview.svelte';
	import CardPreviewRaw from '$examples/components/card/preview.svelte?raw';

	let components = [
		{ label: 'Card' },
		{ label: 'Btn' },
		{ label: 'Chip' },
		{ label: 'Dropdown' },
		{ label: 'List' },
		{ label: 'Avatar' }
	];
</script>

<section>
	<h2>More components for more power !</h2>
	<p>Passphrase</p>
	<kit:toolbar>
		{#each components as { label }}
			<kit:btn>{label}</kit:btn>
		{/each}
		<kit:btn>See more</kit:btn>
	</kit:toolbar>

	<kit:card>
		<kit:card-container>
			<kit:card-title>title</kit:card-title>
			<kit:card-content>content</kit:card-content>
			<kit-card-actions>actions</kit-card-actions>
		</kit:card-container>
		<kit:card-container>
			<LazyRepl title="appbar.svelte" lang="svelte" content={CardPreviewRaw}>
				<CardPreview />
			</LazyRepl>
		</kit:card-container>
	</kit:card>
</section>
