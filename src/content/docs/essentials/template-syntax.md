---
title: "Template Syntax"
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';
</script>

## Template Syntax

Lapikit comes with a preprocessor that extends Svelte's template syntax with a set of shorthands designed to make working with Lapikit components feel as native as possible.

### The `<kit:*>` syntax

Instead of importing and using components manually, you can use the `<kit:name>` syntax directly in your templates. The preprocessor handles the import automatically at compile time.

<LazyRepl lang="svelte" title="without preprocessor lapikit" content={() => import('../../../content/examples/essentials/use-component-without-preprocessor.svelte?raw')} />

<LazyRepl lang="svelte" title="with preprocessor lapikit" content={() => import('../../../content/examples/essentials/use-component-with-preprocessor.svelte?raw')} />

Both are equivalent. The preprocessor transforms `<kit:btn>` into `<KitBtn>` and injects the import into your `<script>` block - or creates one if it doesn't exist.

**Available components** use the `kit:` prefix followed by the component short name:

<LazyRepl lang="svelte" title="+page.svelte" content={() => import('../../../content/examples/essentials/use-components.svelte?raw')} />

#### Using regular imports alongside `kit:` syntax

You can still import components manually when needed - for example, to alias them, use them conditionally, or work with components outside the `kit:` registry.

<LazyRepl lang="svelte" title="+page.svelte" content={() => import('../../../content/examples/essentials/regular-import-components.svelte?raw')} />

---

### Styling components

Lapikit provides two dedicated props - `s-class` and `s-style` - for binding classes and inline styles dynamically on any component. They are designed to mirror Svelte's `class:` and `style:` directives as closely as possible, within the limits of what Svelte's parser allows on components.

- **`s-class`** accepts a string, an array, or a conditional object to apply class names dynamically.
- **`s-style`** accepts a CSS property object to apply inline styles dynamically.
- Both also have a directive shorthand (`s-class_*`, `s-style_*`) for per-property control.

For the full reference with all forms and examples, see the [Class & Style binding](/docs/essentials/class-and-style) page.
