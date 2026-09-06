<script lang="ts">
	let { property = $bindable() } = $props();
</script>

<button onclick={() => (property = !property)}>
	&#123;<span>{property}</span>&#125;
</button>

<style lang="scss">
	span {
		background-color: color-mix(in oklab, var(--kit-color-accent) 12%, transparent 30%);
		border-radius: var(--kit-shape-sm);
	}
</style>
