<script lang="ts">
	let counter = $state(0);
</script>

<kit:btn onclick={() => counter++}>Count is: {counter}</kit:btn>
