<script lang="ts">
	let count = $state(0);
</script>

<button onclick={() => (count = count - 1)}>-1</button>
{count}
<button onclick={() => (count = count + 1)}>+1</button>
