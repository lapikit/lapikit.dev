<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import ColorPicker from './color-picker.svelte';

	type TokenGroup = Record<string, string>;
	type Palette = Record<string, TokenGroup>;
	type ThemeSection = Record<string, TokenGroup>;
	type SemanticTheme = {
		color: TokenGroup;
		radius: TokenGroup;
		spacing: TokenGroup;
	};

	let isClient = $state(false);

	/**
	 * Palette brute = matière première
	 * Tu peux la faire évoluer sans casser les composants.
	 */
	let paletteLight = $state<Palette>({
		gray: {
			'0': 'oklch(100% 0 0)',
			'50': 'oklch(98% 0 0)',
			'100': 'oklch(95% 0 0)',
			'200': 'oklch(90% 0 0)',
			'700': 'oklch(45% 0.01 285)',
			'900': 'oklch(21% 0.006 285.885)'
		},
		brand: {
			'500': 'oklch(45% 0.24 277.023)',
			'600': 'oklch(40% 0.24 277.023)',
			content: 'oklch(93% 0.034 272.788)'
		},
		secondary: {
			'500': 'oklch(65% 0.241 354.308)',
			content: 'oklch(94% 0.028 342.258)'
		},
		accent: {
			'500': 'oklch(77% 0.152 181.912)',
			content: 'oklch(38% 0.063 188.416)'
		},
		neutral: {
			'500': 'oklch(14% 0.005 285.823)',
			content: 'oklch(92% 0.004 286.32)'
		},
		info: {
			'500': 'oklch(74% 0.16 232.661)',
			content: 'oklch(29% 0.066 243.157)'
		},
		success: {
			'500': 'oklch(76% 0.177 163.223)',
			content: 'oklch(37% 0.077 168.94)'
		},
		warning: {
			'500': 'oklch(82% 0.189 84.429)',
			content: 'oklch(41% 0.112 45.904)'
		},
		error: {
			'500': 'oklch(71% 0.194 13.428)',
			content: 'oklch(27% 0.105 12.094)'
		}
	});

	/**
	 * Tokens sémantiques = vrai contrat stable de la lib
	 * Les composants doivent consommer ça.
	 */
	const themeLight = $derived.by<SemanticTheme>(() => ({
		color: {
			background: paletteLight.gray['0'],
			surface: paletteLight.gray['50'],
			surfaceMuted: paletteLight.gray['100'],
			border: paletteLight.gray['200'],

			text: paletteLight.gray['900'],
			textMuted: paletteLight.gray['700'],

			primary: paletteLight.brand['500'],
			primaryHover: paletteLight.brand['600'],
			primaryContent: paletteLight.brand.content,

			secondary: paletteLight.secondary['500'],
			secondaryContent: paletteLight.secondary.content,

			accent: paletteLight.accent['500'],
			accentContent: paletteLight.accent.content,

			neutral: paletteLight.neutral['500'],
			neutralContent: paletteLight.neutral.content,

			info: paletteLight.info['500'],
			infoContent: paletteLight.info.content,

			success: paletteLight.success['500'],
			successContent: paletteLight.success.content,

			warning: paletteLight.warning['500'],
			warningContent: paletteLight.warning.content,

			error: paletteLight.error['500'],
			errorContent: paletteLight.error.content
		},
		radius: {
			sm: '0.375rem',
			md: '0.5rem',
			lg: '0.75rem',
			xl: '1rem'
		},
		spacing: {
			xs: '0.25rem',
			sm: '0.5rem',
			md: '1rem',
			lg: '1.5rem',
			xl: '2rem'
		}
	}));

	const semanticSections = $derived(Object.entries(themeLight as ThemeSection));

	const paletteSections = $derived(Object.entries(paletteLight as ThemeSection));

	onMount(() => {
		isClient = true;
	});

	/**
	 * Helpers pour améliorer la preview
	 */
	function getTextColor(value: string) {
		const lightness = getOklchLightness(value);

		if (lightness === null) return '#111';

		return lightness < 0.6 ? 'white' : '#111';
	}

	function getOklchLightness(color: string): number | null {
		// match oklch(45% 0.24 277.023)
		const match = color.match(/oklch\(\s*([\d.]+)%/i);
		if (!match) return null;

		const percentage = Number(match[1]);
		if (Number.isNaN(percentage)) return null;

		return percentage / 100;
	}

	function getBorderColor(bg: string) {
		const lightness = getOklchLightness(bg);

		if (lightness === null) {
			return 'color-mix(in srgb, currentColor 12%, transparent)';
		}

		return lightness < 0.6
			? 'color-mix(in srgb, white 18%, transparent)'
			: 'color-mix(in srgb, black 12%, transparent)';
	}

	function isColorToken(value: string) {
		return (
			value.startsWith('oklch(') ||
			value.startsWith('#') ||
			value.startsWith('rgb(') ||
			value.startsWith('hsl(') ||
			['white', 'black', 'transparent', 'currentColor'].includes(value)
		);
	}

	function updatePaletteToken(sectionName: string, tokenName: string, value: string) {
		paletteLight = {
			...paletteLight,
			[sectionName]: {
				...paletteLight[sectionName],
				[tokenName]: value
			}
		};
	}

	function isHexColor(value: string) {
		return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
	}

	function normalizeHexColor(value: string) {
		const trimmed = value.trim();
		if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) return null;

		if (trimmed.length === 4) {
			const [, r, g, b] = trimmed;
			return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
		}

		return trimmed.toLowerCase();
	}

	function rgbStringToHex(value: string) {
		const normalized = value.replaceAll(',', ' ');
		const match = normalized.match(
			/rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)/i
		);

		if (!match) return null;

		const [, red, green, blue] = match;
		const toHex = (channel: string) =>
			Math.max(0, Math.min(255, Math.round(Number(channel))))
				.toString(16)
				.padStart(2, '0');

		return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
	}

	function convertCssColorToHex(value: string) {
		const normalized = normalizeHexColor(value);
		if (normalized) return normalized;
		if (!browser) return null;

		const candidate = value.trim();
		if (!candidate || candidate === 'transparent' || candidate === 'currentColor') return null;
		if (!CSS.supports('color', candidate)) return null;

		const probe = document.createElement('div');
		probe.style.color = candidate;
		document.body.appendChild(probe);

		const computed = getComputedStyle(probe).color;
		probe.remove();

		return rgbStringToHex(computed);
	}

	function canConvertToHex(value: string) {
		return isClient && isColorToken(value) && !normalizeHexColor(value);
	}

	function convertPaletteTokenToHex(sectionName: string, tokenName: string) {
		const currentValue = paletteLight[sectionName][tokenName];
		const hexValue = convertCssColorToHex(currentValue);

		if (!hexValue) return;

		updatePaletteToken(sectionName, tokenName, hexValue);
	}

	function convertAllPaletteToHex() {
		for (const [sectionName, tokens] of Object.entries(paletteLight)) {
			for (const tokenName of Object.keys(tokens)) {
				convertPaletteTokenToHex(sectionName, tokenName);
			}
		}
	}
