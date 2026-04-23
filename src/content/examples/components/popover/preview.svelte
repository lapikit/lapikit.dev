<kit:popover>
	{#snippet activator({ toggle })}
		<kit:btn variant="outline" onclick={(e) => toggle(e.currentTarget)}>
			Open popover
		</kit:btn>
	{/snippet}

	<div style="min-width: 14rem;">
		<p style="margin: 0 0 0.375rem; font-weight: 600;">Popover title</p>
		<p style="margin: 0; opacity: 0.7; font-size: 0.875rem;">
			Rich content can go here — links, buttons, or any component. Closes on click outside.
		</p>
	</div>
</kit:popover>
