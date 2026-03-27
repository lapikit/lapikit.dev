<script lang="ts">
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';

	let { loader, fallback = 'Chargement de la démo…' } = $props<{
		loader: () => Promise<{ default: ComponentType }>;
		fallback?: string;
	}>();

	let Component = $state<ComponentType | null>(null);
	let loading = $state<boolean>(true);
	let error = $state<Error | null>(null);

	onMount(async () => {
		try {
			const mod = await loader();

			if (!mod?.default) {
				throw new Error('The loaded module does not have a default export');
			}

			Component = mod.default;
		} catch (err) {
			error = err instanceof Error ? err : new Error('Error');
			console.error('LazyDemo error:', err);
		} finally {
			loading = false;
		}
	});
</script>

{#if error}
	<div class="lazy-demo lazy-demo--error">
		<strong>Unable to load the component</strong>
		<pre>{error.message}</pre>
	</div>
{:else if loading}
	<div class="lazy-demo lazy-demo--loading">
		{fallback}
	</div>
{:else if Component}
	<Component />
{/if}