</script>

<svelte:head>
	<title>LapiKit — Theme Builder</title>
</svelte:head>

<div class="theme-builder">
	<header class="hero">
		<div>
			<p class="eyebrow">LapiKit</p>
			<h1>Theme builder</h1>
			<p class="hero-text">
				Une base simple pour construire le thème avant de l’appliquer aux composants : palette
				brute, tokens sémantiques, radius et spacing.
			</p>
		</div>
	</header>

	<section class="panel">
		<div class="panel-header">
			<div>
				<p class="panel-kicker">Section principale</p>
				<h2>Tokens sémantiques</h2>
			</div>
			<p class="panel-description">
				Ce sont les tokens que tes composants devraient consommer directement.
			</p>
		</div>

		<div class="section-stack">
			{#each semanticSections as [sectionName, tokens] (sectionName)}
				<section class="section">
					<div class="section-head">
						<h3>{sectionName}</h3>
						<p>
							{sectionName === 'color'
								? 'Couleurs d’usage pour les composants'
								: sectionName === 'radius'
									? 'Rayons partagés'
									: 'Échelle d’espacement'}
						</p>
					</div>

					<div class="cards">
						{#each Object.entries(tokens) as [tokenName, tokenValue] (tokenName)}
							{#if sectionName === 'color'}
								<div
									class="card color-card"
									style:background={tokenValue}
									style:color={getTextColor(tokenValue)}
									style:border-color={getBorderColor(tokenValue)}
								>
									<div class="card-top">
										<p class="card-key">{tokenName}</p>
									</div>

									<div class="card-bottom">
										<p class="card-value">{tokenValue}</p>
									</div>
								</div>
							{:else if sectionName === 'radius'}
								<div class="card token-card">
									<div class="token-preview radius-preview">
										<div
											class="radius-shape"
											style:border-radius={tokenValue}
											style:background={themeLight.color.primary}
										></div>
									</div>

									<div class="card-bottom">
										<p class="card-key">{tokenName}</p>
										<p class="card-value">{tokenValue}</p>
									</div>
								</div>
							{:else}
								<div class="card token-card">
									<div class="token-preview spacing-preview">
										<div class="spacing-row">
											<div class="spacing-block"></div>
											<div class="spacing-gap" style:width={tokenValue}></div>
											<div class="spacing-block alt"></div>
										</div>
									</div>

									<div class="card-bottom">
										<p class="card-key">{tokenName}</p>
										<p class="card-value">{tokenValue}</p>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</section>

	<section class="panel">
		<div class="panel-header">
			<div>
				<p class="panel-kicker">Matière première</p>
				<h2>Palette brute</h2>
			</div>
			<p class="panel-description">
				La palette peut évoluer. Elle sert à fabriquer les tokens sémantiques.
			</p>
		</div>

		<div class="panel-actions">
			<button type="button" class="primary-action" onclick={convertAllPaletteToHex}>
				Convertir toute la palette en hex
			</button>
		</div>

		<div class="section-stack">
			{#each paletteSections as [sectionName, tokens] (sectionName)}
				<section class="section">
					<div class="section-head">
						<h3>{sectionName}</h3>
						<p>Couleurs sources</p>
					</div>

					<div class="cards">
						{#each Object.entries(tokens) as [tokenName, tokenValue] (tokenName)}
							<div
								class="card color-card"
								style:background={isColorToken(tokenValue)
									? tokenValue
									: themeLight.color.surface}
								style:color={isColorToken(tokenValue)
									? getTextColor(tokenValue)
									: themeLight.color.text}
								style:border-color={isColorToken(tokenValue)
									? getBorderColor(tokenValue)
									: themeLight.color.border}
							>
								<div class="card-top">
									<p class="card-key">{tokenName}</p>
								</div>

								<div class="card-bottom">
									<p class="card-value">{tokenValue}</p>
									{#if isHexColor(tokenValue)}
										<label class="token-input-field">
											<span class="token-input-label">Color picker</span>
											<input
												class="token-color-input"
												type="color"
												value={normalizeHexColor(tokenValue) ?? '#000000'}
												oninput={(event) =>
													updatePaletteToken(
														sectionName,
														tokenName,
														(event.currentTarget as HTMLInputElement).value
													)}
											/>
										</label>
									{/if}
									{#if canConvertToHex(tokenValue)}
										<button
											type="button"
											class="token-convert-button"
											onclick={() => convertPaletteTokenToHex(sectionName, tokenName)}
										>
											Convertir en hex
										</button>
									{/if}
									<label class="token-input-field">
										<span class="token-input-label">Valeur</span>
										<input
											class="token-input"
											type="text"
											value={tokenValue}
											oninput={(event) =>
												updatePaletteToken(
													sectionName,
													tokenName,
													(event.currentTarget as HTMLInputElement).value
												)}
										/>
									</label>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</section>

	<section class="panel">
		<div class="panel-header">
			<div>
				<p class="panel-kicker">Bibliothèque de couleurs</p>
				<h2>Grille Tailwind</h2>
			</div>
			<p class="panel-description">
				Une vue d’ensemble de toutes les familles et nuances disponibles pour composer la palette.
			</p>
		</div>

		<ColorPicker />
	</section>

	<section class="panel">
		<div class="panel-header">
			<div>
				<p class="panel-kicker">Rappel d’architecture</p>
				<h2>Règle d’usage</h2>
			</div>
		</div>

		<div class="rules">
			<div class="rule">
				<p class="rule-title">1. Palette</p>
				<p class="rule-text">Réservoir de couleurs, libre à faire évoluer.</p>
			</div>

			<div class="rule">
				<p class="rule-title">2. Tokens sémantiques</p>
				<p class="rule-text">Contrat stable de la lib : background, text, primary, success, etc.</p>
			</div>

			<div class="rule">
				<p class="rule-title">3. Composants</p>
				<p class="rule-text">Les composants lisent les tokens sémantiques, pas la palette brute.</p>
			</div>
		</div>
	</section>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		background: #f8f8fb;
		color: #171717;
	}

	.theme-builder {
		display: grid;
		gap: 1.5rem;
		padding: 1.5rem;
		max-width: 1440px;
		margin: 0 auto;
	}

	.hero,
	.panel {
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
	}

	.hero {
		padding: 1.5rem;
	}

	.eyebrow,
	.panel-kicker {
		margin: 0 0 0.35rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #6b7280;
	}

	h1,
	h2,
	h3 {
		margin: 0;
	}

	h1 {
		font-size: clamp(1.8rem, 2vw, 2.5rem);
		line-height: 1.1;
	}

	h2 {
		font-size: 1.25rem;
		line-height: 1.2;
	}

	h3 {
		font-size: 1rem;
		text-transform: capitalize;
	}

	.hero-text,
	.panel-description,
	.section-head p,
	.rule-text {
		margin: 0;
		color: #52525b;
		line-height: 1.5;
	}

	.panel {
		padding: 1.25rem;
		display: grid;
		gap: 1.25rem;
	}

	.panel-header {
		display: grid;
		gap: 0.5rem;
	}

	.panel-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.section-stack {
		display: grid;
		gap: 1.5rem;
	}

	.section {
		display: grid;
		gap: 0.75rem;
	}

	.section-head {
		display: grid;
		gap: 0.2rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	.card {
		min-height: 148px;
		border: 1px solid transparent;
		border-radius: 0.9rem;
		padding: 1rem;
		display: grid;
		align-content: space-between;
		gap: 0.75rem;
		overflow: hidden;
	}

	.color-card {
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.token-card {
		background: #fcfcfd;
		border-color: rgba(0, 0, 0, 0.08);
		color: #171717;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
	}

	.card-top,
	.card-bottom {
		display: grid;
		gap: 0.25rem;
	}

	.card-key,
	.card-value {
		margin: 0;
	}

	.card-key {
		font-weight: 700;
		word-break: break-word;
	}

	.card-value {
		font-size: 0.9rem;
		opacity: 0.9;
		word-break: break-word;
	}

	.token-input-field {
		display: grid;
		gap: 0.35rem;
		margin-top: 0.5rem;
	}

	.token-input-label {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.75;
	}

	.token-input {
		width: 100%;
		border: 1px solid currentColor;
		border-radius: 0.65rem;
		padding: 0.65rem 0.75rem;
		font: inherit;
		color: inherit;
		background: color-mix(in srgb, currentColor 8%, transparent);
	}

	.token-input::placeholder {
		color: inherit;
		opacity: 0.6;
	}

	.token-input:focus {
		outline: 2px solid color-mix(in srgb, currentColor 22%, transparent);
		outline-offset: 2px;
	}

	.token-color-input {
		inline-size: 100%;
		block-size: 2.75rem;
		padding: 0.2rem;
		border: 1px solid currentColor;
		border-radius: 0.65rem;
		background: color-mix(in srgb, currentColor 8%, transparent);
		cursor: pointer;
	}

	.token-convert-button {
		border: 1px solid currentColor;
		border-radius: 999px;
		padding: 0.55rem 0.8rem;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 700;
		color: inherit;
		background: color-mix(in srgb, currentColor 10%, transparent);
		cursor: pointer;
	}

	.token-convert-button:hover {
		background: color-mix(in srgb, currentColor 16%, transparent);
	}

	.primary-action {
		border: 1px solid #171717;
		border-radius: 999px;
		padding: 0.8rem 1rem;
		font: inherit;
		font-weight: 700;
		color: white;
		background: #171717;
		cursor: pointer;
	}

	.primary-action:hover {
		background: #2a2a2a;
	}

	.token-preview {
		min-height: 64px;
		display: grid;
		align-items: center;
	}

	.radius-preview {
		justify-items: start;
	}

	.radius-shape {
		width: 72px;
		height: 56px;
	}

	.spacing-row {
		display: flex;
		align-items: center;
	}

	.spacing-block {
		width: 28px;
		height: 28px;
		border-radius: 0.5rem;
		background: #18181b;
		flex: 0 0 auto;
	}

	.spacing-block.alt {
		background: #6366f1;
	}

	.spacing-gap {
		height: 8px;
		background: repeating-linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.08) 0,
			rgba(0, 0, 0, 0.08) 6px,
			transparent 6px,
			transparent 12px
		);
		border-radius: 999px;
		flex: 0 0 auto;
	}

	.rules {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.rule {
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 0.9rem;
		padding: 1rem;
		background: #fcfcfd;
	}

	.rule-title {
		margin: 0 0 0.35rem;
		font-weight: 700;
	}

	@media (max-width: 640px) {
		.theme-builder {
			padding: 1rem;
		}

		.hero,
		.panel {
			padding: 1rem;
		}

		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
