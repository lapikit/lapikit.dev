<script lang="ts">
	import {
		findColorNameByRgb,
		formatColor,
		getContrastLevel,
		getContrastRatioOnWhiteFromRgb,
		oklchToRgb,
		parseOklch,
		type ColorFormat,
		type RgbColor
	} from './parse-color';
	import tailwind from './tailwind-color';

	const formats: ColorFormat[] = ['oklch', 'hex', 'rgb', 'hsl'];
	const colorFamilies = Object.entries(tailwind);
	let colorFormat = $state<ColorFormat>('oklch');
	let colorSelected = $state('');
	let selectedRgb = $state<RgbColor | null>(null);

	const colorNameSelected = $derived(findColorNameByRgb(selectedRgb, tailwind));
	const ratioColorSelected = $derived(
		selectedRgb ? getContrastRatioOnWhiteFromRgb(selectedRgb) : 0
	);

	function cssColorToRgb(value: string): RgbColor | null {
		if (!value) return null;

		const parsedOklch = parseOklch(value);
		if (parsedOklch) {
			return oklchToRgb(parsedOklch);
		}

		if (typeof window === 'undefined' || !CSS.supports('color', value)) return null;

		const probe = document.createElement('div');
		probe.style.color = value;
		document.body.appendChild(probe);

		const computedColor = getComputedStyle(probe).color;
		probe.remove();

		const match = computedColor.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/i);
		if (!match) return null;

		return {
			r: Math.round(Number(match[1])),
			g: Math.round(Number(match[2])),
			b: Math.round(Number(match[3]))
		};
	}

	function selectColor(value: string) {
		const parsedOklch = parseOklch(value);
		const rgb = parsedOklch ? oklchToRgb(parsedOklch) : cssColorToRgb(value);
		if (!rgb) return;

		selectedRgb = rgb;
		colorSelected = formatColor(rgb, colorFormat);
	}

	function updateColorFromInput(value: string) {
		colorSelected = value;

		const rgb = cssColorToRgb(value);
		if (!rgb) return;

		selectedRgb = rgb;
	}

	function updateFormat(nextFormat: string) {
		colorFormat = nextFormat as ColorFormat;

		if (!selectedRgb) return;

		colorSelected = formatColor(selectedRgb, colorFormat);
	}
</script>

<div class="color-picker">
	{#each colorFamilies as [familyName, shades] (familyName)}
		<div id={familyName}>
			{#each Object.entries(shades) as [shade, value] (shade)}
				<button
					type="button"
					class="card-color"
					class:active={colorNameSelected === `${familyName}-${shade}`}
					style:background={value}
					aria-label={`${familyName}-${shade} ${value}`}
					onclick={() => selectColor(value)}
				></button>
			{/each}
		</div>
	{/each}
</div>
<div class="meta-info">
	Color value:
	<div class="card-color" style:background={colorSelected}></div>
	<select
		value={colorFormat}
		onchange={(event) => updateFormat((event.currentTarget as HTMLSelectElement).value)}
	>
		{#each formats as format (format)}
			<option value={format}>{format}</option>
		{/each}
	</select>
	<input
		type="text"
		value={colorSelected}
		oninput={(event) => updateColorFromInput((event.currentTarget as HTMLInputElement).value)}
	/>
	<span>{colorNameSelected}</span>
	Ratio contraste: {ratioColorSelected}
	{getContrastLevel(ratioColorSelected)}
</div>

<style>
	.color-picker {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20px, 20px));
	}

	.card-color {
		width: 20px;
		height: 20px;
		padding: 0;
		border: 0;
		border: 1px solid transparent;
	}

	.card-color.active {
		border: 1px solid black;
	}
</style>
