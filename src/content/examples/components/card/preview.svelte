<script lang="ts">
	import { Heart, Share2 } from 'lucide-svelte';
</script>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
	<kit:card variant="outline">
		<div class="kit-card__media">
			<kit:aspect-ratio ratio="16/9">
				<img src="https://picsum.photos/seed/card1/400/225" alt="" />
			</kit:aspect-ratio>
		</div>
		<p class="kit-card__header">Mountain hike</p>
		<p class="kit-card__body">A breathtaking trail through alpine meadows and rocky peaks.</p>
		<div class="kit-card__footer">
			<span class="kit-card__footer-content">2 hours ago</span>
			<div class="kit-card__actions">
				<kit:btn icon variant="text" density="compact">
					<kit:icon size="sm"><Heart /></kit:icon>
				</kit:btn>
				<kit:btn icon variant="text" density="compact">
					<kit:icon size="sm"><Share2 /></kit:icon>
				</kit:btn>
			</div>
		</div>
	</kit:card>

	<kit:card variant="outline">
		<div class="kit-card__media">
			<kit:aspect-ratio ratio="16/9">
				<img src="https://picsum.photos/seed/card2/400/225" alt="" />
			</kit:aspect-ratio>
		</div>
		<p class="kit-card__header">Forest trail</p>
		<p class="kit-card__body">Dense canopy, mossy rocks, and the sound of a distant waterfall.</p>
		<div class="kit-card__footer">
			<span class="kit-card__footer-content">Yesterday</span>
			<div class="kit-card__actions">
				<kit:btn icon variant="text" density="compact">
					<kit:icon size="sm"><Heart /></kit:icon>
				</kit:btn>
				<kit:btn icon variant="text" density="compact">
					<kit:icon size="sm"><Share2 /></kit:icon>
				</kit:btn>
			</div>
		</div>
	</kit:card>
</div>
