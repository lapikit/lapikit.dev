<script lang="ts">
	import type { Snippet } from 'svelte';
	import { links, urlJoinLapikitTeam, type LinkName } from '$lib/constants';
	import { capitalize } from '$lib/utils';
	import { profilGithub } from '../../../content/app/profil-github';

	// modules
	import ProfilGithub from '../modules/profil-github.svelte';

	// assets
	import { GitGraph } from 'lucide-svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	const images = profilGithub.slice(0, 5);
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

<div>
	<ProfilGithub users={cards} />
	<div>
		{@render children?.()}
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
				{capitalize(link.label)}
			</kit:btn>
		{/each}
		<kit:btn href={urlJoinLapikitTeam} rounded="lg" size="lg" target="_blank">
			{#snippet prepend()}
				<kit:icon>
					<GitGraph />
				</kit:icon>
			{/snippet}
			{capitalize('join team developement')}
		</kit:btn>
	</div>
</div>

<style lang="scss">
	div:first-child {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		list-style: none;
		justify-content: center;
		text-align: center;

		> div:last-child {
			display: grid;
			gap: 10px;
		}

		@media (min-width: 510px) {
			> div:last-child {
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
