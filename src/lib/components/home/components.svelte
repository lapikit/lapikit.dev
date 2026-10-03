<script lang="ts">
	import { router } from '$lib/router';
	import type { NavPage } from '$lib/@types';

	// states
	const ROWS = 3;

	const section = router.documentation.find((entry) => entry.label === 'Components');

	const components: NavPage[] = (section?.pages ?? []).filter((page): page is NavPage =>
		Boolean(page.image && page.name)
	);

	function fill(items: NavPage[], min = 14): NavPage[] {
		if (items.length === 0) return items;
		const out: NavPage[] = [];
		while (out.length < min) out.push(...items);
		return out;
	}

	const rows = Array.from({ length: ROWS }, (_, row) => {
		const offset = row * 3;
		const ordered = [...components.slice(offset), ...components.slice(0, offset)];
		return {
			items: fill(ordered.filter((_, index) => index % ROWS === row)),
			duration: [46, 62, 54][row] ?? 50,
			reverse: row % 2 === 1
		};
	});
</script>

<div id="list-components">
	<div>
		{#each rows as { items, duration, reverse }, row (row)}
			<div class:reverse style:--duration="{duration}s">
				<ul>
					{#each [...items, ...items] as component, index (row + '-' + index)}
						<li>
							<kit:chip
								href={component.url}
								aria-hidden={index >= items.length}
								tabindex={index >= items.length ? -1 : 0}
								density="comfortable"
								rounded="md"
								size="lg"
							>
								{#snippet prepend()}
									<kit:avatar
										rounded="sm"
										s-style_--kit-avatar-h="28px"
										s-style_margin-left="-8px"
										s-style_margin-right="4px"
									>
										<img
											src={component.icon ? component.icon : component.image}
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

					&:hover {
						animation-play-state: paused;
					}
				}
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		ul {
			animation: none;
		}
	}
</style>
