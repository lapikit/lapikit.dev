<script lang="ts">
	let isError = $state(true);
	let brandColor = $state('orange');
</script>

<!-- Sets: color: red -->
<kit:btn style:color="red">Click</kit:btn>

<!-- Dynamic value -->
<kit:btn style:color={isError ? 'red' : 'inherit'}>Click</kit:btn>

<!-- CSS custom property -->
<kit:btn style:--kit-accent={brandColor}>Click</kit:btn>
