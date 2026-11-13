---
title: 'Button component'
category: 'Components'
head:
  title: 'Button'
  description: "Stylish, customizable Svelte buttons with Lapikit. Variants, icons, colors, states: everything's ready."
navigation:
  label: 'Button'
  name: 'kit:btn'
  description: 'Interactive element with multiple variants and sizes.'
---

The `kit:btn` component is a central component of Lapikit. It allows you to create buttons that are adaptable, accessible and easily customized, either via props or CSS variables.

It automatically manages variants, states (`active`, `loading`, etc.), accessibility, colors, sizes, and integrates with icons or additional content (`prepend`, `append`, `load`).

```repl svelte
/// title: button.svelte
/// presentation
/// example: components/btn/preview.svelte
```

## Examples of button

### Variants

Variants control the overall style of the button. They enable adaptation to different interface contexts, while maintaining visual consistency.

- **filled** (default): solid button, generally used for main actions. Surface background (`--kit-color-surface-2`), or the `color` with a contrasted text.
- **tonal**: light tint of the color, text in the color. A softer main action.
- **outline**: transparent background with a border, often used for secondary actions.
- **surface**: very light tint of the color with a soft border.
- **text**: discreet button with no background or border, perfect for actions in a text flow.
- **plain**: like `text`, but hover and pressed only change the text color, never the background.
- **link**: styled as a hyperlink (underlined, no height or padding), ideal for navigation or less prominent actions.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text' | 'plain' | 'link'` = `'filled'`

> The border thickness of `outline` and `surface` is set by the global variable `--kit-outline-weight` (`1px` by default).

```repl svelte
/// title: button.svelte
/// example: components/btn/variants.svelte
```

### size

The `size` prop adjusts the button's height, padding, font size and the gap between the icon and the text. It allows you to create buttons that fit different contexts, from compact icon buttons to large call-to-action buttons.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

| size | height          | font size              |
| ---- | --------------- | ---------------------- |
| `xs` | `1.5rem` (24px) | `0.75rem` (12px)       |
| `sm` | `2rem` (32px)   | `--kit-font-xs` (13px) |
| `md` | `2.5rem` (40px) | `--kit-font-sm` (14px) |
| `lg` | `3rem` (48px)   | `--kit-font-lg` (16px) |
| `xl` | `3.5rem` (56px) | `--kit-font-xl` (17px) |

> The sizes are in `rem`: the button grows with the font size set in the browser. The values in px are for the default size (16px).

```repl svelte
/// title: button.svelte
/// example: components/btn/size.svelte
```

### Density

`density` adjusts the height and the horizontal padding, from `-4px` (`dense`) to `+4px` (`spacious`), without changing the font size.

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

```repl svelte
/// title: button.svelte
/// example: components/btn/density.svelte
```

### Colors

`color` accepts a color of the palette (`accent`, `success`...) or any CSS color. With a palette color, the text color follows its `on-` color; otherwise a contrasted color is computed.

`color` sets the `--kit-btn-color` variable. You can also set it yourself, in your CSS or on one button with `style:--kit-btn-color={brand}`.

Pass an object to use another color when the button is `active`, or `false` for no color, handy with a condition: `color={isActive && 'accent'}`.

- **color**: `string | false | { base?: string | false; active?: string | false }` = `undefined`

```repl svelte
/// title: button.svelte
/// example: components/btn/color.svelte
```

### icon

Add `icon` to render a square button width equals height. Useful for icon-only actions.

- **icon**: `boolean` = `false`

```repl svelte
/// title: button.svelte
/// example: components/btn/icon.svelte
```

### prepend and append snippets

Use `prepend` and `append` to place icons or elements on either side of the label.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

```repl svelte
/// title: button.svelte
/// example: components/btn/prepend-append.svelte
```

### States

The `kit:btn` component can reflect several visual or functional states, useful for informing the user or managing interaction. These states can be combined in certain cases (e.g. loading + success), but some, such as disabled, take precedence over all.

Here are the main states available:

- **disabled**: `boolean` = `false`
- **loading**: `boolean` = `false`
- **active**: `boolean` = `false`

The button changes its background on hover and pressed, and shows a ripple on click (`noRipple` removes it). A disabled button is dimmed with `--kit-disabled-opacity`. While `loading`, `aria-busy` is set.

```repl svelte
/// title: button.svelte
/// example: components/btn/states.svelte
```

Use the `load` snippet to replace the default `...` spinner with custom content.

- **load**: `Snippet | undefined` = `undefined`

### block and wide

`block` makes the button stretch to its container's full width. `wide` caps it at `16rem` and is intended to be centered.

- **block**: `boolean` = `false`
- **wide**: `boolean` = `false`

```repl svelte
/// title: button.svelte
/// example: components/btn/block.svelte
```

### As a link

Pass `href` to render the button as an `<a>` element. The `disabled` prop removes `href` and takes the link out of the keyboard navigation (`tabindex="-1"`).

- **href**: `string | undefined` = `undefined`

