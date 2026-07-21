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
	import LazyRepl from '$components/lazy-repl.svelte';

  // examples
  import SStyleComponent from '$examples/started/s-style-component.svelte';
</script>

## Theme customization

Lapikit is built on custom CSS properties. Colors, surfaces, spacing, radii, typography, and component states are all based on `--kit-*` variables.

This makes the design system predictable, easy to evolve, and simple to customize without modifying component logic or adding extensions.

### Default theme configuration

Lapikit maintains a styling behavior similar to that of native CSS.

Each component and theme value can be overridden directly using CSS variables. Here is a list of all the variables you can override:

<LazyRepl lang="css" content={() => import('$examples/started/initial-style.css?raw')} />

**No additional compilation steps are required.**

You can apply your own values directly in your stylesheet and integrate Lapikit into an existing design system **without having to rewrite the components.**

<LazyRepl title="layout.css" lang="css" content={() => import('$examples/started/override-style.css?raw')} />

### Dark mode support

To support a dark theme, override the relevant variables inside a `[data-theme="dark"]` selector or `@media (prefers-color-scheme: dark)`.

Our recommendation is to base your approach on how you manage themes in your existing project. And if you don't have one yet, you can choose. Between a class-based approach or a media query-based approach. Both are valid and have their own advantages.

<LazyRepl title="layout.css" lang="css" content={() => import('$examples/started/dark-mode.css?raw')} />

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

<LazyRepl title="layout.css" lang="css" content={() => import('$examples/started/override-style-component.css?raw')} />

This will apply to every instance of `<kit:btn>` across your app.

This approach allows you to customize a specific component without affecting the rest of the design system. To redefine them globally, limit the scope of the variables to the component’s root class.

For per-instance customization, use the s-style prop directly on the component instance:

<LazyRepl title="btn" lang="css" content={() => import('$examples/started/s-style-component.svelte?raw')}>
<SStyleComponent/>
</LazyRepl>

> Note: Each component's documentation lists the variables it exposes.

### CSS variable reference

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
