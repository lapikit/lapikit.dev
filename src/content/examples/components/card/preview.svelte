<script lang="ts">
	import { Heart, Share2 } from 'lucide-svelte';
</script>

<div
	style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;"
>
	<kit:card>
		<kit:card-media>
			<kit:aspect-ratio ratio="16/9">
				<img src="https://picsum.photos/seed/card1/400/225" alt="" />
			</kit:aspect-ratio>
		</kit:card-media>
		<kit:card-title>Mountain hike</kit:card-title>
		<kit:card-content>A breathtaking trail through alpine meadows and rocky peaks.</kit:card-content
		>
		<kit:card-actions>
			<span>2 hours ago</span>
			<kit:spacer />
			<kit:btn icon variant="text" density="compact">
				<kit:icon size="sm"><Heart /></kit:icon>
			</kit:btn>
			<kit:btn icon variant="text" density="compact">
				<kit:icon size="sm"><Share2 /></kit:icon>
			</kit:btn>
		</kit:card-actions>
	</kit:card>

	<kit:card variant="outline">
		<kit:card-media>
			<kit:aspect-ratio ratio="16/9">
				<img src="https://picsum.photos/seed/card2/400/225" alt="" />
			</kit:aspect-ratio>
		</kit:card-media>
		<kit:card-title>Forest trail</kit:card-title>
		<kit:card-content
			>Dense canopy, mossy rocks, and the sound of a distant waterfall.</kit:card-content
		>
		<kit:card-actions>
			<span>Yesterday</span>
			<kit:spacer />
			<kit:btn icon variant="text" density="compact">
				<kit:icon size="sm"><Heart /></kit:icon>
			</kit:btn>
			<kit:btn icon variant="text" density="compact">
				<kit:icon size="sm"><Share2 /></kit:icon>
			</kit:btn>
		</kit:card-actions>
	</kit:card>
</div>
