---
title: 'Card component'
category: 'Components'
head:
  title: 'Card'
  description: 'Organize and display content in visually coherent blocks. The Lapikit card component is easy to style.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/card/preview.svelte';
	import Variants from '$examples/components/card/variants.svelte';
	import Density from '$examples/components/card/density.svelte';
	import Interactive from '$examples/components/card/interactive.svelte';
	import Structure from '$examples/components/card/structure.svelte';
	import Elevation from '$examples/components/card/elevation.svelte';
	import Color from '$examples/components/card/color.svelte';

	import previewCode from '$examples/components/card/preview.svelte?raw';
	import structureCode from '$examples/components/card/structure.svelte?raw';
	import variantsCode from '$examples/components/card/variants.svelte?raw';
	import densityCode from '$examples/components/card/density.svelte?raw';
	import interactiveCode from '$examples/components/card/interactive.svelte?raw';
	import elevationCode from '$examples/components/card/elevation.svelte?raw';
	import colorCode from '$examples/components/card/color.svelte?raw';
</script>

The `kit:card` component is a versatile container used to group together information or actions in a user interface. It can be used to display content, images, buttons or links, while offering advanced customization to suit various styles and contexts.

<LazyRepl title="card.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:card` is a layout container, it adds no heading or structure on its own. Use the following subcomponents to structure your card content:

| components           | description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `kit:card-media`     | Wraps media (image, video). Its radius follows the card radius. |
| `kit:card-title`     | Bold title. `font-weight: 600`, tight line-height.              |
| `kit:card-content`   | Main text content.                                              |
| `kit:card-actions`   | Flex bar for action buttons.                                    |
| `kit:card-container` | Main container for the card content.                            |

<LazyRepl title="card.svelte" lang="svelte" content={structureCode}>
<Structure/>
</LazyRepl>

## Examples of card

### Variants

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text' | 'plain'` = `'filled'`

- `filled` - surface background (`--kit-color-surface-1`), or the `color` with a contrasted text.
- `tonal` - light tint of the color, text in the color.
- `outline` - transparent background with a border, text in the color.
- `surface` - very light tint of the color with a soft border.
- `text` - no background or border, text in the color.
- `plain` - like `text`, but hover and pressed only change the text color, never the background.

> The border thickness of `outline` and `surface` is set by the global variable `--kit-outline-weight` (`1px` by default).

<LazyRepl title="card.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the internal padding (from `6px` to `14px`) and the gap between the subcomponents (from `0px` to `8px`).

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="card.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### Colors

`color` accepts a color of the palette (`primary`, `success`...) or any CSS color. With a palette color, the text color follows its `on-` color; otherwise a contrasted color is computed.

Pass an object to use another color when the card is `active`.

- **color**: `string | { base?: string; active?: string }` = `undefined`

`kit:card-title` and `kit:card-content` also accept a `color` (a string) to change only their text color.

<LazyRepl title="card.svelte" lang="svelte" content={colorCode}>
<Color/>
</LazyRepl>

### Interactive

An interactive card changes its background on hover and pressed, and shows a ripple on click.

- **interactive**: `boolean | undefined` = `undefined`

- `undefined` - detected: interactive when the card renders as `<a>` or `<button>`, or has an `onclick`, `onpointerdown` or `onkeydown` handler.
- `true` - forced, even on a plain `<div>`, without changing the element.
- `false` - no visual feedback, the card stays clickable.

To add a shadow on hover, use the multi-state [elevation](#elevation).

- **href**: `string | undefined` = `undefined`
- **active**: `boolean` = `false`
- **disabled**: `boolean` = `false`
- **noRipple**: `boolean` = `false`

> When `disabled` is `true` on an `<a>` card, `href` is removed and `tabindex="-1"` is set.

<LazyRepl title="card.svelte" lang="svelte" content={interactiveCode}>
<Interactive/>
</LazyRepl>

### Elevation

The Elevation property allows you to apply a `box shadow` effect to the **Card** component. This property lets you add this effect to the component—either by default or when the component is in the `hover` or `active` states.

- **elevation**: `'0' | '1' | '2' | '3' | '4' | '5'` = `'undefined'`
- **elevation** (multi-state): `{base: value, hover: value, active: value}`

<LazyRepl title="card.svelte" lang="svelte" content={elevationCode}>
<Elevation/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Card } from 'lapikit/components';"} />

## API Reference

**`kit:card`**

