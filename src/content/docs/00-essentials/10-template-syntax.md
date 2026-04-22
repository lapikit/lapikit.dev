---
title: "Template Syntax"
---

## Template Syntax

Lapikit comes with a preprocessor that extends Svelte's template syntax with a set of shorthands designed to make working with Lapikit components feel as native as possible.

### The `<kit:*>` syntax

Instead of importing and using components manually, you can use the `<kit:name>` syntax directly in your templates. The preprocessor handles the import automatically at compile time.

```svelte
<!-- Without the preprocessor -->
<script>
	import { KitBtn } from 'lapikit/labs/components';
</script>

<KitBtn>Click me</KitBtn>
```

```svelte
<!-- With the preprocessor -->
<kit:btn>Click me</kit:btn>
```

Both are equivalent. The preprocessor transforms `<kit:btn>` into `<KitBtn>` and injects the import into your `<script>` block - or creates one if it doesn't exist.

**Available components** use the `kit:` prefix followed by the component short name:

```svelte
<kit:app>
	<kit:appbar>
		<kit:btn variant="text">Menu</kit:btn>
	</kit:appbar>

	<kit:card>
		<kit:chip>New</kit:chip>
		Hello world
	</kit:card>
</kit:app>
```

#### Using regular imports alongside `kit:` syntax

You can still import components manually when needed - for example, to alias them, use them conditionally, or work with components outside the `kit:` registry.

```svelte
<script>
	import { KitBtn } from 'lapikit/labs/components';
	import MyCustomButton from '$lib/components/my-button.svelte';
</script>

<kit:btn>Auto-imported button</kit:btn>
<KitBtn>Manually imported button</KitBtn>
<MyCustomButton>Custom component</MyCustomButton>
```

---

### Styling components

Lapikit provides two dedicated props - `s-class` and `s-style` - for binding classes and inline styles dynamically on any component. They are designed to mirror Svelte's `class:` and `style:` directives as closely as possible, within the limits of what Svelte's parser allows on components.

- **`s-class`** accepts a string, an array, or a conditional object to apply class names dynamically.
- **`s-style`** accepts a CSS property object to apply inline styles dynamically.
- Both also have a directive shorthand (`s-class_*`, `s-style_*`) for per-property control.

For the full reference with all forms and examples, see the [Class & Style binding](./20-class-and-style) page.
