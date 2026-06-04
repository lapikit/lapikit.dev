<script lang="ts">
	import { appMobileNavigation } from '$lib';
	import { Search } from 'lucide-svelte';

	let { ...rest } = $props();
</script>

<div id="bottom-navigation" {...rest}>
	<kit:toolbar density="compact">
		{#each appMobileNavigation as item (item.label)}
			<kit:btn density="comfortable" icon href={item.url}>
				<div>
					<kit:icon size="xl">
						{#if typeof item.icon === 'string'}
							{@html item.icon}
						{:else}
							{@const Icon = item.icon}
							<Icon />
						{/if}
					</kit:icon>
					<p>{item.label}</p>
				</div>
			</kit:btn>
		{/each}
	</kit:toolbar>

	<kit:btn size="xl" rounded="lg" icon> <kit:icon> <Search /> </kit:icon> </kit:btn>
</div>

<style>
	#bottom-navigation {
		max-width: 98%;
		background-color: purple;
		border-radius: 8px;
		position: fixed;
		bottom: 1%;
		z-index: 30;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}

	p {
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>
