---
title: 'Customize themes and styles in Lapikit'
category: 'Essentials'
head:
  title: 'Customize'
  description: 'Customize your Svelte Lapikit components via configuration file: themes, styles, breakpoints. Fluid styling guaranteed.'
layout: 'doc_page'
keywords:
  - 'customize'
  - 'theming'
  - 'css variables'
  - 'design tokens'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

  // examples
  import SStyleComponent from '$examples/started/s-style-component.svelte';
  import StyleRootVariables from '$examples/styles/root.css?raw';
  import StyleThemeDefault from '$examples/styles/theme-default.css?raw';
  import StyleThemeLight from '$examples/styles/theme-light.css?raw';
  import StyleThemeDark from '$examples/styles/theme-dark.css?raw';
  import StyleThemeSystem from '$examples/styles/theme-system.css?raw';

	import overrideStyleCode from '$examples/started/override-style.css?raw';
	import overrideStyleComponentCode from '$examples/started/override-style-component.css?raw';
	import sStyleComponentCode from '$examples/started/s-style-component.svelte?raw';

	// preview
	import ElevationPreview from '$examples/started/elevation-preview.svelte';
	import ShapePreview from '$examples/started/shape-preview.svelte';
</script>

## Theme customization

Lapikit is built on custom CSS properties. Colors, surfaces, spacing, radii, typography, and component states are all based on `--kit-*` variables.

This makes the design system predictable, easy to evolve, and simple to customize without modifying component logic or adding extensions.

### Default theme configuration

Lapikit maintains a styling behavior similar to that of native CSS.

Each component and theme value can be overridden directly using CSS variables. Here is a list of all the variables you can override:

<LazyRepl
content={{
	'root': {
		code: StyleRootVariables,
		lang: 'css'
	},
	'theme': {
		code: StyleThemeDefault,
		lang: 'css'
	}
}}
/>

**No additional compilation steps are required.**

You can apply your own values directly in your stylesheet and integrate Lapikit into an existing design system **without having to rewrite the components.**

<LazyRepl title="style.css" lang="css" content={overrideStyleCode} />

<!-- ### Dark mode support

To support a dark theme, override the relevant variables inside a `[data-kit-theme="dark"]` selector or `@media (prefers-color-scheme: dark)`.

Our recommendation is to base your approach on how you manage themes in your existing project. And if you don't have one yet, you can choose. Between a class-based approach or a media query-based approach. Both are valid and have their own advantages. -->

### Theme mode support

Lapikit resolves its color tokens through the data-kit-theme attribute. Set it to `light` or `dark` on the element you want to theme usually `<html>`, but any container works. Because it's a plain attribute, you keep full control: toggle it from your own logic, persist the choice, or scope a dark section inside an otherwise light page with function [`useTheme()`](/docs/hooks/use-theme).

<LazyRepl
content={{
  'dark': {
		code: StyleThemeDark,
		lang: 'css'
	},
	'light': {
		code: StyleThemeLight,
		lang: 'css'
	}
}}
/>

### Media color scheme support

If you'd rather follow the operating system preference, override the tokens inside a `prefers-color-scheme` media query instead. No state to manage, no toggle to build:

<LazyRepl lang="css" content={StyleThemeSystem} />

The trade-off is that users can't switch themes from within your app the choice belongs to the system.

Our recommendation is to follow whatever your project already does. If you're starting fresh, both approaches are valid: pick the attribute-based one if you plan to offer a theme switcher, and the media query if you just want to respect the user's system setting.

## CSS utilities

On top of colors, Lapikit ships two shared visual scales: elevation for depth and shape for corner radius. Every component uses them, so changing a token once updates your whole interface.

### Elevation

Elevation tells users which surfaces sit above others: a card above the page, a menu above the card, a dialog above everything. Lapikit gives you six shadow levels, from `0` (flat) to `5` (floating).

<ElevationPreview/>

Set the level with the `elevation` prop on any component that supports it, such as cards, buttons, chips, alerts, app bars, dropdowns and dialogs:

