<script>
	let isActive = $state(false);
	let theme = $state('dark');
	let accentColor = $state('#6200ea');
</script>

<kit:btn
	variant="filled"
	s-class={['my-btn', { active: isActive }]}
	s-class_theme={`--${theme}`}
	s-style={{ 'border-radius': '99px' }}
	s-style_--kit-accent={accentColor}
	onclick={() => (isActive = !isActive)}
>
	Toggle
</kit:btn>
