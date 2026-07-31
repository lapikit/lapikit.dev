<script lang="ts">
	import { CircleDot } from 'lucide-svelte';
</script>

<kit:alert>
	{#snippet prepend()}
		<kit:icon>
			<CircleDot />
		</kit:icon>
	{/snippet}

	<div>
		<p>You have new mission</p>
		<p>Install lapikit on your project</p>
	</div>

	{#snippet append()}
		<kit:btn> Install </kit:btn>
	{/snippet}
</kit:alert>

<style lang="scss">
	div {
		p:first-child {
			font-weight: 600;
		}

		p:last-child {
			color: var(--kit-color-text-muted);
		}
	}
</style>