| props         | type                                                                 | description                                                               | default     |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                        | Bindable reference to the rendered DOM element.                           | `null`      |
| is            | `'div' \| 'article' \| 'section' \| 'aside' \| 'a' \| 'button'`      | HTML element to render. Overridden by `href`.                             | `'div'`     |
| class         | `string \| array \| object`                                          | Classes of the card, with the rules of Svelte (clsx).                     |             |
| style         | `string`                                                             | Inline style of the card.                                                 |             |
| s-class       | `string \| array \| object`                                          | Classes of the card, merged with `class`.                                 |             |
| s-style       | `object`                                                             | Inline style as an object of property / value pairs.                      |             |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text' \| 'plain'` | Visual style.                                                             | `'filled'`  |
| type          | `'button' \| 'submit' \| 'reset'`                                    | Defined html type to card.                                                |             |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'`   | Internal padding and gap.                                                 | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | Border radius.                                                            | `'md'`      |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`           | Add shadow effect.                                                        |             |
| href          | `string`                                                             | Renders as `<a>`. Enables interactive mode.                               |             |
| interactive   | `boolean \| undefined`                                               | `undefined` detects, `true` forces, `false` disables the visual feedback. | `undefined` |
| active        | `boolean`                                                            | Applies the pressed background.                                           | `false`     |
| disabled      | `boolean`                                                            | Dims and disables interaction.                                            | `false`     |
| noRipple      | `boolean`                                                            | Disables the ripple animation on click.                                   |             |
| children      | `Snippet`                                                            | Card content.                                                             |             |
| color         | `string \| { base?: string; active?: string }`                       | Card color, its use depends on the variant.                               |             |

**`kit:card-container`**

| props         | type                        | description                                                     | default |
| ------------- | --------------------------- | --------------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`               | Bindable reference to the rendered DOM element.                 | `null`  |
| is            | `'div' \| 'span'`           | HTML element to render                                          | `'div'` |
| class         | `string \| array \| object` | Classes of the card container, with the rules of Svelte (clsx). |         |
| style         | `string`                    | Inline style of the card container.                             |         |
| s-class       | `string \| array \| object` | Classes of the card container, merged with `class`.             |         |
| s-style       | `object`                    | Inline style as an object of property / value pairs.            |         |

**`kit:card-title`**

| props         | type                                                                        | description                                                 | default |
| ------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`                                                               | Bindable reference to the rendered DOM element.             | `null`  |
| is            | `'div' \| 'p' \| 'span' \| 'h1' \| 'h2' \| 'h3'  \| 'h4'  \| 'h5'  \| 'h6'` | HTML element to render                                      | `'div'` |
| class         | `string \| array \| object`                                                 | Classes of the card title, with the rules of Svelte (clsx). |         |
| style         | `string`                                                                    | Inline style of the card title.                             |         |
| s-class       | `string \| array \| object`                                                 | Classes of the card title, merged with `class`.             |         |
| s-style       | `object`                                                                    | Inline style as an object of property / value pairs.        |         |
| color         | `string`                                                                    | Text color (`--kit-card-title-color`).                      |         |

**`kit:card-content`**

| props         | type                                                                        | description                                                   | default |
| ------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`                                                               | Bindable reference to the rendered DOM element.               | `null`  |
| is            | `'div' \| 'p' \| 'span' \| 'h1' \| 'h2' \| 'h3'  \| 'h4'  \| 'h5'  \| 'h6'` | HTML element to render                                        | `'div'` |
| class         | `string \| array \| object`                                                 | Classes of the card content, with the rules of Svelte (clsx). |         |
| style         | `string`                                                                    | Inline style of the card content.                             |         |
| s-class       | `string \| array \| object`                                                 | Classes of the card content, merged with `class`.             |         |
| s-style       | `object`                                                                    | Inline style as an object of property / value pairs.          |         |
| color         | `string`                                                                    | Text color (`--kit-card-content-color`).                      |         |

**`kit:card-media`**

| props         | type                        | description                                                 | default |
| ------------- | --------------------------- | ----------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`               | Bindable reference to the rendered DOM element.             | `null`  |
| is            | `'div' \| 'span'`           | HTML element to render                                      | `'div'` |
| class         | `string \| array \| object` | Classes of the card media, with the rules of Svelte (clsx). |         |
| style         | `string`                    | Inline style of the card media.                             |         |
| s-class       | `string \| array \| object` | Classes of the card media, merged with `class`.             |         |
| s-style       | `object`                    | Inline style as an object of property / value pairs.        |         |

**`kit:card-actions`**

| props         | type                        | description                                                   | default |
| ------------- | --------------------------- | ------------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`               | Bindable reference to the rendered DOM element.               | `null`  |
| is            | `'div' \| 'span'`           | HTML element to render                                        | `'div'` |
| class         | `string \| array \| object` | Classes of the card actions, with the rules of Svelte (clsx). |         |
| style         | `string`                    | Inline style of the card actions.                             |         |
| s-class       | `string \| array \| object` | Classes of the card actions, merged with `class`.             |         |
| s-style       | `object`                    | Inline style as an object of property / value pairs.          |         |

> `class:` and `style:` directives also work on every card component with the Lapikit preprocessor, see [Class and Style](/docs/essentials/class-and-style).

**CSS variables**

| variable               | description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `--kit-card-padding`   | Internal padding, set by `density`.                                         |
| `--kit-card-gap`       | Gap between the subcomponents, set by `density`.                            |
| `--kit-card-radius`    | Border radius, set by `rounded`.                                            |
| `--kit-outline-weight` | Border thickness of the `outline` and `surface` variants (global variable). |

For better structure, combine your [Cards](/docs/components/card) with [Avatars](/docs/components/avatar) and clear [Buttons](/docs/components/button).
