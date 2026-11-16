<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
	<kit:card variant="outline" href="/docs">
		<kit:card-title>As a link</kit:card-title>
		<kit:card-content
			>Detected via <code>href</code> — renders as <code>&lt;a&gt;</code>.</kit:card-content
		>
	</kit:card>

	<kit:card variant="outline" interactive>
		<kit:card-title>Forced</kit:card-title>
		<kit:card-content
			>Hover, pressed and ripple via <code>interactive</code> — stays a
			<code>&lt;div&gt;</code>.</kit:card-content
		>
	</kit:card>

	<kit:card variant="outline" interactive={false} onclick={() => alert('clicked')}>
		<kit:card-title>No feedback</kit:card-title>
		<kit:card-content
			>Still clickable, but <code>interactive=&#123;false&#125;</code> removes the visual feedback.</kit:card-content
		>
	</kit:card>
</div>
