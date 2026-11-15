<script lang="ts">
	import { page } from '$app/state';

	const commits = $derived(page.data.commits ?? []);
</script>

<div class="git-log" aria-hidden="true">
	<div class="git-log-bar">
		<span class="git-log-dots"><i></i><i></i><i></i></span>
		<span class="git-log-title">lapikit — git log --oneline</span>
	</div>

	<ol class="git-log-lines">
		{#each commits as { hash, tag, message }, index (hash)}
			<li style:--index={index}>
				<span class="git-log-graph"></span>
				<span class="git-log-hash">{hash}</span>
				{#if tag}
					<span class="git-log-tag">tag: {tag}</span>
				{/if}
				<span class="git-log-message">{message}</span>
			</li>
		{/each}
		<li class="git-log-prompt" style:--index={commits.length}>
			<span class="git-log-caret">$</span>
			<span class="git-log-next">git commit -m "your next idea"</span><span class="git-log-cursor"
			></span>
		</li>
	</ol>
</div>

<style lang="scss">
	.git-log {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: auto minmax(0, 1fr);
		height: 100%;
		overflow: hidden;
		container-type: inline-size;
		border: 1px solid var(--kit-color-border);
		background-color: var(--kit-color-surface-1);
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.git-log-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--kit-color-border);
		background-color: var(--kit-color-surface);
	}

	.git-log-dots {
		display: flex;
		gap: 6px;

		i {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: var(--kit-color-border);
		}
	}

	.git-log-title {
		min-width: 0;
		overflow: hidden;
		color: var(--kit-color-text-muted);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.git-log-lines {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: center;
		gap: 0.7em;
		margin: 0;
		padding: clamp(12px, 4%, 28px);
		font-size: clamp(0.625rem, 2.4cqi, 0.9375rem);
		list-style: none;

		li {
			display: flex;
			align-items: baseline;
			gap: 0.75em;
			min-width: 0;
			white-space: nowrap;
		}
	}

	.git-log-graph {
		position: relative;
		flex-shrink: 0;
		align-self: center;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--kit-color-accent);

		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 3px;
			width: 2px;
			height: 1.7em;
			background-color: color-mix(in oklab, var(--kit-color-accent), transparent 60%);
		}
	}

	li:nth-last-child(2) .git-log-graph::after {
		display: none;
	}

	.git-log-hash {
		flex-shrink: 0;
		color: var(--kit-color-text-muted);
	}

	.git-log-tag {
		flex-shrink: 0;
		padding: 0 0.5em;
		border: 1px solid color-mix(in oklab, var(--kit-color-accent), transparent 50%);
		color: var(--kit-color-accent);
	}

	.git-log-message {
		overflow: hidden;
		color: var(--kit-color-text);
		text-overflow: ellipsis;
	}

	.git-log-prompt {
		margin-top: 0.6em;
	}

	@container (max-width: 480px) {
		.git-log-lines li:nth-child(n + 8):not(.git-log-prompt) {
			display: none;
		}

		.git-log-lines li:nth-child(7) .git-log-graph::after {
			display: none;
		}
	}

	@container (max-width: 260px) {
		.git-log-lines li:nth-child(n + 5):not(.git-log-prompt) {
			display: none;
		}

		.git-log-lines li:nth-child(4) .git-log-graph::after {
			display: none;
		}
	}

	.git-log-caret {
		color: var(--kit-color-accent);
	}

	.git-log-next {
		overflow: hidden;
		color: var(--kit-color-text-muted);
		text-overflow: ellipsis;
	}

	.git-log-cursor {
		flex-shrink: 0;
		align-self: center;
		width: 0.55em;
		height: 1.1em;
		margin-left: -0.5em;
		background-color: var(--kit-color-accent);
		animation: git-log-blink 1s steps(1) infinite;
	}

	@keyframes git-log-blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.git-log-cursor {
			animation: none;
		}
	}
</style>
