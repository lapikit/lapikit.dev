<script lang="ts">
	import type { ModelPopoverProps } from 'lapikit/labs/components';
	import { Form, GitBranch } from 'lucide-svelte';
	import ChartDownload from './chart-download.svelte';
</script>

<kit:popover>
	{#snippet activator({ toggle }: ModelPopoverProps)}
		<kit:btn
			size="xs"
			density="compact"
			is="button"
			onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
		>
			{#snippet prepend()}
				<kit:icon>
					<GitBranch />
				</kit:icon>
			{/snippet}

			v9.99.99
		</kit:btn>
	{/snippet}

	<div class="version-content">
		<div class="version-list">
			<kit:list density="compact" size="xs">
				<kit:list-item>
					{#snippet prepend()}
						<kit:chip density="compact" size="xs">
							{#snippet prepend()}
								<kit:icon>
									<GitBranch />
								</kit:icon>
							{/snippet}

							main
						</kit:chip>
					{/snippet}

					<div class="version-info">
						<p>v99.99.99</p>
						<p>published 02/10/2026</p>
					</div>
				</kit:list-item>
				<kit:list-item>
					{#snippet prepend()}
						<kit:chip density="compact" size="xs">
							{#snippet prepend()}
								<kit:icon>
									<GitBranch />
								</kit:icon>
							{/snippet}

							insiders
						</kit:chip>
					{/snippet}

					<div class="version-info">
						<p>insiders-32243432</p>
						<p>published 02/10/2026</p>
					</div>
				</kit:list-item>
			</kit:list>
			<kit:separator class="version-separator"></kit:separator>
			<kit:card>
				<ChartDownload />
			</kit:card>
		</div>
		<div class="version-actions">
			<kit:card class="version-card" href="/docs/changelog">
				{#snippet prepend()}
					<kit:icon size="lg">
						<GitBranch />
					</kit:icon>
				{/snippet}
				<kit:icon size="lg">
					<GitBranch />
				</kit:icon>
				<p>Changelog</p>
			</kit:card>

			<kit:card class="version-card" href="/docs/roadmap">
				{#snippet prepend()}
					<kit:icon size="lg">
						<Form />
					</kit:icon>
				{/snippet}
				<kit:icon size="lg">
					<Form />
				</kit:icon>

				<p>Roadmap</p>
			</kit:card>
		</div>
	</div>
</kit:popover>

<style>
	.version-info {
		display: flex;
		flex-direction: column;
		font-size: 0.75rem;
		line-height: 1;
	}

	.version-info p:first-child {
		font-weight: 800;
	}

	.version-info p:last-child {
		font-weight: 300;
	}

	.version-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}

	:global(.version-separator) {
		margin-top: 0.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.version-card) {
		display: grid !important;
		align-items: center;
		min-width: 100px;
	}

	:global(.version-card .kit-icon) {
		justify-content: start !important;
	}

	.version-actions {
		display: grid;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media (min-width: 600px) {
		.version-content {
			grid-template-columns: 250px 1fr;
		}
		.version-actions {
			flex-direction: row;
		}
	}
</style>
