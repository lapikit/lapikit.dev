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
		{ version: '0.5.4', value: 18788 },
		{ version: '0.5.5', value: 20784 },
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
						borderColor: '#1D9E75',
						backgroundColor: 'rgba(29,158,117,0.08)',
						pointBackgroundColor: '#1D9E75',
						pointBorderColor: '#fff',
						pointBorderWidth: 2,
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