```repl svelte
/// title: button.svelte
/// example: components/btn/as-link.svelte
```

### As an input

Add `input` (or `is="input"`) to render a native `<input>` styled as a button, inside a wrapper. A `checkbox` or a `radio` is wrapped in a `<label>`: the whole button toggles the input, and it takes the active style while checked. The other types (`button`, `submit`, `reset`) are wrapped in a `<div>`.

- **input**: `boolean` = `false`
- **type**: `'button' | 'submit' | 'reset' | 'checkbox' | 'radio'` = `'button'`
- **label**: `string | undefined` = `undefined`, the text of a checkbox or a radio (`value` when empty)
- **value**: `string | number | boolean | undefined` = `undefined`
- **checked**: `boolean | undefined` = `undefined`

The other attributes (`name`, `onchange`...) go on the `<input>`, so the button works in a form like a native input.

```repl svelte
/// title: button.svelte
/// example: components/btn/input.svelte
```

### tooltip

Add a tooltip to the button with the `tooltip` prop: a text, or options (`location`, `variant`, `delayDuration`...). An icon button gets the text as its accessible name. See [the tooltip prop](/docs/components/tooltip#the-tooltip-prop).

```repl svelte
<kit:btn tooltip="More information">...</kit:btn>
```

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

```repl js
import { Btn } from 'lapikit/components';
```

## API Reference

**`kit:btn`**

| props         | type                                                                           | description                                                                                                                                               | default     |
| ------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                                  | Bindable reference to the rendered DOM element.                                                                                                           | `null`      |
| is            | `'button' \| 'a' \| 'input'`                                                   | HTML element to render. Overridden by `href`; `'input'` is the same as `input`.                                                                           | `'button'`  |
| class         | `string \| array \| object`                                                    | Classes of the button, with the rules of Svelte (clsx).                                                                                                   |             |
| style         | `string`                                                                       | Inline style of the button.                                                                                                                               |             |
| s-class       | `string \| array \| object`                                                    | Classes of the button, merged with `class`.                                                                                                               |             |
| s-style       | `object`                                                                       | Inline style as an object of property / value pairs.                                                                                                      |             |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text' \| 'plain' \| 'link'` | Visual style.                                                                                                                                             | `'filled'`  |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                         | Height, padding, font size and gap.                                                                                                                       | `'md'`      |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'`             | Height and horizontal padding.                                                                                                                            | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                          | Border radius.                                                                                                                                            | `'sm'`      |
| href          | `string`                                                                       | Renders as `<a>`. Cleared when `disabled`.                                                                                                                |             |
| type          | `'button' \| 'submit' \| 'reset' \| 'checkbox' \| 'radio'`                     | Type of the button or of the input.                                                                                                                       | `'button'`  |
| input         | `boolean`                                                                      | Renders an `<input>` in a wrapper (a `<label>` for a checkbox or a radio).                                                                                |             |
| value         | `string \| number \| boolean`                                                  | Value of the input.                                                                                                                                       |             |
| checked       | `boolean`                                                                      | Checked state of a checkbox or a radio input.                                                                                                             |             |
| label         | `string`                                                                       | Text of the input, `value` when empty.                                                                                                                    |             |
| disabled      | `boolean`                                                                      | Prevents interaction, dims the button.                                                                                                                    | `false`     |
| tooltip       | `string \| TooltipOptions`                                                     | Tooltip on hover and keyboard focus, see [the tooltip prop](/docs/components/tooltip#the-tooltip-prop). A disabled button with a tooltip stays focusable. |             |
| loading       | `boolean`                                                                      | Shows a spinner, hides content, sets `aria-busy`.                                                                                                         |             |
| active        | `boolean`                                                                      | Applies the pressed background.                                                                                                                           | `false`     |
| icon          | `boolean`                                                                      | Makes width equal height for icon-only buttons.                                                                                                           |             |
| block         | `boolean`                                                                      | Stretches to full container width.                                                                                                                        |             |
| wide          | `boolean`                                                                      | Caps width at `16rem`.                                                                                                                                    |             |
| noRipple      | `boolean`                                                                      | Disables the ripple animation on click.                                                                                                                   |             |
| prepend       | `Snippet`                                                                      | Content before the label.                                                                                                                                 |             |
| append        | `Snippet`                                                                      | Content after the label.                                                                                                                                  |             |
| load          | `Snippet`                                                                      | Custom spinner content shown while loading.                                                                                                               |             |
| children      | `Snippet`                                                                      | Button label.                                                                                                                                             |             |
| color         | `string \| false \| { base?, active? }`                                        | Button color, its use depends on the variant (`--kit-btn-color`).                                                                                         |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`                     | Add shadow effect.                                                                                                                                        |             |

> `class:` and `style:` directives also work on `kit:btn` with the Lapikit preprocessor, see [Class and Style](/docs/essentials/class-and-style).

`kit:btn` become more effective with [Tooltips](/docs/components/tooltip), a [Toolbar](/docs/components/toolbar) or [Popover](/docs/components/popover) interactions.
