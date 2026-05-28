<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
</script>

<kit:card variant="outline" style="max-width: 320px;">
	<div class="kit-card__media">
		<kit:aspect-ratio ratio="16/9">
			<img src="https://picsum.photos/seed/card3/400/225" alt="" />
		</kit:aspect-ratio>
	</div>

	<p class="kit-card__header">Getting started</p>

	<p class="kit-card__body">
		Learn how to install Lapikit and set up the preprocessor in your Svelte project.
	</p>

	<div class="kit-card__footer">
		<span class="kit-card__footer-content">5 min read</span>
		<div class="kit-card__actions">
			<kit:btn variant="outline" density="compact" size="sm">
				{#snippet prepend()}
					<kit:icon size="sm"><BookOpen /></kit:icon>
				{/snippet}
				Read
			</kit:btn>
		</div>
	</div>
</kit:card>
