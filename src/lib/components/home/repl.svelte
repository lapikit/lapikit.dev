<script lang="ts">
	import { Minus, PictureInPicture2, X } from 'lucide-svelte';

	type Code = {
		content: string;
		lapikit?: boolean;
		indent: number;
	};

	let {
		code,
		render,
		left
	}: {
		code: Code[];
		render: Code[];
		left?: boolean;
	} = $props();

	const panes = $derived([
		{ label: 'Source', lines: code },
		{ label: 'Compiled', lines: render }
	]);
	const windowActions = [Minus, PictureInPicture2, X];
</script>

<kit:card class="home-repl" s-class_home-repl-left={left} color="surface-2">
	<kit:card-actions aria-hidden="true">
		<kit:spacer />
		{#each windowActions as Action, index (index)}
			<kit:btn icon size="xs" tabindex="-1">
				<kit:icon size="xs">
					<Action />
				</kit:icon>
			</kit:btn>
		{/each}
	</kit:card-actions>
	<kit:separator />
	<kit:card-container>
		{#each panes as { label, lines } (label)}
			<kit:card-content>
				<p class="repl-pane-label">{label}</p>
				<div class="repl-pane-code">
					<code>
						{#each lines as { content, indent, lapikit }, index (index)}
							<span class="line-code">
								<span class="line-number" aria-hidden="true">{index + 1}</span>
								<span
									class="line-content"
									class:is-lapikit={lapikit}
									style:padding-left="{indent * 2}ch">{content}</span
								>
							</span>
						{/each}
					</code>
				</div>
			</kit:card-content>
		{/each}
	</kit:card-container>
</kit:card>

<style lang="scss">
	:global(.home-repl) {
		container-type: inline-size;
		max-width: var(--repl-max-width, 540px);
		height: fit-content;
		font-family: var(--font-mono);
		font-size: 12px;
		border: 1px solid var(--kit-color-border);

		&:global(.home-repl-left) {
			margin-left: auto;
		}

		:global(.kit-card-actions) {
			pointer-events: none;
		}

		:global(.kit-card-container) {
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
			padding-top: 4px;
		}

		:global(.kit-card-content) {
			min-width: 0;

			&:last-child {
				background: var(--kit-color-surface-3);
				border-radius: 8px;
			}
		}

		@container (min-width: 720px) {
			:global(.kit-card-container) {
				grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			}
		}
	}

	.repl-pane-label {
		margin-bottom: 8px;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--kit-color-text-muted);
	}

	.repl-pane-code {
		overflow-x: auto;
		scrollbar-width: thin;

		code {
			display: block;
			width: max-content;
			min-width: 100%;
		}
	}

	.line-code {
		display: flex;
		gap: 10px;
		padding: 2px 0;
	}

	.line-number {
		flex: none;
		min-width: 2ch;
		text-align: right;
		opacity: 0.35;
		user-select: none;
	}

	.line-content {
		white-space: pre;
		opacity: 0.75;

		&.is-lapikit {
			font-weight: 600;
			color: var(--kit-color-accent);
			opacity: 1;
		}
	}
</style>
