<script lang="ts">
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Filler,
		Tooltip
	} from 'chart.js';
	import { onDestroy, onMount } from 'svelte';

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Filler,
		Tooltip
	);

	let canvas: HTMLCanvasElement;
	let chart: Chart;
	const data = [
		{ version: '0.5.4', value: 34724 },
		{ version: '0.5.5', value: 24054 },
		{ version: '0.5.6', value: 27541 },
		{ version: '0.5.7', value: 39724 },
		{ version: 'current', value: 45865 }
	];

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: data.map((d) => d.version),
				datasets: [
					{
						label: 'downloads',
						data: data.map((d) => d.value),
						borderColor: 'rgba(42,109,244,0.62)',
						backgroundColor: 'rgba(42,109,244,0.00)',
						pointBackgroundColor: 'rgba(42,109,244,0.01)',
						pointBorderColor: 'rgba(42,109,244,0.62)',
						pointBorderWidth: 1,
						pointRadius: (ctx) => (ctx.dataIndex === data.length - 1 ? 0 : 5),
						tension: 0.35,
						fill: true
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					delay: (ctx) => ctx.dataIndex * 200,
					duration: 1000,
					easing: 'easeOutQuart'
				},
				transitions: {
					active: { animation: { duration: 0 } }
				},
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (ctx) => ` ${ctx.parsed.y!.toLocaleString('en-US')} dl`
						}
					}
				},
				scales: {
					// x: {
					// 	grid: { display: false },
					// 	border: { display: false },
					// 	ticks: {
					// 		font: { size: 10 },
					// 		callback: (_, index) => (data[index].version === 'current' ? '' : data[index].version)
					// 	}
					// },
					x: {
						display: false
					},
					y: {
						display: false
					}
				}
			}
		});
	});

	onDestroy(() => chart?.destroy());
</script>

<div>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	div {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
