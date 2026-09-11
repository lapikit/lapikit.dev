<script lang="ts">
	import nycolaideImage from '$lib/assets/images/heros/nycolaide.jpeg';
	import fersimoneImage from '$lib/assets/images/heros/fersimone.jpeg';
	import { links, urlJoinLapikitTeam, type LinkName } from '$lib/constants';
	import { GitGraph } from 'lucide-svelte';

	type SupportImage = {
		src: string;
		href: string;
		alt: string;
	};

	const images: SupportImage[] = [
		{
			src: nycolaideImage,
			href: 'https://github.com/Nycolaide',
			alt: 'nycolaide github'
		},
		{
			src: fersimoneImage,
			href: 'https://github.com/fersimone',
			alt: 'fersimone github'
		}
	].slice(0, 5);

	const mid = (images.length - 1) / 2;
	const socials: LinkName[] = ['buymeacoffee'];

	const cards = images.map((image, index) => {
		const offset = index - mid;
		return {
			...image,
			rotate: offset * 8,
			lift: Math.abs(offset) * 6,
			z: images.length - Math.abs(Math.round(offset))
		};
	});
</script>

<div class="wrapper">
	<ul class="fan">
		{#each cards as card, index (index)}
			<li style:--rotate="{card.rotate}deg" style:--lift="{card.lift}px" style:z-index={card.z}>
				<a href={card.href} target="_blank" rel="external noopener noreferrer">
					<img src={card.src} alt={card.alt} loading="lazy" decoding="async" />
				</a>
			</li>
		{/each}
	</ul>
	<div>
		<h2>
			<span class="muted-text">Free</span> and <span class="muted-text">open-source</span>,
			<br /> Built by the <span class="accent-text">community</span>
		</h2>

		<p class="subtitle">Lapikit welcomes contributions from developers around the world</p>
	</div>
	<div>
		{#each socials as name (name)}
			{@const link = links[name]}
			<kit:btn
				href={link.url}
				target="_blank"
				color={link._styles.color}
				background={link._styles.background}
				rounded="lg"
				size="lg"
			>
				{#snippet prepend()}
					<kit:icon>
						{@html link.icon}
					</kit:icon>
				{/snippet}
				{link.label}
			</kit:btn>
		{/each}
		<kit:btn href={urlJoinLapikitTeam} rounded="lg" size="lg" target="_blank">
			{#snippet prepend()}
				<kit:icon>
					<GitGraph />
				</kit:icon>
			{/snippet}
			Join team developement
		</kit:btn>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: min-content 1fr auto;
		align-items: center;
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

		> ul {
			padding-left: 50px;
			padding-right: 50px;
		}
	}

	.fan {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding: 48px 0;
		margin: 0;

		li {
			--size: 94px;
			width: var(--size);
			flex: 0 0 auto;
			transform: translateY(var(--lift)) rotate(var(--rotate));
			transition: transform 0.25s ease;

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
	}
</style>
