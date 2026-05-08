<script lang="ts">
	// states
	let isOpen = $state(false);
</script>

<kit:btn onclick={() => (isOpen = true)} active={isOpen}>Open Modal</kit:btn>

<kit:modal bind:open={isOpen}>
	<h2 class="text-lg font-medium">This is a Modal Lapikit</h2>
	<p class="mt-2 text-gray-600">You can put any content you like here.</p>
	<kit:btn onclick={() => (isOpen = false)}>Close</kit:btn>
</kit:modal>
