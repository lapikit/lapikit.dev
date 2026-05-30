<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
	<kit:card variant="outline" href="/docs">
		<p class="kit-card__header">As a link</p>
		<p class="kit-card__body">Interactive via <code>href</code> — renders as <code>&lt;a&gt;</code> with hover lift.</p>
	</kit:card>

	<kit:card variant="outline" interactive>
		<p class="kit-card__header">Interactive</p>
		<p class="kit-card__body">Hover lift and ripple via <code>interactive</code> prop — stays as <code>&lt;div&gt;</code>.</p>
	</kit:card>
</div>
