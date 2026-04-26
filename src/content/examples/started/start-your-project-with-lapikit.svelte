<script lang="ts">
	let counter: number = $state(0);
</script>

<kit:app>
	<kit:btn onclick={() => counter++}>Count is: {counter}</kit:btn>
</kit:app>
