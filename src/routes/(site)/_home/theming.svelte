<script lang="ts">
	import { resolve } from '$app/paths';
	import { createTheme } from 'lapikit/actions';

	import { Bell, Check, Moon, Palette, Sun, SwatchBook } from 'lucide-svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';

	const preview = createTheme();

	const modes = [
		{ name: 'light', label: 'Light', icon: Sun },
		{ name: 'dark', label: 'Dark', icon: Moon }
	];

	const accents = [
		{ name: 'Blue', value: 'hsl(220 90% 56%)' },
		{ name: 'Violet', value: 'hsl(262 80% 60%)' },
		{ name: 'Green', value: 'hsl(152 60% 38%)' },
		{ name: 'Orange', value: 'hsl(18 90% 54%)' }
	];

	const features = [
		'Light, dark and system themes out of the box',
		'Every color is a CSS variable you can override',
		'Scope a theme to any element with createTheme',
		'No Tailwind or CSS-in-JS dependency'
	];

	let accent = $state(accents[0]);
</script>

<SheetSection labelledby="theming-title">
	<SheetGrid columns={{ lg: 2 }}>
		<div class="theming-text">
			<SheetHeading id="theming-title" eyebrow="// 03 — Themes">
				Your brand, <span class="accent-text">in one config.</span>
				{#snippet description()}
					Lapikit themes are plain CSS variables. Switch the mode or the accent color on the right:
					only this preview changes, thanks to a scoped theme.
				{/snippet}
			</SheetHeading>

			<ul class="theming-features">
				{#each features as feature (feature)}
					<li>
						<kit:icon size="sm" color="accent"><Check /></kit:icon>
						{feature}
					</li>
				{/each}
			</ul>

			<kit:btn href={resolve('/docs/customize')} color="accent" size="lg" rounded="md">
				{#snippet prepend()}
					<kit:icon><SwatchBook /></kit:icon>
				{/snippet}
				Customize your theme
			</kit:btn>
		</div>

		<div class="theming-playground">
			<div class="theming-controls">
				<div class="theming-control" role="group" aria-label="Preview mode">
					{#each modes as { name, label, icon: Icon } (name)}
						{@const selected = preview.active === name}
						<kit:btn
							size="sm"
							rounded="full"
							variant={selected ? 'tonal' : 'text'}
							active={selected}
							aria-pressed={selected}
							onclick={() => preview.set(name)}
						>
							{#snippet prepend()}
								<kit:icon size="sm"><Icon /></kit:icon>
							{/snippet}
							{label}
						</kit:btn>
					{/each}
				</div>

				<div class="theming-control" role="group" aria-label="Preview accent color">
					{#each accents as item (item.name)}
						{@const selected = accent.name === item.name}
						<kit:btn
							icon
							size="sm"
							rounded="full"
							variant="text"
							active={selected}
							aria-pressed={selected}
							aria-label="{item.name} accent"
							tooltip={item.name}
							onclick={() => (accent = item)}
						>
							<span class="theming-swatch" style:background-color={item.value}></span>
						</kit:btn>
					{/each}
				</div>
			</div>

			<div
				class="theming-preview"
				use:preview.action={{ name: 'dark', overridden: true }}
				style:--kit-color-accent={accent.value}
			>
				<kit:card variant="outline">
					<kit:card-content>
						<div class="theming-preview-header">
							<kit:avatar label="LK" color="accent" />
							<div>
								<p class="theming-preview-title">Lapikit Studio</p>
								<p class="theming-preview-meta">Team workspace</p>
							</div>
							<kit:spacer />
							<kit:icon tooltip="Notifications"><Bell /></kit:icon>
						</div>
					</kit:card-content>

					<kit:separator />

					<kit:card-content>
						<div class="theming-preview-body">
							<kit:textfield label="Project name" value="Marketing site" />

							<div class="theming-preview-chips">
								<kit:chip size="sm" variant="tonal" color="accent">Svelte</kit:chip>
								<kit:chip size="sm" variant="outline">Design system</kit:chip>
								<kit:chip size="sm" variant="outline">v1.0</kit:chip>
							</div>

							<kit:alert tone="info" variant="tonal">
								{#snippet prepend()}
									<kit:icon><Palette /></kit:icon>
								{/snippet}
								Accent set to {accent.name.toLowerCase()}.
							</kit:alert>
						</div>
					</kit:card-content>

					<kit:card-actions>
						<kit:spacer />
						<kit:btn variant="text">Cancel</kit:btn>
						<kit:btn color="accent">Save changes</kit:btn>
					</kit:card-actions>
				</kit:card>
			</div>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	.theming-text {
		display: grid;
		align-content: center;
		justify-items: start;
		gap: 32px;
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.theming-features {
		display: grid;
		gap: 12px;

		li {
			display: flex;
			align-items: center;
			gap: 10px;
			color: var(--kit-color-text-muted);
		}
	}

	.theming-playground {
		display: grid;
		align-content: center;
		gap: 16px;
		min-width: 0;
		padding: var(--sheet-cell-padding);
	}

	.theming-controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
	}

	.theming-control {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px;
		border: var(--lapikit-border);
		border-radius: 999px;
	}

	.theming-swatch {
		display: block;
		width: 18px;
		height: 18px;
		border-radius: 50%;
	}

	.theming-preview {
		padding: clamp(16px, 3vw, 40px);
		background-color: var(--kit-color-surface-1);
		color: var(--kit-color-text);
		border-radius: 12px;
		transition: background-color 0.3s ease;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	.theming-preview-header {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.theming-preview-title {
		font-weight: 700;
	}

	.theming-preview-meta {
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.theming-preview-body {
		display: grid;
		gap: 16px;
	}

	.theming-preview-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
