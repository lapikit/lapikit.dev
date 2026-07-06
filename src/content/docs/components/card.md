---
title: "Card"
description: "Organize and display content in visually coherent blocks. The Lapikit card component is easy to style."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/card/preview.svelte';
	import Variants from '$examples/components/card/variants.svelte';
	import Density from '$examples/components/card/density.svelte';
	import Interactive from '$examples/components/card/interactive.svelte';
	import Structure from '$examples/components/card/structure.svelte';
	import Elevation from '$examples/components/card/elevation.svelte';
</script>

# Card component

The `kit:card` component is a versatile container used to group together information or actions in a user interface. It can be used to display content, images, buttons or links, while offering advanced customization to suit various styles and contexts.

<LazyRepl title="card.svelte" presentation lang="svelte" content={() => import('$examples/components/card/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:card` is a layout container, it adds no heading or structure on its own. Use the following subcomponents to structure your card content:

| components           | description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `kit:card-media`     | Wraps media (image, video). Clips overflow to the card radius. |
| `kit:card-title`     | Bold title. `font-weight: 600`, tight line-height.             |
| `kit:card-content`   | Main text content.                                             |
| `kit:card-actions`   | Flex bar for action buttons.                                   |
| `kit:card-container` | Main container for the card content.                           |

<LazyRepl title="card.svelte" lang="svelte" content={() => import('$examples/components/card/structure.svelte?raw')}>
<Structure/>
</LazyRepl>

## Examples of card

### Variants

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

- `filled` - accent background, white text.
- `outline` - transparent background with accent border.
- `text` - no background or border, accent text color.

<LazyRepl title="card.svelte" lang="svelte" content={() => import('$examples/components/card/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the internal padding.

- **density**: `'none' | 'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="card.svelte" lang="svelte" content={() => import('$examples/components/card/density.svelte?raw')}>
<Density/>
</LazyRepl>

### Interactive

An interactive card lifts on hover and shows a ripple on click. This behaviour is automatic when `href` is set or an `onclick` handler is attached. Use `interactive` to enable it on a plain `<div>` without changing the element.

- **interactive**: `boolean` = `false`
- **href**: `string | undefined` = `undefined`
- **active**: `boolean` = `false`
- **disabled**: `boolean` = `false`
- **noRipple**: `boolean` = `false`

> When `disabled` is `true` on an `<a>` card, `href` is removed and `tabindex="-1"` is set.

<LazyRepl title="card.svelte" lang="svelte" content={() => import('$examples/components/card/interactive.svelte?raw')}>
<Interactive/>
</LazyRepl>

### Elevation

The Elevation property allows you to apply a `box shadow` effect to the **Card** component. This property lets you add this effect to the component—either by default or when the component is in the `hover` or `active` states.

- **elevation**: `'0' | '1' | '2' | '3' | '4' | '5'` = `'undefined'`
- **elevation** (multi-state): `{base: value, hover: value, active: value}`

<LazyRepl title="card.svelte" lang="svelte" content={() => import('$examples/components/card/elevation.svelte?raw')}>
<Elevation/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Card } from 'lapikit/components';"} />

## API Reference

**`kit:card`**

| props       | type                                                            | description                                             | default     |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| is          | `'div' \| 'article' \| 'section' \| 'aside' \| 'a' \| 'button'` | HTML element to render. Overridden by `href`.           | `'div'`     |
| variant     | `'filled' \| 'outline' \| 'text'`                               | Visual style.                                           | `'filled'`  |
| density     | `'none' \| 'compact' \| 'default' \| 'comfortable'`             | Internal padding.                                       | `'default'` |
| rounded     | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | Border radius.                                          | `'md'`      |
| elevation   | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`      | Add shadow effect                                       |             |
| href        | `string`                                                        | Renders as `<a>`. Enables interactive mode.             |             |
| interactive | `boolean`                                                       | Enables hover lift and ripple without changing the tag. | `false`     |
| active      | `boolean`                                                       | Applies the pressed background.                         | `false`     |
| disabled    | `boolean`                                                       | Dims and disables interaction.                          | `false`     |
| noRipple    | `boolean`                                                       | Disables the ripple animation on click.                 |             |
| children    | `Snippet`                                                       | Card content.                                           |             |

For better structure, combine your [Cards](/docs/components/card) with [Avatars](/docs/components/avatar) and clear [Buttons](/docs/components/button).