```svelte
<kit:card elevation="2">Product details</kit:card>
```

The elevation can change with the interaction state. Pass an object with `base`, `hover` and `active` keys to lift a surface on hover and press it down on click:

```svelte
<kit:card elevation={{ base: '1', hover: '3', active: '0' }}>Hover me</kit:card>
```

Under the hood, the prop sets `data-elevation`, `data-elevation-hover` and `data-elevation-active` attributes. The matching styles are global and loaded by [`<kit:app>`](/docs/essentials/initialize-application), so you can also put these attributes on your own HTML elements:

```svelte
<aside data-elevation="1">Custom panel</aside>
```

Each level combines two `box-shadow` layers: a short, sharp shadow and a wider, softer ambient one. Both are built from the same three tokens, so you can restyle every shadow in your app from one place:

| Variable                       | Default | Role                                      |
| ------------------------------ | ------- | ----------------------------------------- |
| `--kit-color-shadow`           | theme   | Base color of every shadow                |
| `--kit-shadow-opacity`         | `30%`   | Strength of the short, sharp shadow layer |
| `--kit-shadow-ambient-opacity` | `15%`   | Strength of the wide, soft ambient layer  |

For example, raise both opacities in a dark theme, where shadows are harder to see on dark surfaces.

### Shape

Shape controls the corner radius of components. The scale goes from square corners to fully rounded pills, and each step is a `--shape-*` CSS variable.

<ShapePreview/>

Pick a step with the `rounded` prop:

```svelte
<kit:btn rounded="sm">Save</kit:btn>
<kit:card rounded="xl">Large rounded card</kit:card>
```

Use the same tokens in your own styles so your custom elements match the components:

```css
.promo-banner {
	border-radius: var(--kit-shape-lg);
}
```

