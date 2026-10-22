<script>
	let isActive = $state(true);
	let isDisabled = $state(false);
</script>

<!-- Result: class="active" -->
<kit:btn s-class={{ active: isActive, disabled: isDisabled }}>Click</kit:btn>
