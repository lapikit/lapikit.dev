<script lang="ts">
	let active = $state(true);
	let isDark = $state(false);
</script>

<!-- Adds class "active" when active is true (shorthand of class:active={active}) -->
<kit:btn class:active>Click</kit:btn>

<!-- Number or text: the value is appended, "gap-4" -->
<kit:btn class:gap={4}>Click</kit:btn>

<!-- BEM modifier: "theme--dark" or "theme--light" -->
<kit:btn class:theme={isDark ? '--dark' : '--light'}>Click</kit:btn>