To change the overall look of your app, override the scale in `:root`. Lower values give a sharp, technical interface and higher values a softer, friendlier one, without touching any component. The full list of values is in the [shape reference](#shape-2) below.

## Component styling

Each Lapikit component exposes its own scope variables.

Buttons, dialog boxes, cards, input fields, and other components can be customized independently, without modifying the rest of the design system.

In many libraries, global customization of a single component often requires:

- Redefining internal selectors
- Increasing CSS specificity
- Or duplicating component styles

This complicates maintenance over time.

### Per-component CSS variables

Each Lapikit component uses variables prefixed with the component name (e.g. `--kit-btn-*` for buttons).

Example:

<LazyRepl title="layout.css" lang="css" content={overrideStyleComponentCode} />

This will apply to every instance of `<kit:btn>` across your app.

This approach allows you to customize a specific component without affecting the rest of the design system. To redefine them globally, limit the scope of the variables to the component’s root class.

For per-instance customization, use the s-style prop directly on the component instance:

<LazyRepl title="btn" lang="css" content={sStyleComponentCode}>
<SStyleComponent/>
</LazyRepl>

> [!NOTE]
> Each component's documentation lists the variables it exposes.

### CSS variable reference

#### Colors (surfaces)

| Variable                | Role                                                 |
| ----------------------- | ---------------------------------------------------- |
| `--kit-color-surface`   | Base page background                                 |
| `--kit-color-surface-1` | First elevation level (cards, panels)                |
| `--kit-color-surface-2` | Second elevation level (nested panels, hovered rows) |
| `--kit-color-surface-3` | Highest elevation level (menus, popovers, modals)    |

#### Colors (text)

| Variable                    | Role                                    |
| --------------------------- | --------------------------------------- |
| `--kit-color-text`          | Primary text color                      |
| `--kit-color-text-muted`    | Secondary text (labels, captions)       |
| `--kit-color-text-subtle`   | Low-emphasis text (placeholders, hints) |
| `--kit-color-text-disabled` | Text on disabled elements               |

#### Colors (fills & lines)

| Variable                  | Role                                                   |
| ------------------------- | ------------------------------------------------------ |
| `--kit-color-fill`        | Neutral interactive background (ghost buttons, inputs) |
| `--kit-color-fill-hover`  | Same fill, hover state                                 |
| `--kit-color-fill-active` | Same fill, pressed state                               |
| `--kit-color-border`      | Default border color                                   |
| `--kit-color-shadow`      | Base color used to compose elevation shadows           |
| `--kit-color-transparent` | Explicit transparent value, for token-driven overrides |

#### Colors (semantic)

Each role ships with an `on-` counterpart: the foreground color guaranteed to be readable on top of it.

| Variable                                         | Role                           |
| ------------------------------------------------ | ------------------------------ |
| `--kit-color-accent` / `--kit-color-on-accent`   | Brand color and its foreground |
| `--kit-color-success` / `--kit-color-on-success` | Positive feedback              |
| `--kit-color-warning` / `--kit-color-on-warning` | Cautionary feedback            |
| `--kit-color-error` / `--kit-color-on-error`     | Destructive actions and errors |
| `--kit-color-info` / `--kit-color-on-info`       | Neutral informational feedback |
| `--kit-color-focus`                              | Focus ring color               |

#### Shape

| Variable       | Value      | Role                        |
| -------------- | ---------- | --------------------------- |
| `--shape-none` | `0`        | Square corners              |
| `--shape-xs`   | `0.25rem`  | Chips, badges, small inputs |
| `--shape-sm`   | `0.375rem` | Buttons, inputs             |
| `--shape-md`   | `0.625rem` | Cards, panels               |
| `--shape-lg`   | `0.875rem` | Sheets, large containers    |
| `--shape-xl`   | `1.125rem` | Modals, dialogs             |
| `--shape-full` | `9999px`   | Pills and circular elements |

#### Typography

| Variable        | Value        | Role                       |
| --------------- | ------------ | -------------------------- |
| `--kit-font`    | system stack | Base font stack            |
| `--kit-font-xs` | `13px`       | Captions, helper text      |
| `--kit-font-sm` | `14px`       | Dense UI, secondary labels |
| `--kit-font-md` | `15px`       | Default body size          |
| `--kit-font-lg` | `16px`       | Emphasized body text       |
| `--kit-font-xl` | `17px`       | Headings, titles           |

#### Spacing & density

`space` sets the base spacing unit; `density` is an additive offset applied on top of a component's computed size.

| Variable                    | Value  | Role                            |
| --------------------------- | ------ | ------------------------------- |
| `--kit-space-compact`       | `2px`  | Base unit, compact scale        |
| `--kit-space-default`       | `4px`  | Base unit, default scale        |
| `--kit-space-comfortable`   | `6px`  | Base unit, comfortable scale    |
| `--kit-density-compact`     | `-4px` | Shrinks component size          |
| `--kit-density-default`     | `0px`  | Leaves component size untouched |
| `--kit-density-comfortable` | `4px`  | Expands component size          |

#### Elevation & states

| Variable                       | Value  | Role                                 |
| ------------------------------ | ------ | ------------------------------------ |
| `--kit-shadow-opacity`         | `30%`  | Opacity of the direct shadow layer   |
| `--kit-shadow-ambient-opacity` | `15%`  | Opacity of the ambient shadow layer  |
| `--kit-disabled-opacity`       | `0.55` | Opacity applied to disabled elements |

Many component libraries lock styles behind complex configuration systems, preprocessors, or hard-coded themes.

This often results in:

- Inconsistent overrides
- Duplicate styles
- Difficult theme maintenance
- Global CSS conflicts
- Unnecessary complexity in the build

Customizing a design system can quickly prove to be more difficult than creating one from scratch.

- Lapikit maintains a style that closely resembles native CSS behavior.
- Each component and theme setting can be modified directly using CSS variables.

Themes rely entirely on CSS variables:

- Transitions between themes remain lightweight
- Components automatically inherit updates
- Most visual changes do not require components to be re-rendered

This simplifies theme management, even in large Svelte and SvelteKit projects.
