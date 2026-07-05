<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
</script>

<kit:card style="max-width: 320px;">
	<kit:card-media>
		<kit:aspect-ratio ratio="16/9">
			<img src="https://picsum.photos/seed/card3/400/225" alt="" />
		</kit:aspect-ratio>
	</kit:card-media>

	<kit:card-title>Getting started</kit:card-title>

	<kit:card-content>
		Learn how to install Lapikit and set up the preprocessor in your Svelte project.
	</kit:card-content>

	<kit:card-actions>
		<span>5 min read</span>
		<kit:spacer />
		<kit:btn density="compact" size="sm">
			{#snippet prepend()}
				<kit:icon size="sm"><BookOpen /></kit:icon>
			{/snippet}
			Read
		</kit:btn>
	</kit:card-actions>
</kit:card>
