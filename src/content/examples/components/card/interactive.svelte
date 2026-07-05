<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
	<kit:card variant="outline" href="/docs">
		<kit:card-title>As a link</kit:card-title>
		<kit:card-content
			>Interactive via <code>href</code> — renders as <code>&lt;a&gt;</code> with hover lift.</kit:card-content
		>
	</kit:card>

	<kit:card interactive>
		<kit:card-title>Interactive</kit:card-title>
		<kit:card-content
			>Hover lift and ripple via <code>interactive</code> prop — stays as
			<code>&lt;div&gt;</code>.</kit:card-content
		>
	</kit:card>
</div>
