<script lang="ts">
	import { Plus } from 'lucide-svelte';

	let {
		users = [],
		more = false,
		moreHref = '#',
		moreLabel = 'Voir plus'
	}: {
		users?: { src: string; alt: string; href: string }[];
		more?: boolean;
		moreHref?: string;
		moreLabel?: string;
	} = $props();

	const total = $derived(users.length + (more ? 1 : 0));
	const random = (seed: number) => {
		const x = Math.sin(seed * 12.9898) * 43758.5453;
		return x - Math.floor(x);
	};
	const fan = (index: number) => {
		const side = index % 2 === 0 ? -1 : 1;
		return {
			rotate: side * (3 + random(index + 1) * 7),
			lift: (random(index + 42) - 0.5) * 12,
			z: total - index
		};
	};
</script>

<ul>
	{#each users as user, index (index)}
		{@const { rotate, lift, z } = fan(index)}
		<li style:--rotate="{rotate}deg" style:--lift="{lift}px" style:z-index={z}>
			<a href={user.href} target="_blank" rel="external noopener noreferrer">
				<img src={user.src} alt={user.alt} loading="lazy" decoding="async" />
			</a>
		</li>
	{/each}
	{#if more}
		{@const { rotate, lift, z } = fan(users.length)}
		<li class="more" style:--rotate="{rotate}deg" style:--lift="{lift}px" style:z-index={z}>
			<a href={moreHref} target="_blank" rel="external noopener noreferrer" aria-label={moreLabel}>
				<Plus aria-hidden="true" />
			</a>
		</li>
	{/if}
</ul>

<style lang="scss">
	ul {
		--size: 74px;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding: var(--app-spacing-x-container) 0;
		margin: 0;

		li {
			width: var(--size);
			flex: 0 0 auto;
			transform: translateY(var(--lift)) rotate(var(--rotate));
			transition: transform 0.25s ease;
			cursor: pointer;

			&:not(:first-child) {
				margin-left: calc(var(--size) * -0.36);
			}
		}

		a {
			display: block;
			border-radius: 18px;
			overflow: hidden;
			border: 1px solid var(--kit-color-border);
		}

		img {
			display: block;
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
		}

		.more a {
			display: flex;
			align-items: center;
			justify-content: center;
			aspect-ratio: 1;
			background: var(--kit-color-surface);
			color: var(--kit-color-text-muted);

			&:hover {
				border-color: var(--kit-color-accent);
			}

			:global(svg) {
				width: 40%;
				height: 40%;
			}
		}
	}

	@media (min-width: 720px) {
		ul {
			--size: 94px;
		}
	}
</style>
