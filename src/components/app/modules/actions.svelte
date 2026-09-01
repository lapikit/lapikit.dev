<script lang="ts">
	let { title, path } = $props();
</script>

<kit:card-actions>
	<p>{title}</p>
	<kit:spacer />
	<kit:btn size="xs" href={path}>see</kit:btn>
</kit:card-actions>

<style lang="scss">
	p {
		font-weight: 300;
		font-size: 14px;
	}
</style>
