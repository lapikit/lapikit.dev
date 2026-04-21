---
title: 'Customize'
keywords:
  - 'customize'
  - 'theming'
  - 'css variables'
  - 'design tokens'
---

## Customize

Lapikit is built entirely on CSS custom properties. Every visual aspect of every component - colors, surfaces, spacing, radius, typography - is driven by `--kit-*` variables. Overriding them is all you need to make Lapikit match your design system.

---

### Default theme

Lapikit ships with a light theme applied at `:root`. These are all the variables you can override:

```css
:root {
	color-scheme: light;

	/* Semantic hue values - used to derive status colors */
	--kit-h-neutral: 220;
	--kit-h-success: 145;
	--kit-h-warning: 35;
	--kit-h-danger: 5;
	--kit-h-info: 205;

	/* Base colors */
	--kit-bg: hsl(0 0% 100%);
	--kit-fg: hsl(222 20% 10%);
	--kit-muted: hsl(220 10% 45%);

	/* Surface layers */
	--kit-surface-1: hsl(0 0% 100%);
	--kit-surface-2: hsl(220 20% 98%);
	--kit-surface-3: hsl(220 18% 94%);

	/* Border */
	--kit-border: hsl(220 16% 88%);

	/* Accent */
	--kit-accent: hsl(220 90% 56%);

	/* Shape */
	--kit-radius-1: 8px;
	--kit-radius-2: 12px;

	/* Spacing */
	--kit-space-1: 6px;
	--kit-space-2: 10px;
	--kit-space-3: 14px;

	/* Focus ring */
	--kit-focus: hsl(35, 90%, 56%);

	/* Disabled state */
	--kit-disabled-opacity: 0.55;

	/* Typography */
	--kit-font:
		ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
		'Noto Color Emoji';
}
```

To apply your own values, override any of these in your global stylesheet - no build step needed.

```css
/* app.css */
:root {
	--kit-accent: hsl(262 80% 50%);
	--kit-radius-1: 4px;
	--kit-radius-2: 8px;
	--kit-font: 'Inter', sans-serif;
}
```

---

### Dark mode

To support a dark theme, override the relevant variables inside a `[data-theme="dark"]` selector or `@media (prefers-color-scheme: dark)`, depending on how you manage themes in your project.

```css
[data-theme='dark'] {
	color-scheme: dark;

	--kit-bg: hsl(222 20% 10%);
	--kit-fg: hsl(0 0% 98%);
	--kit-muted: hsl(220 10% 60%);

	--kit-surface-1: hsl(222 20% 10%);
	--kit-surface-2: hsl(222 18% 14%);
	--kit-surface-3: hsl(222 16% 18%);

	--kit-border: hsl(220 14% 24%);
}
```

---

### Per-component variables

Each Lapikit component also exposes its own set of variables, prefixed with the component name (e.g. `--kit-btn-*` for buttons). These let you customize a specific component globally without affecting the rest of the design system.

To override them globally, scope the variables to the component's root class:

```css
.kit-btn {
	--kit-btn-bg: hsl(262 80% 50%);
	--kit-btn-color: #ffffff;
	--kit-btn-radius: 999px;
}
```

This will apply to every instance of `<kit:btn>` across your app.

For per-instance customization, use the `s-style` prop instead:

```svelte
<kit:btn s-style={{ '--kit-btn-bg': 'red' }}>Danger</kit:btn>
```

Each component's documentation lists the variables it exposes.

---

### Variable reference

| Variable                                      | Role                                 |
| --------------------------------------------- | ------------------------------------ |
| `--kit-bg`                                    | Page background                      |
| `--kit-fg`                                    | Primary text color                   |
| `--kit-muted`                                 | Secondary / subdued text             |
| `--kit-surface-1/2/3`                         | Layered surface backgrounds          |
| `--kit-border`                                | Default border color                 |
| `--kit-accent`                                | Primary accent / brand color         |
| `--kit-radius-1`                              | Tight border radius (inputs, chips…) |
| `--kit-radius-2`                              | Loose border radius (cards, modals…) |
| `--kit-space-1/2/3`                           | Internal spacing scale               |
| `--kit-focus`                                 | Focus ring color                     |
| `--kit-disabled-opacity`                      | Opacity applied to disabled elements |
| `--kit-font`                                  | Base font stack                      |
| `--kit-h-neutral/success/warning/danger/info` | Hue values for semantic colors       |
