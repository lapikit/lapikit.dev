<script lang="ts">
	import { BadgeCheck, ChevronDown, ChevronUp, Rocket } from 'lucide-svelte';
	import Table from './table.svelte';

	let showFullTable: boolean = $state(false);
	const validArg = [
		'Your code will be cleaner, with simpler and more legible syntax',
		'Faster, thanks to reuse components and uniform styling',
		'More consistently, with pre-optimized Svelte + TypeScript integration',
		'Stop copying and duplicating CSS classes and start shipping better user interfaces'
	];
</script>

<div class="wrapper">
	<kit:card elevation="3" s-style_overflow="hidden">
		<kit:card-container s-style_padding="40px">
			<h2><span class="accent-text">Stop building</span> from scratch</h2>
			<div class="paragraph-with-list">
				<div>
					<p class="subtitle" style:max-width="75%">
						With Lapikit, you can easily create and manage your components, making your development
						process more efficient Why waste time developing the same UI components on each project?
						<br />
						<br />
						With raw TailwindCSS, every button, card, and modal becomes a collection of repeating class
						blocks that clutter your codebase and complicate maintenance. Lapikit allows you to focus
						on what matters most: developing exceptional user experiences by delivering ready-to-use,
						customisable, and type-safe Svelte components
					</p>
				</div>
				<div>
					<kit:list variant="outline" nav s-style_gap="8px">
						{#each validArg as argument (argument)}
							<kit:list-item>
								{#snippet prepend()}
									<kit:icon color="success"><BadgeCheck /></kit:icon>
								{/snippet}
								{@html argument}
							</kit:list-item>
						{/each}
					</kit:list>
				</div>
			</div>

			<div class="paragraph-center">
				<h2>
					Why choose <span class="accent-text">Lapikit</span> over other Svelte component libraries?
				</h2>
				<p class="subtitle">Here's how Lapikit compares to other popular Svelte libraries:</p>

				<kit:btn
					href="/docs/introduction"
					rounded="lg"
					wide
					s-style_margin="0 auto"
					color="on-accent"
					background="accent"
				>
					{#snippet prepend()}
						<kit:icon>
							<Rocket />
						</kit:icon>
					{/snippet}
					Why lapikit is born ?
				</kit:btn>
			</div>

			<div class="table-clip" class:is-collapsed={!showFullTable}>
				<Table />
			</div>

			<div class="toggle" class:on-fade={!showFullTable}>
				<kit:btn
					onclick={() => (showFullTable = !showFullTable)}
					rounded="lg"
					color="surface"
					background="text"
				>
					{#if showFullTable}
						Show less
					{:else}
						Show all 13 rows
					{/if}

					{#snippet append()}
						<kit:icon>
							{#if showFullTable}
								<ChevronUp />
							{:else}
								<ChevronDown />
							{/if}
						</kit:icon>
					{/snippet}
				</kit:btn>
			</div>
		</kit:card-container>
	</kit:card>
</div>

<style lang="scss">
	.wrapper {
		// tweak the cut here
		--clip-height: 640px;
		--fade-height: 200px;

		max-width: var(--app-container-size-compact);
		margin: 0 auto;
		padding-left: 24px;
		padding-right: 24px;

		h2 {
			font-size: 2.5rem;
			letter-spacing: -0.01em;
			line-height: 1.15;
			font-weight: 900;
		}

		.paragraph-with-list {
			display: grid;
			grid-template-columns: 1fr auto;
			align-items: center;
			gap: 20px;
		}

		.paragraph-center {
			display: grid;
			max-width: 550px;
			margin: 50px auto 75px;
			text-align: center;
		}
	}

	.table-clip {
		position: relative;

		:global(section) {
			padding: 0;
			max-width: none;
		}

		&.is-collapsed {
			max-height: var(--clip-height);
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				inset-inline: 0;
				bottom: 0;
				height: var(--fade-height);
				background: linear-gradient(
					to bottom,
					transparent,
					var(--kit-card-bg, var(--kit-color-surface-1))
				);
				pointer-events: none;
			}
		}
	}

	.toggle {
		display: flex;
		justify-content: center;

		// pull the button up onto the faded area when collapsed
		&.on-fade {
			position: relative;
			z-index: 1;
			margin-top: calc(var(--fade-height) / -2);
		}
	}
</style>
