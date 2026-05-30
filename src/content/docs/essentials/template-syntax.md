---
title: "Template Syntax"
description: "Learn how the Lapikit preprocessor extends Svelte template syntax component system, automatic imports, and dynamic styling helpers for cleaner Svelte and SvelteKit projects."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';
</script>

# Understanding the Lapikit template syntax

## Using the Lapikit component syntax

Lapikit includes a preprocessor that extends Svelte template syntax with shortcuts designed to make Lapikit components as close as possible to native elements.

The goal is simple:

- Reduce repetitive imports
- Keep templates cleaner
- And make using components feel more natural within Svelte projects

### Start with the `<kit:*>` component syntax

Instead of importing and using components manually, you can use the `<kit:name>` syntax directly in your templates. The preprocessor handles the import automatically at compile time.

<LazyRepl lang="svelte" title="without preprocessor lapikit" content={() => import('$examples/essentials/use-component-without-preprocessor.svelte?raw')} />

<LazyRepl lang="svelte" title="with preprocessor lapikit" content={() => import('$examples/essentials/use-component-with-preprocessor.svelte?raw')} />

Both are equivalent. The preprocessor transforms `<kit:btn>` into `<KitBtn>` and injects the import into your `<script>` block or creates one if it doesn’t exist.

**Available components** use the `kit:` prefix followed by the component short name:

<LazyRepl lang="svelte" title="+page.svelte" content={() => import('$examples/essentials/use-components.svelte?raw')} />

### Using regular imports alongside `kit:` syntax

You can always import components manually when you need greater control over how they are used in your project.

This can be useful for:

- Defining component aliases
- Performing conditional imports
- Using components dynamically
- Or working with components outside the kit: registry

<LazyRepl lang="svelte" title="+page.svelte" content={() => import('$examples/essentials/regular-import-components.svelte?raw')} />

Lapikit ensures compatibility between these two approaches so you can choose the workflow that best suits your Svelte project.

## Styling Lapikit components

Lapikit provides two dedicated props - `s-class` and `s-style` - for binding classes and inline styles dynamically on any component. They are designed to mirror Svelte's `class:` and `style:` directives as closely as possible, within the limits of what Svelte's parser allows on components.

- **`s-class`** accepts a string, an array, or a conditional object to apply class names dynamically.
- **`s-style`** accepts a CSS property object to apply inline styles dynamically.
- Both also have a directive shorthand (`s-class_*`, `s-style_*`) for per-property control.

Consult the [Class & Style binding](/docs/essentials/class-and-style) for a complete reference that includes all forms and examples

Now that the template syntax is configured, you can start exploring Lapikit components and build interfaces more quickly inside your Svelte or SvelteKit projects.
