<script>
	import { onMount } from 'svelte';

	let { loader } = $props();

	let component = $state(null);
	let error = $state(null);
	let debug = $state(null);

	onMount(async () => {
		try {
			debug = 'onMount démarré';

			const mod = await loader();
			debug = mod;

			component = mod?.default ?? null;

			if (!component) {
				error = new Error('Le module chargé n’a pas de export default');
			}
		} catch (err) {
			error = err;
			console.error('LazyDemo error:', err);
		}
	});
</script>

{#if error}
	<pre>{error?.message}</pre>
{:else if component}
	<svelte:component this={component} />
{:else}
	<div>Chargement en cours…</div>
	<pre>{JSON.stringify(debug, null, 2)}</pre>
{/if}
