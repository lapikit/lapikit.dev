<script lang="ts">
	let isDark = $state(false);
</script>

<!-- Adds class "theme--dark" -->
<kit:btn s-class_theme="--dark">Click</kit:btn>

<!-- Dynamic: "theme--dark" or "theme--light" -->
<kit:btn s-class_theme={isDark ? '--dark' : '--light'}>Click</kit:btn>
