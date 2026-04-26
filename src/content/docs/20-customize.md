---
title: "Customize"
keywords:
  - "customize"
  - "theming"
  - "css variables"
  - "design tokens"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

  // examples
  import SStyleComponent from '../../content/examples/started/s-style-component.svelte';
</script>

## Customize

Lapikit is built entirely on CSS custom properties. Every visual aspect of every component - colors, surfaces, spacing, radius, typography - is driven by `--kit-*` variables. Overriding them is all you need to make Lapikit match your design system.

---

### Default theme

Lapikit ships with a light theme applied at `:root`. These are all the variables you can override:

<LazyRepl lang="css" content={() => import('../../content/examples/started/initial-style.css?raw')} />

To apply your own values, override any of these in your global stylesheet - no build step needed.

<LazyRepl title="layout.css" lang="css" content={() => import('../../content/examples/started/override-style.css?raw')} />

---

### Dark mode

To support a dark theme, override the relevant variables inside a `[data-theme="dark"]` selector or `@media (prefers-color-scheme: dark)`, depending on how you manage themes in your project.

<LazyRepl title="layout.css" lang="css" content={() => import('../../content/examples/started/dark-mode.css?raw')} />

---

### Per-component variables

Each Lapikit component also exposes its own set of variables, prefixed with the component name (e.g. `--kit-btn-*` for buttons). These let you customize a specific component globally without affecting the rest of the design system.

To override them globally, scope the variables to the component's root class:

<LazyRepl title="layout.css" lang="css" content={() => import('../../content/examples/started/override-style-component.css?raw')} />

This will apply to every instance of `<kit:btn>` across your app.

For per-instance customization, use the `s-style` prop instead:

<LazyRepl title="btn" lang="css" content={() => import('../../content/examples/started/s-style-component.svelte?raw')}>
<SStyleComponent/>
</LazyRepl>

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
