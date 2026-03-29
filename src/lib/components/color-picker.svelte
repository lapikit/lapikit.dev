<script lang="ts">
	import type { ColorFormat, ColorPalette, ColorPaletteName, RgbColor } from '$lib/@types';
	import {
		cssColorToRgb,
		detectColorFormat,
		findColorNameByRgb,
		formatColor,
		getContrastLevel,
		getContrastRatioOnWhiteFromRgb,
		getTokenInitialsColor
	} from '$lib/utils';

	import { tailwindColors, materialColors } from '$lib/assets';

	const defaultPalettes = {
		tailwind: tailwindColors,
		material: materialColors
	} satisfies Record<string, ColorPalette>;
	const formats: ColorFormat[] = ['oklch', 'hex', 'rgb', 'hsl'];

	let {
		color = $bindable(),
		palette = $bindable(),
		handleClick,
		palettes = defaultPalettes,
		defaultPalette = 'tailwind'
	} = $props<{
		color?: { key: string; value: string };
		palette?: ColorPaletteName;
		handleClick: (key: string | undefined, color: string) => void;
		palettes?: Record<string, ColorPalette>;
		defaultPalette?: ColorPaletteName;
	}>();

	let colorFormat = $state<ColorFormat>('oklch');
	let colorSelected = $state('');
	let selectedRgb = $state<RgbColor | null>(null);
	const paletteNames = $derived(Object.keys(palettes));
	const resolvedPaletteName = $derived<ColorPaletteName>(
		palette && palette in palettes
			? palette
			: defaultPalette in palettes
				? defaultPalette
				: (paletteNames[0] ?? 'tailwind')
	);
	const currentPalette = $derived<ColorPalette>(palettes[resolvedPaletteName] ?? {});
	const colorFamilies = $derived<[string, Record<string, string>][]>(
		Object.entries(currentPalette)
	);
	const colorNameSelected = $derived(findColorNameByRgb(selectedRgb, currentPalette));
	const ratioColorSelected = $derived(
		selectedRgb ? getContrastRatioOnWhiteFromRgb(selectedRgb) : 0
	);
	const contrastLevel = $derived(getContrastLevel(ratioColorSelected));
	const selectedColorLabel = $derived(colorNameSelected ?? 'custom');

	$effect(() => {
		if (!color) return;

		colorFormat = detectColorFormat(color.value);
		colorSelected = color.value;
		selectedRgb = cssColorToRgb(color.value);
	});

	function closePicker() {
		color = undefined;
	}

	function selectPalette(nextPalette: ColorPaletteName) {
		palette = nextPalette;
	}

	function commitColorValue(value: string, options?: { nextFormat?: ColorFormat }) {
		const rgb = cssColorToRgb(value);
		if (!rgb) return;

		const nextFormat = options?.nextFormat ?? colorFormat;

		selectedRgb = rgb;
		colorFormat = nextFormat;
		colorSelected = formatColor(rgb, nextFormat);
		handleClick(color?.key, colorSelected);
	}

	function selectColor(value: string) {
		commitColorValue(value);
	}

	function updateColorFromInput(value: string) {
		colorSelected = value;

		const rgb = cssColorToRgb(value);
		if (!rgb) return;

		selectedRgb = rgb;
		handleClick(color?.key, value);
	}

	function updateFormat(nextFormat: string) {
		if (!colorSelected) return;
		commitColorValue(colorSelected, { nextFormat: nextFormat as ColorFormat });
	}
</script>

{#if color}
	<div id="modal-color-picker">
		<div>
			<div>
				<p>token</p>
				<h2>{color.key}</h2>
			</div>
			<button type="button" onclick={closePicker}>close</button>
		</div>

		<div>
			<span>palette</span>
			{#each paletteNames as paletteName (paletteName)}
				<button type="button" onclick={() => selectPalette(paletteName)}>
					{paletteName}
				</button>
			{/each}
		</div>

		<div class="color-picker">
			{#each colorFamilies as [familyName, shades] (familyName)}
				<div>
					<p>{familyName}</p>
					{#each Object.entries(shades) as [shade, value] (shade)}
						<button
							type="button"
							class="card-color"
							class:active={selectedColorLabel === `${familyName}-${shade}`}
							style:background={value}
							style:color={getTokenInitialsColor(value)}
							aria-label={`${familyName}-${shade} ${value}`}
							onclick={() => selectColor(value)}
						></button>
					{/each}
				</div>
			{/each}
		</div>

		<div>
			<div>
				<div style:background={colorSelected}></div>
				<div>
					<p>selection</p>
					<strong>{selectedColorLabel}</strong>
					<span>{colorSelected}</span>
				</div>
			</div>

			<div>
				<label>
					<span>format</span>
					<select
						value={colorFormat}
						onchange={(event) => updateFormat((event.currentTarget as HTMLSelectElement).value)}
					>
						{#each formats as format (format)}
							<option value={format}>{format}</option>
						{/each}
					</select>
				</label>

				<label>
					<span>value</span>
					<input
						type="text"
						value={colorSelected}
						oninput={(event) =>
							updateColorFromInput((event.currentTarget as HTMLInputElement).value)}
					/>
				</label>
			</div>

			<div>
				<span>contrast on white</span>
				<strong>{ratioColorSelected}</strong>
				<span>{contrastLevel}</span>
			</div>
		</div>
	</div>
{/if}

<style>
	#modal-color-picker {
		background: white;
		color: black;
		border-radius: 1rem;
		padding: 1.25rem;
		width: min(720px, calc(100vw - 2rem));
		max-height: calc(100vh - 4rem);
		overflow: auto;
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		box-shadow: 0 18px 60px rgb(0 0 0 / 0.18);
	}

	.color-picker {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
		gap: 0.85rem;
		margin-bottom: 1rem;
	}

	.card-color {
		width: 20px;
		height: 20px;
		padding: 0;
		border: 2px solid transparent;
		border-radius: 0.45rem;
	}

	.card-color.active {
		border-color: orangered;
		box-shadow: 0 0 0 1px rgb(0 0 0 / 0.1);
	}
</style>
