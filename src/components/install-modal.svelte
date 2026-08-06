<script lang="ts">
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/actions';
	import LazyRepl from './lazy-repl.svelte';
	import { Lightbulb } from 'lucide-svelte';

	let { open = $bindable(false) } = $props();

	const accordion = useAccordion();
	accordion.toggle(0);

	let displayMode: 'cli' | 'manual' = $state('cli');
</script>

<kit:modal bind:open contain size="lg" classContent="install-modal-content">
	<kit:card id="quick-start-modal">
		<kit:card-title class="mb-2 text-2xl font-black"> Install Lapikit </kit:card-title>

		<kit:card-content>
			Lapikit can be installed in your Svelte and SvelteKit projects via your package manager, and
			then configured either automatically via the CLI or manually.
		</kit:card-content>

		<kit:card-content class="install-modal-toggle">
			<kit:btn
				variant="text"
				active={displayMode === 'cli'}
				onclick={() => (displayMode = 'cli')}
				color={displayMode === 'cli' && 'accent'}
			>
				CLI
			</kit:btn>
			<kit:btn
				variant="text"
				active={displayMode === 'manual'}
				onclick={() => (displayMode = 'manual')}
				color={displayMode === 'manual' && 'accent'}
			>
				Manual
			</kit:btn>
		</kit:card-content>

		<kit:card-container class="install-modal-body">
			{#if displayMode === 'cli'}
				<kit:card-content class="mt-2 mb-4 grid! gap-5!">
					<p class="install-modal-step">1. Install Lapikit in your project:</p>
					<LazyRepl lang="sh" content={'npm install --save-dev lapikit'} />

					<p class="install-modal-step">
						2. Run the CLI to automatically configure the preprocessor:
					</p>

					<LazyRepl lang="sh" content={'npx lapikit'} />

					<p class="install-modal-note">
						If you're using SvelteKit, the CLI detects your configuration and applies it
						automatically. For other setups (or if you'd rather retain control), use the <button
							onclick={() => (displayMode = 'manual')}
						>
							manual installation
						</button> instead.
					</p>
				</kit:card-content>
			{:else if displayMode === 'manual'}
				<kit:card-content class="mt-2 mb-4 grid! gap-5!">
					<kit:accordion>
						<kit:accordion-item
							index={0}
							text="1. Install Lapikit in your project:"
							open={accordion.values.includes(0)}
							toggle={accordion.toggle}
						>
							<LazyRepl lang="sh" content={'npm install --save-dev lapikit'} />
						</kit:accordion-item>
						<kit:accordion-item
							index={1}
							text="2. Add the preprocessor to your configuration file:"
							open={accordion.values.includes(1)}
							toggle={accordion.toggle}
						>
							<kit:alert tone="info" class="mb-4">
								{#snippet prepend()}
									<Lightbulb />
								{/snippet}
								Starting with SvelteKit 2.62, configuration lives in vite.config.(js|ts) rather than svelte.config.js.
								Lapikit remains compatible with both.
							</kit:alert>
							<LazyRepl
								content={{
									'svelte.config.js': {
										code: () => import('$examples/config/config_svelte.config.js?raw'),
										lang: 'js'
									},
									'vite.config.js': {
										code: () => import('$examples/config/config_vite.config.js?raw'),
										lang: 'js'
									},
									'vite.config.ts': {
										code: () => import('$examples/config/config_vite.config.ts?raw'),
										lang: 'ts'
									}
								}}
							/>
						</kit:accordion-item>
						<kit:accordion-item
							index={2}
							text="3. Add add-ons based on your environment (optional)."
							open={accordion.values.includes(2)}
							toggle={accordion.toggle}
						>
							<LazyRepl lang="sh" content={'npm add --save-dev eslint-config-lapikit'} />

							<span>
								Visit the <a
									href={resolve('/docs/environments')}
									style="color: var(--kit-color-warning);">TypeScript and Linter</a
								> page to properly configure your environment based on your setup.
							</span>
						</kit:accordion-item>
						<kit:accordion-item
							index={3}
							text="4. Restart your development server."
							open={accordion.values.includes(3)}
							toggle={accordion.toggle}
						>
							<LazyRepl lang="sh" content={'npm run dev'} />
						</kit:accordion-item>
					</kit:accordion>
				</kit:card-content>
			{/if}
		</kit:card-container>

		<kit:card-actions>
			<kit:btn variant="text" href={resolve('/docs/getting-started')} color="accent">
				More details
			</kit:btn>
			<kit:spacer />
			<kit:btn onclick={() => (open = false)} background="accent" color="fg-inverse">Close</kit:btn>
		</kit:card-actions>
	</kit:card>
</kit:modal>

<style>
	.install-modal-step {
		margin: 1rem 0 0.5rem;
		font-weight: 600;
	}

	.install-modal-step:first-child {
		margin-top: 0;
	}

	.install-modal-note {
		margin: 1rem 0 0;
		opacity: 0.7;
		font-size: 0.9em;
	}

	.install-modal-note button {
		color: var(--kit-color-warning);
		cursor: pointer;
	}

	:global(#quick-start-modal .kit-accordion-item__title) {
		font-weight: 600;
	}

	/* Only the tab content should scroll — title, tabs and actions stay put. */
	:global(.install-modal-content) {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	:global(.install-modal-content #quick-start-modal) {
		flex: 1;
		min-height: 0;
	}

	:global(.install-modal-body) {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
