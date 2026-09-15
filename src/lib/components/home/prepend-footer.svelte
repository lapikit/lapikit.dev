<script lang="ts">
	import type { Snippet } from 'svelte';

	// modules
	import Shell from '../shell.svelte';

	// assets
	import { ChevronRight } from 'lucide-svelte';

	let {
		commandLine = 'npx',
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
		Install Lapikit, open the project you were already working on, and run
		<span class="accent-text">{commandLine}</span>. In fee minutes you can code with lapikit
		directly in your project
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
