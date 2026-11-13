<script lang="ts">
	type ModalPosition = 'top' | 'center' | 'bottom';
	let position = $state<ModalPosition>('center');
	let open = $state(false);

	function show(pos: ModalPosition) {
		position = pos;
		open = true;
	}
</script>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
	<kit:btn onclick={() => show('top')}>Top</kit:btn>
	<kit:btn onclick={() => show('center')}>Center</kit:btn>
	<kit:btn onclick={() => show('bottom')}>Bottom</kit:btn>
</div>

<kit:modal bind:open {position}>
	<p style="margin: 0 0 1rem; opacity: 0.7;">Position: <strong>{position}</strong></p>
	<kit:btn onclick={() => (open = false)}>Close</kit:btn>
</kit:modal>
