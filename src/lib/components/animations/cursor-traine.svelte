<script lang="ts">
	import { Snowflake } from 'lucide-svelte';

	const SIZE = 12;
	const COLORS = ['#8250df', '#3fb950', '#bf8700', '#ffffff'];

	type Block = { id: number; x: number; y: number; color: string };
	let blocks = $state<Block[]>([]);
	let id = 0;
	let last = '';

	function onMove(e: PointerEvent) {
		const x = Math.floor(e.clientX / SIZE) * SIZE;
		const y = Math.floor(e.clientY / SIZE) * SIZE;
		const key = `${x}:${y}`;
		if (key === last) return;
		last = key;
		blocks.push({ id: id++, x, y, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
	}

	function remove(blockId: number) {
		blocks = blocks.filter((b) => b.id !== blockId);
	}
</script>

<svelte:window onpointermove={onMove} />

<div class="trail" aria-hidden="true">
	{#each blocks as b (b.id)}
		<div
			class="block"
			style:left="{b.x}px"
			style:top="{b.y}px"
			style:width="{SIZE}px"
			style:height="{SIZE}px"
			style:background={b.color}
			style:border-radius="5px"
			onanimationend={() => remove(b.id)}
		>
			<Snowflake />
		</div>
	{/each}
</div>

<style>
	.trail {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: 9999;
	}
	.block {
		position: absolute;
		animation: fade 600ms steps(4) forwards;
	}
	@keyframes fade {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.block {
			display: none;
		}
	}
</style>
