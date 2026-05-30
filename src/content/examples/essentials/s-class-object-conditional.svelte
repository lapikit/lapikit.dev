<script>
	let isActive = $state(true);
	let isDisabled = $state(false);
</script>

<kit:btn s-class={{ active: isActive, disabled: isDisabled }}> Click </kit:btn>

<!-- s-class={{ active: true, theme: 'dark' }} -->
<!-- Result: class="active dark" -->
<kit:btn s-class={{ active: true, theme: 'dark' }}>Click</kit:btn>
