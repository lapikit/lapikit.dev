<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import Shell from '../shell.svelte';

	let {
		commandLine = 'npx',
		children
	}: {
		commandLine?: string;
		children?: any;
	} = $props();
</script>

<div class="prepend-footer">
	<div>
		{@render children()}
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
			<kit:btn
				size="lg"
				rounded="lg"
				variant="outline"
				href="/docs/components"
				color="text-on-dark"
			>
				All components
			</kit:btn>
		</div>
	</div>
</div>

<style lang="scss">
	.prepend-footer {
		--kit-color-on-footer-banner: hsl(0 0% 100%);

		display: grid;
		grid-template-columns: 1fr;
		color: var(--kit-color-on-footer-banner);

		> div:last-child {
			display: grid;
			gap: 20px;
		}

		@media (min-width: 720px) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
