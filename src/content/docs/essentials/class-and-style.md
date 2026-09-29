---
title: 'Class and Style binding'
category: 'Essentials'
head:
  title: 'Class and Style'
  description: 'Learn how to use s-class and s-style in Lapikit to dynamically manage classes and inline styles on Svelte components with a syntax close to native Svelte directives.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import sClassCode from '$examples/essentials/s-class.svelte?raw';
	import sClassMultipleCode from '$examples/essentials/s-class-multiple.svelte?raw';
	import sClassObjectConditionalCode from '$examples/essentials/s-class-object-conditional.svelte?raw';
	import sClassDirectiveBooleanCode from '$examples/essentials/s-class-directive-boolean.svelte?raw';
	import sClassDirectiveStringCode from '$examples/essentials/s-class-directive-string.svelte?raw';
	import sStyleCode from '$examples/essentials/s-style.svelte?raw';
	import sStyleDynamicCode from '$examples/essentials/s-style-dynamic.svelte?raw';
	import sStyleDirectiveCode from '$examples/essentials/s-style-directive.svelte?raw';
	import sStyleDirectiveCustomCode from '$examples/essentials/s-style-directive-custom.svelte?raw';
	import sClassSStyleCombiningCode from '$examples/essentials/s-class-s-style-combining.svelte?raw';
</script>

Lapikit components expose two dedicated props - `s-class` and `s-style` - for dynamically binding class names and inline styles. They are designed to be as close as possible to Svelte's native `class:` and `style:` directives, within the limits of what Svelte's parser allows on components.

> Svelte reserves `class:foo={...}` and `style:property={...}` for native HTML elements. Lapikit uses `s-class` and `s-style` as the equivalent for its own components.

### Property `s-class`: Dynamic class binding

**String property `s-class`**

The simplest form - adds a static class name:

<LazyRepl lang="svelte" content={sClassCode} />

**Array property `s-class`**

Pass multiple class names at once:

<LazyRepl lang="svelte" content={sClassMultipleCode} />

**Object (conditional classes) property `s-class`**

Use an object to conditionally apply class names. When a key's value is `true`, the key is used as the class name. When it's a non-empty string, that string is used instead.

<LazyRepl lang="svelte" content={sClassObjectConditionalCode} />

**Directive property with `s-class_*`**

For per-class control, use the `s-class_` directive. The part after the underscore is the base class name.

- **Boolean toggle** - adds the class name when `true`:

<LazyRepl lang="svelte" content={sClassDirectiveBooleanCode} />

- **String modifier** - appends the value to the base name:

<LazyRepl lang="svelte" content={sClassDirectiveStringCode} />

This is useful for BEM modifier patterns (`block--modifier`).

### Property `s-style`: Dynamic inline styles

**Object property `s-style`**

Pass a CSS property object to apply one or more inline styles:

<LazyRepl lang="svelte" content={sStyleCode} />

Dynamic values work as expected:

<LazyRepl lang="svelte" content={sStyleDynamicCode} />

**Directive property with `s-style_*`**

For individual properties, use the `s-style_` directive. The part after the underscore becomes the CSS property name.

<LazyRepl lang="svelte" content={sStyleDirectiveCode} />

Particularly useful for CSS custom properties:

<LazyRepl lang="svelte" content={sStyleDirectiveCustomCode} />

### Combining `s-class` and `s-style`

The `s-class` and `s-style` classes can be combined within a single component to manage both dynamic classes and inline styles.

This simplifies the management of:

- Component conditional states
- Responsive styles
- Theme-based customization
- Utility classes associated with dynamic CSS variables

All binding methods work together and follow the same reactive behavior as standard Svelte templates.

<LazyRepl lang="svelte" content={sClassSStyleCombiningCode} />

## Continue styling your Lapikit components

`s-class` and `s-style` are designed to make component styling more closely resemble Svelte’s native behavior, while maintaining clean and flexible templates.

Whether you’re enabling or disabling utility classes, working with conditional states, or applying dynamic CSS variables, these utilities reduce repetitive styling logic and ensure consistent component styling across your entire project.

Since they act directly on Lapikit components, you can style interfaces without adding unnecessary wrappers or complex bindings.

These tools work particularly well with:

- Themes and CSS variables
- Responsive layouts
- Component states
- You can now consult the component documentation to see how `s-class` and `s-style` integrate with actual Lapikit components such as buttons, dialogs, cards, and form elements, for example.
