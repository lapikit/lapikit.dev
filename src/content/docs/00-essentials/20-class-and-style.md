---
title: "Class & Style"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';
</script>

## Class & Style binding

Lapikit components expose two dedicated props - `s-class` and `s-style` - for dynamically binding class names and inline styles. They are designed to be as close as possible to Svelte's native `class:` and `style:` directives, within the limits of what Svelte's parser allows on components.

> Svelte reserves `class:foo={...}` and `style:property={...}` for native HTML elements. Lapikit uses `s-class` and `s-style` as the equivalent for its own components.

---

### `s-class` - Dynamic class binding

#### String

The simplest form - adds a static class name:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class.svelte?raw')} />

#### Array

Pass multiple class names at once:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class-multiple.svelte?raw')} />

#### Object (conditional classes)

Use an object to conditionally apply class names. When a key's value is `true`, the key is used as the class name. When it's a non-empty string, that string is used instead.

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class-object-conditional.svelte?raw')} />

#### `s-class_*` directive

For per-class control, use the `s-class_` directive. The part after the underscore is the base class name.

**Boolean toggle** - adds the class name when `true`:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class-directive-boolean.svelte?raw')} />

**String modifier** - appends the value to the base name:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class-directive-string.svelte?raw')} />

This is useful for BEM modifier patterns (`block--modifier`).

---

### `s-style` - Dynamic inline styles

#### Object

Pass a CSS property object to apply one or more inline styles:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-style.svelte?raw')} />

Dynamic values work as expected:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-style-dynamic.svelte?raw')} />

#### `s-style_*` directive

For individual properties, use the `s-style_` directive. The part after the underscore becomes the CSS property name.

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-style-directive.svelte?raw')} />

Particularly useful for CSS custom properties:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-style-directive-custom.svelte?raw')} />

---

### Combining `s-class` and `s-style`

All forms can be used together on the same component:

<LazyRepl lang="svelte" content={() => import('../../../content/examples/essentials/s-class-s-style-combining.svelte?raw')} />
