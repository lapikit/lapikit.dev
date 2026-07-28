<script lang="ts">
	import { Check, Minus, OctagonAlert, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { value, children }: { value?: any; children?: Snippet } = $props();
</script>

{#if value == 'true' || value == 'yes' || (typeof value === 'boolean' && value)}
	<kit:icon color="success"><Check /></kit:icon>
{:else if value == 'false' || value == 'no' || (typeof value === 'boolean' && !value)}
	<kit:icon color="error"><X /></kit:icon>
{:else if value == 'partial'}
	<kit:icon color="warning"><OctagonAlert /></kit:icon>
{:else if value == 'nothing'}
	<kit:icon><Minus /></kit:icon>
{:else}
	{@render children?.()}
{/if}
