<script lang="ts">
	import { router } from '$lib';

	type ComponentItem = {
		name: string;
		label: string;
		url: string;
		image?: string;
	};

	const section = router.documentation.find((entry) => entry.label === 'Components');

	const components: ComponentItem[] = (section?.pages ?? []).filter((page): page is ComponentItem =>
		Boolean(page.image && page.name)
	);

	const ROWS = 3;

	function fill(items: ComponentItem[], min = 14): ComponentItem[] {
		if (items.length === 0) return items;
		const out: ComponentItem[] = [];
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

<section aria-label="Lapikit components">
	<div class="marquee">
		{#each rows as { items, duration, reverse }, row (row)}
			<div class="marquee-row" class:reverse style:--duration="{duration}s">
				<ul class="marquee-track">
					{#each [...items, ...items] as component, index (row + '-' + index)}
						<li>
							<kit:chip
								href={component.url}
								aria-hidden={index >= items.length}
								tabindex={index >= items.length ? -1 : 0}
								density="comfortable"
								size="lg"
							>
								{#snippet prepend()}
									<kit:avatar s-style_--kit-avatar-h="28px" s-style_margin-left="-8px">
										<img
											src={component.image}
											alt={component.name}
											loading="lazy"
											decoding="async"
										/>
									</kit:avatar>
								{/snippet}
								<span>&lt;&nbsp;{component.name}&nbsp;/&gt;</span>
							</kit:chip>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 5rem;
		padding-bottom: 5rem;
		overflow: hidden;
	}

	.marquee {
		display: grid;
		gap: 16px;
		mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
	}

	.marquee-row {
		overflow: hidden;
		overflow: clip;
		overflow-clip-margin: 6px;

		&.reverse .marquee-track {
			animation-direction: reverse;
		}
	}

	.marquee-track {
		display: flex;
		width: max-content;
		gap: 12px;
		padding: 0;
		margin: 0;
		list-style: none;
		animation: marquee-scroll var(--duration, 50s) linear infinite;
		will-change: transform;

		&:hover {
			animation-play-state: paused;
		}
	}

	li {
		flex: 0 0 auto;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
