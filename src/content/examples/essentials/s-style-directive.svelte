<script lang="ts">
	let isError = $state(true);
</script>

<!-- Sets: color: red -->
<kit:btn s-style_color="red">Click</kit:btn>

<!-- Sets: background-color: #f0f -->
<kit:btn s-style_background-color="#f0f">Click</kit:btn>

<!-- Dynamic value -->
<kit:btn s-style_color={isError ? 'red' : 'inherit'}>Click</kit:btn>
