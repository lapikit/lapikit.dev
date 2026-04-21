---
title: 'Class & Style'
---

## Class & Style binding

Lapikit components expose two dedicated props - `s-class` and `s-style` - for dynamically binding class names and inline styles. They are designed to be as close as possible to Svelte's native `class:` and `style:` directives, within the limits of what Svelte's parser allows on components.

> Svelte reserves `class:foo={...}` and `style:property={...}` for native HTML elements. Lapikit uses `s-class` and `s-style` as the equivalent for its own components.

---

### `s-class` - Dynamic class binding

#### String

The simplest form - adds a static class name:

```svelte
<kit:btn s-class="my-button">Click</kit:btn>
```

#### Array

Pass multiple class names at once:

```svelte
<kit:btn s-class={['my-button', 'is-large']}>Click</kit:btn>
```

#### Object (conditional classes)

Use an object to conditionally apply class names. When a key's value is `true`, the key is used as the class name. When it's a non-empty string, that string is used instead.

```svelte
<script>
	let isActive = $state(true);
	let isDisabled = $state(false);
</script>

<kit:btn s-class={{ active: isActive, disabled: isDisabled }}> Click </kit:btn>
```

```svelte
<!-- s-class={{ active: true, theme: 'dark' }} -->
<!-- Result: class="active dark" -->
<kit:btn s-class={{ active: true, theme: 'dark' }}>Click</kit:btn>
```

#### `s-class_*` directive

For per-class control, use the `s-class_` directive. The part after the underscore is the base class name.

**Boolean toggle** - adds the class name when `true`:

```svelte
<!-- Adds class "rounded" when isRounded is true -->
<kit:btn s-class_rounded={isRounded}>Click</kit:btn>
```

**String modifier** - appends the value to the base name:

```svelte
<!-- Adds class "theme--dark" -->
<kit:btn s-class_theme="--dark">Click</kit:btn>

<!-- Dynamic: "theme--dark" or "theme--light" -->
<kit:btn s-class_theme={isDark ? '--dark' : '--light'}>Click</kit:btn>
```

This is useful for BEM modifier patterns (`block--modifier`).

---

### `s-style` - Dynamic inline styles

#### Object

Pass a CSS property object to apply one or more inline styles:

```svelte
<kit:btn s-style={{ color: 'red', 'font-size': '14px' }}> Styled button </kit:btn>
```

Dynamic values work as expected:

```svelte
<script>
	let primaryColor = $state('#6200ea');
</script>

<kit:btn s-style={{ '--kit-accent': primaryColor }}> Themed button </kit:btn>
```

#### `s-style_*` directive

For individual properties, use the `s-style_` directive. The part after the underscore becomes the CSS property name.

```svelte
<!-- Sets: color: red -->
<kit:btn s-style_color="red">Click</kit:btn>

<!-- Sets: background-color: #f0f -->
<kit:btn s-style_background-color="#f0f">Click</kit:btn>

<!-- Dynamic value -->
<kit:btn s-style_color={isError ? 'red' : 'inherit'}>Click</kit:btn>
```

Particularly useful for CSS custom properties:

```svelte
<kit:btn s-style_--kit-accent={brandColor}>Click</kit:btn>
```

---

### Combining `s-class` and `s-style`

All forms can be used together on the same component:

```svelte
<script>
	let isActive = $state(false);
	let theme = $state('dark');
	let accentColor = $state('#6200ea');
</script>

<kit:btn
	variant="filled"
	s-class={['my-btn', { active: isActive }]}
	s-class_theme={`--${theme}`}
	s-style={{ 'border-radius': '99px' }}
	s-style_--kit-accent={accentColor}
	onclick={() => (isActive = !isActive)}
>
	Toggle
</kit:btn>
```
