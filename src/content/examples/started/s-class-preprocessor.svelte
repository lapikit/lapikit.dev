<script lang="ts">
	let isActive: boolean = $state(true);
	let visible: boolean = $state(true);
</script>

<!-- Native Svelte on HTML elements -->
<div class:active={isActive} class:hidden={!visible}>...</div>

<!-- Lapikit equivalent on components -->
<kit:btn s-class_active={isActive} s-class_hidden={!visible}>...</kit:btn>
