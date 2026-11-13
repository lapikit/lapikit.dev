<script lang="ts">
	let value = $state('Hello Lapikit');
</script>

<div style="max-width: 360px;">
	<kit:textfield bind:value placeholder="Type something..." clearable />
</div>
