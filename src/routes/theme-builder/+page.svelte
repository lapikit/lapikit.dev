<script lang="ts">
	import { ColorPicker } from '$lib/components';
	import {
		materialColors,
		tailwindColors,
		themeDark as defaultDarkTheme,
		themeLight as defaultLightTheme
	} from '$lib/assets';
	import type { ColorPalette, ColorPaletteName } from '$lib/@types';

	type ThemeToken = keyof typeof defaultLightTheme;
	type ThemeName = 'light' | 'dark';
	type ThemeValues = Record<ThemeToken, string>;
	type ExportState = {
		tone: 'idle' | 'success' | 'error';
		message: string;
	};

	const palettes = {
		tailwind: tailwindColors,
		material: materialColors
	} satisfies Record<string, ColorPalette>;

	const initialThemes = {
		light: { ...defaultLightTheme },
		dark: { ...defaultDarkTheme }
	} satisfies Record<ThemeName, ThemeValues>;
	const themeNames = Object.keys(initialThemes) as ThemeName[];

	let valueColorPicker = $state<{ key: ThemeToken; value: string } | undefined>(undefined);
	let themes = $state<Record<ThemeName, ThemeValues>>(initialThemes);
	let theme = $state<ThemeName>('light');
	let defaultTheme = $state<ThemeName>('light');
	let palette = $state<ColorPaletteName>('tailwind');
	let exportedCss = $state('');
	let exportState = $state<ExportState>({
		tone: 'idle',
		message: 'Choose your colors, then export your CSS.'
	});

	const activeTheme = $derived(themes[theme]);
	const themeEntries = $derived<[ThemeToken, string][]>(
		Object.entries(activeTheme) as [ThemeToken, string][]
	);
	const exportPreview = $derived(exportedCss || buildThemeCss());

	const handleColor = (key: string | undefined, color: string) => {
		if (!key) return;

		const token = key as ThemeToken;
		const nextTheme = {
			...themes[theme],
			[token]: color
		};

		themes = {
			...themes,
			[theme]: nextTheme
		};

		valueColorPicker = {
			key: token,
			value: color
		};
	};

	function selectTheme(nextTheme: ThemeName) {
		theme = nextTheme;
		valueColorPicker = undefined;
	}

	function openToken(key: ThemeToken, value: string) {
		valueColorPicker = { key, value };
	}

	function toCssBlock(selectors: string, themeValues: ThemeValues) {
		const lines = Object.entries(themeValues).map(([key, value]) => `\t--${key}: ${value};`);
		return `${selectors} {\n${lines.join('\n')}\n}`;
	}

	function buildThemeCss() {
		const selectorsByTheme: Record<ThemeName, string> = {
			light: defaultTheme === 'light' ? ':root,\n.light' : '.light',
			dark: defaultTheme === 'dark' ? ':root,\n.dark' : '.dark'
		};

		return themeNames
			.map((themeName) => toCssBlock(selectorsByTheme[themeName], themes[themeName]))
			.join('\n\n');
	}

	async function handleExport() {
		const css = buildThemeCss();
		exportedCss = css;

		try {
			if (typeof navigator === 'undefined' || !navigator.clipboard) {
				throw new Error('clipboard unavailable');
			}

			await navigator.clipboard.writeText(css);
			exportState = {
				tone: 'success',
				message: 'The CSS has been copied to the clipboard.'
			};
		} catch {
			exportState = {
				tone: 'error',
				message: 'Auto-copy failed. The CSS remains available just below.'
			};
		}
	}
</script>

<div style:background={activeTheme.base} style:color={activeTheme.content}>
	<div>
		<div>
			<span>editing</span>
			{#each themeNames as themeName (themeName)}
				<button type="button" onclick={() => selectTheme(themeName)}>
					{themeName}
				</button>
			{/each}
		</div>

		<div>
			<span>default</span>
			{#each themeNames as themeName (themeName)}
				<button type="button" onclick={() => (defaultTheme = themeName)}>
					{themeName}
				</button>
			{/each}
		</div>

		<button type="button" onclick={handleExport}>export css</button>
	</div>

	<div>
		<p>export</p>
		<p>{exportState.message}</p>
		<p>palette active: {palette} - theme edite: {theme} - default: {defaultTheme}</p>
	</div>

	<div class="token-grid">
		{#each themeEntries as [keyColor, valueColor] (keyColor)}
			<button
				type="button"
				class="token-card"
				style:background={valueColor}
				style:color={keyColor.startsWith('on-') ? activeTheme[keyColor] : activeTheme.content}
				onclick={() => openToken(keyColor, valueColor)}
			>
				<span>{keyColor}</span>
				<span>{valueColor}</span>
			</button>
		{/each}
	</div>

	<ColorPicker bind:color={valueColorPicker} bind:palette {palettes} handleClick={handleColor} />

	<div>
		<div>
			<div>
				<p>css preview</p>
			</div>
			<button type="button" onclick={handleExport}>copy</button>
		</div>
		<textarea readonly value={exportPreview}></textarea>
	</div>
</div>

<style>
	.token-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.75rem;
	}

	.token-card {
		padding: 0.9rem;
		border-radius: 0.85rem;
		border: 1px solid color-mix(in oklab, currentColor 12%, transparent);
		text-align: left;
		display: grid;
		gap: 0.3rem;
	}
</style>
