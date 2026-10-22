---
title: 'Chip component'
category: 'Components'
head:
  title: 'Chip'
  description: 'Small, practical UI elements for filters, tags or status. Supports colors, states, events and variants.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/chip/preview.svelte';
	import Variants from '$examples/components/chip/variants.svelte';
	import Size from '$examples/components/chip/size.svelte';
	import PrependAppend from '$examples/components/chip/prepend-append.svelte';
	import States from '$examples/components/chip/states.svelte';
	import LabelStyle from '$examples/components/chip/label-style.svelte';
	import Density from '$examples/components/chip/density.svelte';
	import Color from '$examples/components/chip/color.svelte';
	import Interactive from '$examples/components/chip/interactive.svelte';
	import Input from '$examples/components/chip/input.svelte';

	import previewCode from '$examples/components/chip/preview.svelte?raw';
	import variantsCode from '$examples/components/chip/variants.svelte?raw';
	import sizeCode from '$examples/components/chip/size.svelte?raw';
	import prependAppendCode from '$examples/components/chip/prepend-append.svelte?raw';
	import statesCode from '$examples/components/chip/states.svelte?raw';
	import labelStyleCode from '$examples/components/chip/label-style.svelte?raw';
	import densityCode from '$examples/components/chip/density.svelte?raw';
	import colorCode from '$examples/components/chip/color.svelte?raw';
	import interactiveCode from '$examples/components/chip/interactive.svelte?raw';
	import inputCode from '$examples/components/chip/input.svelte?raw';
</script>

The `kit:chip` component displays small interactive labels, perfect for representing status, categories, filters or actions. Compact, stylable and highly flexible, it can be clicked, disabled, loaded, closed or enriched with snippets.
It supports different variants, states, densities and sizes, to suit all UI contexts. It can be used alone, in groups, or as the basis for a tag or filter system.

<LazyRepl title="chip.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:chip` renders as a `<div>` by default. It becomes interactive automatically when `onclick` is attached, `href` is set, or `is="button"`. It is a pill by default (`rounded="full"`).

## Examples of chip

### Variants

Variants adapt the overall appearance of the chip to graphic needs.

- **filled** (default): surface background (`--kit-color-surface-2`), or the `color` with a contrasted text.
- **tonal**: light tint of the color, text in the color.
- **outline**: transparent background with a border.
- **surface**: very light tint of the color with a soft border.
- **text**: transparent background, text in the color.
- **plain**: like `text`, but hover and pressed only change the text color, never the background.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text' | 'plain'` = `'filled'`

> The border thickness of `outline` and `surface` is set by the global variable `--kit-outline-weight` (`1px` by default).

<LazyRepl title="chip.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### size

With `size`, adjust the chip's height, padding, font size and the gap between the icon and the text. From compact tags to larger status indicators, this prop allows you to create chips that fit perfectly into different contexts.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

| size | height           | font size              |
| ---- | ---------------- | ---------------------- |
| `xs` | `1.25rem` (20px) | `0.6875rem` (11px)     |
| `sm` | `1.5rem` (24px)  | `0.75rem` (12px)       |
| `md` | `2rem` (32px)    | `--kit-font-xs` (13px) |
| `lg` | `2.25rem` (36px) | `--kit-font-sm` (14px) |
| `xl` | `2.5rem` (40px)  | `--kit-font-md` (15px) |

> The sizes are in `rem`: the chip grows with the font size set in the browser. The values in px are for the default size (16px).

<LazyRepl title="chip.svelte" lang="svelte" content={sizeCode}>
<Size/>
</LazyRepl>

### Density

`density` adjusts the height and the horizontal padding, from `-4px` (`dense`) to `+4px` (`spacious`), without changing the font size.

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="chip.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### Colors

`color` accepts a color of the palette (`accent`, `success`...) or any CSS color. With a palette color, the text color follows its `on-` color; otherwise a contrasted color is computed.

Pass an object to use another color when the chip is `active`, or `false` for no color, handy with a condition: `color={isActive && 'accent'}`.

- **color**: `string | false | { base?: string | false; active?: string | false }` = `undefined`

<LazyRepl title="chip.svelte" lang="svelte" content={colorCode}>
<Color/>
</LazyRepl>

### Interactive

An interactive chip changes its background on hover and pressed, and shows a ripple on click.

- **interactive**: `boolean | undefined` = `undefined`

- `undefined` - detected: interactive when the chip renders as `<a>` or `<button>`, is an input, or has an `onclick`, `onkeydown` or `onkeyup` handler.
- `true` - forced, without changing the element.
- `false` - no visual feedback, the chip stays clickable.

<LazyRepl title="chip.svelte" lang="svelte" content={interactiveCode}>
<Interactive/>
</LazyRepl>

### prepend and append snippets

Use `prepend` for an icon before the label, and `append` for an action typically a remove button.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="chip.svelte" lang="svelte" content={prependAppendCode}>
<PrependAppend/>
</LazyRepl>

