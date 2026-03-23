<script lang="ts">
	import {
		findColorNameByRgb,
		formatColor,
		getContrastLevel,
		getContrastRatioOnWhiteFromRgb,
		oklchToRgb,
		parseOklch
	} from '$lib/utils';
	import type { ColorFormat, RgbColor } from '$lib/@types';

	import { tailwindColors } from '$lib/assets';

	type ThemeTokenList = Array<[string, string]>;

	let { color = $bindable(), handleClick, list = [] as ThemeTokenList } = $props();

	const formats: ColorFormat[] = ['oklch', 'hex', 'rgb', 'hsl'];
	const colorFamilies = Object.entries(tailwindColors);
	let colorFormat = $state<ColorFormat>('oklch');
	let colorSelected = $state('');
	let selectedRgb = $state<RgbColor | null>(null);

	const colorNameSelected = $derived(findColorNameByRgb(selectedRgb, tailwindColors));
	const ratioColorSelected = $derived(
		selectedRgb ? getContrastRatioOnWhiteFromRgb(selectedRgb) : 0
	);

	$effect(() => {
		if (color) {
			colorFormat = detectColorFormat(color.value);
			colorSelected = color.value;
			selectedRgb = cssColorToRgb(color.value);
		}
	});

	function getTokenInitials(tokenName: string) {
		return tokenName
			.split('-')
			.map((part) => part[0] ?? '')
			.join('');
	}

	function normalizeColorValue(value: string) {
		const parsedOklch = parseOklch(value);
		if (parsedOklch) {
			return `oklch(${parsedOklch.l}-${parsedOklch.c}-${parsedOklch.h})`;
		}

		return value.trim().toLowerCase();
	}

	function getListLabelByColor(value: string) {
		const normalizedValue = value.includes('oklch') ? value : normalizeColorValue(value);
		const matchedToken = list?.find(([, tokenValue]) => tokenValue === normalizedValue);

		console.log('GW1 normalizedValue', normalizedValue);
		if (!matchedToken) return '';

		return getTokenInitials(matchedToken[0]);
	}

	function getTokenInitialsColor(value: string) {
		const rgb = cssColorToRgb(value);
		if (!rgb) return '#111';

		const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
		return brightness < 140 ? '#fff' : '#111';
	}

	function detectColorFormat(value: string): ColorFormat {
		const normalizedValue = value.trim().toLowerCase();

		if (normalizedValue.startsWith('oklch(')) return 'oklch';
		if (normalizedValue.startsWith('#')) return 'hex';
		if (normalizedValue.startsWith('rgb(') || normalizedValue.startsWith('rgba(')) return 'rgb';
		if (normalizedValue.startsWith('hsl(') || normalizedValue.startsWith('hsla(')) return 'hsl';

		return 'oklch';
	}

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
		handleClick(color?.key, formatColor(rgb, colorFormat));
	}

	function updateColorFromInput(value: string) {
		colorSelected = value;

		const rgb = cssColorToRgb(value);
		if (!rgb) return;

		selectedRgb = rgb;
		handleClick(color?.key, value);
	}

	function updateFormat(nextFormat: string) {
		colorFormat = nextFormat as ColorFormat;

		if (!selectedRgb) return;

		const nextValue = formatColor(selectedRgb, colorFormat);
		colorSelected = nextValue;
		handleClick(color?.key, nextValue);
	}
</script>

{#if color}
	<div id="modal-color-picker">
		<button onclick={() => (color = undefined)}>close</button>
		<div class="color-picker">
			{#each colorFamilies as [familyName, shades] (familyName)}
				<div id={familyName}>
					{#each Object.entries(shades) as [shade, value] (shade)}
						<button
							type="button"
							class="card-color"
							class:active={colorNameSelected === `${familyName}-${shade}`}
							style:background={value}
							style:color={getTokenInitialsColor(value)}
							aria-label={`${familyName}-${shade} ${value}`}
							onclick={() => selectColor(value)}
						>
							{getListLabelByColor(value)}
						</button>
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
	</div>
{/if}

<style>
	#modal-color-picker {
		background: white;
		width: fit-content;
		position: fixed;
		top: 30px;
		z-index: 9999;
	}

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
		font-size: 10px;
		font-weight: 700;
	}

	.card-color.active {
		border: 1px solid black;
	}
</style>
