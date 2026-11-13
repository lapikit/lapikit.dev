<script lang="ts">
	let brandColor: string = $state('#eee');
</script>

<!-- Native Svelte on HTML elements -->
<div style:color={brandColor} style:font-size="1rem">...</div>

<!-- Lapikit equivalent on components -->
<kit:btn s-style_color={brandColor} s-style_font-size="1rem">...</kit:btn>
