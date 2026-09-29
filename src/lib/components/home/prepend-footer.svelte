<script lang="ts">
	import type { Snippet } from 'svelte';

	// modules
	import Shell from '../shell.svelte';

	// assets
	import { ChevronRight } from 'lucide-svelte';

	let {
		commandLine = 'npx lapikit',
		children
	}: {
		commandLine?: string;
		children: Snippet;
	} = $props();
</script>

<div>
	{@render children?.()}
</div>
<div>
	<p>
		Install Lapikit in your existing Svelte or SvelteKit project and run the CLI with <span
			class="accent-text">{commandLine}</span
		> command to get started.
	</p>

	<Shell
		textLink="View install script"
		pathLink="/docs/getting-started#install-lapikit-in-your-project-directory"
		dark
	/>

	<div>
		<kit:btn
			size="lg"
			rounded="lg"
			href="/docs/getting-started"
			background="accent"
			color="on-accent"
		>
			Quickstart
			{#snippet append()}
				<ChevronRight />
			{/snippet}
		</kit:btn>
		<kit:btn size="lg" rounded="lg" variant="outline" href="/docs/components" color="text-on-dark">
			All components
		</kit:btn>
	</div>
</div>

<style lang="scss">
	div {
		gap: 20px;
		display: grid;

		> div {
			display: grid;
			grid-template-columns: 1fr;
			gap: 10px;

			@media (min-width: 450px) {
				margin-top: 20px;
				display: flex;
			}
		}
	}
</style>
