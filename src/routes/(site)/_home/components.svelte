<script lang="ts">
	import { page } from '$app/state';
	import type { MarqueeComponent } from '$lib/types';

	// states
	const row_count = 3;

	const components = page.data.components ?? [];

	function fill(items: MarqueeComponent[], min = 14): MarqueeComponent[] {
		if (items.length === 0) return items;
		const out: MarqueeComponent[] = [];
		while (out.length < min) out.push(...items);
		return out;
	}

	const rows = Array.from({ length: row_count }, (_, row) => {
		const unique = components.filter((_, index) => index % row_count === row);
		return {
			items: fill(unique),
			uniqueCount: unique.length,
			duration: [46, 62, 54][row] ?? 50,
			reverse: row % 2 === 1
		};
	});
</script>

<div id="list-components">
	<div>
		{#each rows as { items, uniqueCount, duration, reverse }, row (row)}
			<div class:reverse style:--duration="{duration}s">
				<ul>
					{#each [...items, ...items] as component, index (row + '-' + index)}
						<li class:copy={index >= uniqueCount}>
							<kit:chip
								href={component.url}
								aria-hidden={index >= uniqueCount}
								tabindex={index >= uniqueCount ? -1 : 0}
								density="comfortable"
								rounded="md"
								size="lg"
							>
								{#snippet prepend()}
									<kit:avatar
										rounded="sm"
										style:--kit-avatar-h="28px"
										style:margin-left="-8px"
										style:margin-right="4px"
									>
										<img
											src={component.image}
											alt={component.name}
											loading="lazy"
											decoding="async"
										/>
									</kit:avatar>
								{/snippet}
								<span class="text-code">&lt;{component.name}/&gt;</span>
							</kit:chip>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	#list-components {
		overflow: hidden;

		> div {
			display: grid;
			gap: 16px;
			mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
			-webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);

			> div {
				overflow: hidden;
				overflow: clip;
				overflow-clip-margin: 6px;

				&.reverse ul {
					animation-direction: reverse;
				}

				ul {
					display: flex;
					width: max-content;
					gap: 12px;
					padding: 0;
					margin: 0;
					list-style: none;
					animation: scroll-horizontal-chip var(--duration, 50s) linear infinite;
					will-change: transform;

					&:hover,
					&:focus-within {
						animation-play-state: paused;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					overflow-x: auto;

					ul {
						animation: none;
					}

					.copy {
						display: none;
					}
				}
			}
		}
	}
</style>
