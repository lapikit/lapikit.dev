<script lang="ts">
	import { ArrowDown } from 'lucide-svelte';

	type CodeExample = {
		input: { before: string; token: string; after: string };
		output: { before: string; token: string; after: string };
	};

	const directiveDemos: {
		id: string;
		title: string;
		description: string;
		examples: CodeExample[];
	}[] = [
		{
			id: 's-class',
			title: 's-class',
			description: 'Bind class names directly on Lapikit components, one class at a time.',
			examples: [
				{
					input: {
						before: '<kit:btn ',
						token: 's-class_rounded={true}',
						after: '>Click</kit:btn>'
					},
					output: { before: '<button ', token: 'class="rounded"', after: '>Click</button>' }
				}
			]
		},
		{
			id: 's-style',
			title: 's-style',
			description: 'Bind individual inline style properties directly on Lapikit components.',
			examples: [
				{
					input: { before: '<kit:btn ', token: 's-style_color="red"', after: '>Click</kit:btn>' },
					output: { before: '<button ', token: 'style="color: red"', after: '>Click</button>' }
				}
			]
		}
	];
</script>

<div class="directive-grid">
	{#each directiveDemos as demo (demo.id)}
		<kit:card elevation="2">
			<kit:card-container>
				<kit:card-title>The {demo.title} directive</kit:card-title>
				<p class="subtitle">{demo.description}</p>

				{#each demo.examples as example, index (index)}
					<div class="demo">
						<div class="demo-pane">
							<span class="demo-label">Svelte template</span>
							<code
								>{example.input.before}<span class="tok">{example.input.token}</span>{example.input
									.after}</code
							>
						</div>

						<div class="demo-arrow" aria-hidden="true">
							<ArrowDown />
						</div>

						<div class="demo-pane demo-pane--output">
							<span class="demo-label">Rendered HTML</span>
							<code
								>{example.output.before}<span class="tok">{example.output.token}</span>{example
									.output.after}</code
							>
						</div>
					</div>
				{/each}
			</kit:card-container>
		</kit:card>
	{/each}
</div>

<style lang="scss">
	.directive-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		max-width: var(--app-container-size-compact);
		margin: 0 auto;
	}

	.subtitle {
		margin: 8px 0 24px;
		opacity: 0.75;
	}

	:global(.kit-card-title code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		padding: 2px 6px;
		border-radius: 6px;
		background-color: var(--kit-color-fill);
	}

	.demo {
		display: grid;
		gap: 10px;

		& + .demo {
			margin-top: 18px;
		}
	}

	.demo-pane {
		background-color: var(--kit-color-shell);
		color: var(--kit-colot-on-shell);
		border-radius: 10px;
		padding: 12px 14px;
		overflow-x: auto;

		code {
			display: block;
			font-family: var(--font-mono);
			font-size: 0.8rem;
			white-space: pre-wrap;
			word-break: break-word;
		}
	}

	.demo-label {
		display: block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		opacity: 0.55;
		margin-bottom: 6px;
	}

	.tok {
		color: var(--kit-color-accent);
		font-weight: 600;
	}

	.demo-pane--output .tok {
		color: var(--kit-color-svelte);
	}

	.demo-arrow {
		display: flex;
		justify-content: center;
		opacity: 0.4;
	}

	@media (min-width: 760px) {
		.directive-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
