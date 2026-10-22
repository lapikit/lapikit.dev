<div style="display: flex; flex-direction: column; gap: 0.75rem;">
	<kit:alert variant="tonal" color="accent">A color of the palette, without tone.</kit:alert>
	<kit:alert variant="surface" color="#7c3aed">Any CSS color works too.</kit:alert>
	<kit:alert tone="error" variant="tonal" color="warning">
		The tone stays error (role="alert"), the color is overridden.
	</kit:alert>
	<kit:alert tone="info" variant="surface" multiline>
		With multiline, the snippets are aligned on the first line.<br />
		Useful for messages on several lines.
	</kit:alert>
</div>
