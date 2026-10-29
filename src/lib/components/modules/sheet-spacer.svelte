<script lang="ts">
	let {
		top,
		bottom,
		innerTop,
		innerBottom,
		...rest
	}: {
		top?: boolean;
		bottom?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<div
	style:border-top={top ? 'var(--lapikit-border)' : ''}
	style:border-bottom={bottom ? 'var(--lapikit-border)' : ''}
	{...rest}
>
	<div
		style:border-top={innerTop ? 'var(--lapikit-border)' : ''}
		style:border-bottom={innerBottom ? 'var(--lapikit-border)' : ''}
	></div>
</div>

<style lang="scss">
	div {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;
		padding: 0 var(--lapikit-spacing-block);
		height: calc(32px + var(--lapikit-spacing-block));

		> div {
			border-right: var(--lapikit-border);
			border-left: var(--lapikit-border);
		}
	}
</style>
