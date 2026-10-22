---
title: 'Class and Style binding'
category: 'Essentials'
head:
  title: 'Class and Style'
  description: 'With Lili, the Lapikit preprocessor, Lapikit components handle class (clsx), class: and style: exactly like native HTML elements in Svelte.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import classDirectiveCode from '$examples/essentials/class-directive.svelte?raw';
	import styleDirectiveCode from '$examples/essentials/style-directive.svelte?raw';
	import classAttributeCode from '$examples/essentials/class-attribute.svelte?raw';
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

With **Lili**, the Lapikit preprocessor, a `<kit:...>` component behaves exactly like a native HTML element in Svelte. No new syntax to learn, write your classes and styles as you already do:

- the `class` attribute accepts a string, an array or an object, with the rules of Svelte (clsx);
- the `class:` and `style:` directives work directly on `<kit:...>` tags.

> Svelte only allows `class:foo={...}` and `style:property={...}` on native HTML elements. On a `<kit:...>` tag, Lili lifts this limit: it turns them into props the components handle, at build time.

### Attribute `class`: Classes like on an element

As on any element in Svelte, `class` takes a string, an array (nested too) or an object whose keys are added when their value is truthy:

<LazyRepl lang="svelte" content={classAttributeCode} />

### Directive `class:`: Dynamic class binding

- **Boolean toggle** - adds the class name when the value is `true`. As in Svelte, `class:active` is the shorthand of `class:active={active}`.
- **Number or text** - appends the value to the name, joined by a dash: `class:gap={4}` gives `gap-4`. There is no dash when the name ends or the value starts with a separator (`-` `_` `:` `/` `.`), which is useful for BEM modifier patterns (`block--modifier`).
- `false`, `null`, `undefined` and `''` add nothing.

<LazyRepl lang="svelte" content={classDirectiveCode} />

### Directive `style:`: Dynamic inline styles

The part after `style:` is the CSS property name, CSS custom properties included.

<LazyRepl lang="svelte" content={styleDirectiveCode} />

> Modifiers such as `style:color|important` are not supported on Lapikit components.

### Property `s-class`: Dynamic class binding

`s-class` accepts the same forms as `class`, both are merged.

**String property `s-class`**

The simplest form - adds a static class name:

<LazyRepl lang="svelte" content={sClassCode} />

**Array property `s-class`**

Pass multiple class names at once:

<LazyRepl lang="svelte" content={sClassMultipleCode} />

**Object (conditional classes) property `s-class`**

Use an object to conditionally apply class names: a key is added when its value is truthy.

<LazyRepl lang="svelte" content={sClassObjectConditionalCode} />

### Property `s-style`: Dynamic inline styles

The `style` attribute only accepts a string. Pass a CSS property object to `s-style` to apply one or more inline styles:

<LazyRepl lang="svelte" content={sStyleCode} />

Dynamic values work as expected:

<LazyRepl lang="svelte" content={sStyleDynamicCode} />

> Values holding `;`, `{` or `}` are ignored, they could add other declarations.

### Without the Lapikit preprocessor

Without the preprocessor in `svelte.config.js`, Svelte refuses the `class:` and `style:` directives on components. Use the `s-class_*` and `s-style_*` props instead, they follow the same rules: the part after the underscore is the class name or the CSS property.

**Directive property with `s-class_*`**

- **Boolean toggle** - adds the class name when `true`:

<LazyRepl lang="svelte" content={sClassDirectiveBooleanCode} />

- **String modifier** - appends the value to the base name:

<LazyRepl lang="svelte" content={sClassDirectiveStringCode} />

**Directive property with `s-style_*`**

<LazyRepl lang="svelte" content={sStyleDirectiveCode} />

Particularly useful for CSS custom properties:

<LazyRepl lang="svelte" content={sStyleDirectiveCustomCode} />

### Combining directives, `s-class` and `s-style`

Directives, `s-class` and `s-style` can be combined within a single component to manage both dynamic classes and inline styles. The `style` attribute comes last, so it wins over the other styles.

This simplifies the management of:

- Component conditional states
- Responsive styles
- Theme-based customization
- Utility classes associated with dynamic CSS variables

All binding methods work together and follow the same reactive behavior as standard Svelte templates.

<LazyRepl lang="svelte" content={sClassSStyleCombiningCode} />

## Continue styling your Lapikit components

`class:`, `style:`, `s-class` and `s-style` are designed to make component styling closely resemble Svelte's native behavior, while maintaining clean and flexible templates.

Whether you're enabling or disabling utility classes, working with conditional states, or applying dynamic CSS variables, these utilities reduce repetitive styling logic and ensure consistent component styling across your entire project.

Since they act directly on Lapikit components, you can style interfaces without adding unnecessary wrappers or complex bindings.

These tools work particularly well with:

- Themes and CSS variables
- Responsive layouts
- Component states
- You can now consult the component documentation to see how they integrate with actual Lapikit components such as buttons, dialogs, cards, and form elements, for example.
