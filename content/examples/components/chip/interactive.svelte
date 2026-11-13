<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
	<kit:chip variant="outline">Static</kit:chip>
	<kit:chip variant="outline" onclick={() => alert('clicked')}>With onclick</kit:chip>
	<kit:chip variant="outline" href="/docs">As a link</kit:chip>
	<kit:chip variant="outline" interactive={false} onclick={() => alert('clicked')}>
		No feedback
	</kit:chip>
</div>
