<script lang="ts">
	import PixelBlast from '$lib/components/animations/pixel-blast.svelte';
</script>

<section>
	<div id="pixelblast">
		<PixelBlast
			pixelSize={6}
			colorRGB="42,109,244"
			threshold={0.42}
			noiseScale={0.009}
			evolveSpeed={0.00005}
			ripple={true}
			edgeFade={0}
		/>
	</div>
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 85vh;
		top: -80px;

		#pixelblast {
			position: absolute;
			inset: 0;
			z-index: 0;
			top: 0;
		}
	}
</style>