### States

`disabled` dims (`--kit-disabled-opacity`) and blocks interaction. `readonly` blocks interaction without the dim. `active` applies the active color, useful for toggled filter chips. While `loading`, `aria-busy` is set.

- **active**: `boolean` = `false`
- **disabled**: `boolean` = `false`
- **readonly**: `boolean` = `false`

<LazyRepl title="chip.svelte" lang="svelte" content={statesCode}>
<States/>
</LazyRepl>

### labelStyle

`labelStyle` applies uppercase, bold, and slight letter-spacing suited for category or status badges.

- **labelStyle**: `boolean` = `false`

<LazyRepl title="chip.svelte" lang="svelte" content={labelStyleCode}>
<LabelStyle/>
</LazyRepl>

### As an input

Add `input` (or `is="input"`) to render a native `<input>` styled as a chip, inside a wrapper. A `checkbox` or a `radio` is wrapped in a `<label>`: the whole chip toggles the input, and it takes the active style while checked. Perfect for filters.

- **input**: `boolean` = `false`
- **type**: `'button' | 'submit' | 'reset' | 'checkbox' | 'radio'` = `'button'`
- **label**: `string | undefined` = `undefined`, the text of a checkbox or a radio (`value` when empty)
- **value**: `string | number | boolean | undefined` = `undefined`
- **checked**: `boolean | undefined` = `undefined`

The other attributes (`name`, `onchange`...) go on the `<input>`, so the chip works in a form like a native input.

<LazyRepl title="chip.svelte" lang="svelte" content={inputCode}>
<Input/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Chip } from 'lapikit/components';"} />

## API Reference

**`kit:chip`**

| props         | type                                                                 | description                                                                                       | default     |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                        | Bindable reference to the rendered DOM element.                                                   | `null`      |
| is            | `'div' \| 'a' \| 'button' \| 'input'`                                | HTML element. Overridden by `href` or event handlers; `'input'` is the same as `input`.           | `'div'`     |
| class         | `string \| array \| object`                                          | Classes of the chip, with the rules of Svelte (clsx).                                             |             |
| style         | `string`                                                             | Inline style of the chip.                                                                         |             |
| s-class       | `string \| array \| object`                                          | Classes of the chip, merged with `class`.                                                         |             |
| s-style       | `object`                                                             | Inline style as an object of property / value pairs.                                              |             |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text' \| 'plain'` | Visual style.                                                                                     | `'filled'`  |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                               | Height, padding, font size and gap.                                                               | `'md'`      |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'`   | Height and horizontal padding.                                                                    | `'default'` |
| interactive   | `boolean \| undefined`                                               | `undefined` detects, `true` forces, `false` disables the visual feedback.                         | `undefined` |
| href          | `string`                                                             | Renders as `<a>`. Cleared when `disabled` or `readonly`, the link leaves the keyboard navigation. |             |
| type          | `'button' \| 'submit' \| 'reset' \| 'checkbox' \| 'radio'`           | Type of the button or of the input.                                                               |             |
| input         | `boolean`                                                            | Renders an `<input>` in a wrapper (a `<label>` for a checkbox or a radio).                        |             |
| value         | `string \| number \| boolean`                                        | Value of the input.                                                                               |             |
| checked       | `boolean`                                                            | Checked state of a checkbox or a radio input.                                                     |             |
| label         | `string`                                                             | Text of the input, `value` when empty.                                                            |             |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                | Border radius.                                                                                    | `'full'`    |
| active        | `boolean`                                                            | Applies the active color.                                                                         | `false`     |
| disabled      | `boolean`                                                            | Dims and blocks all interaction.                                                                  | `false`     |
| readonly      | `boolean`                                                            | Blocks interaction without disabled styling.                                                      | `false`     |
| labelStyle    | `boolean`                                                            | Uppercase, bold, letter-spacing for badges and categories.                                        | `false`     |
| loading       | `boolean`                                                            | Shows a spinner, hides content, sets `aria-busy`.                                                 |             |
| noRipple      | `boolean`                                                            | Disables the ripple animation on click.                                                           |             |
| prepend       | `Snippet`                                                            | Content before the label.                                                                         |             |
| append        | `Snippet`                                                            | Content after the label.                                                                          |             |
| load          | `Snippet`                                                            | Custom spinner content shown while loading.                                                       |             |
| children      | `Snippet`                                                            | Chip label.                                                                                       |             |
| color         | `string \| false \| { base?, active? }`                              | Chip color, its use depends on the variant.                                                       |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`           | Add shadow effect.                                                                                |             |

> `class:` and `style:` directives also work on `kit:chip` with the Lapikit preprocessor, see [Class and Style](/docs/essentials/class-and-style).

`kit:chip` are often used in a [Toolbar](/docs/components/toolbar) or as a complement in a [Card](/docs/components/card) to structure information and [List](/docs/components/list).
