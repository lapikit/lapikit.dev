---
title: "Chip"
description: "Small, practical UI elements for filters, tags or status. Supports colors, states, events and variants."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/chip/preview.svelte';
	import Variants from '$examples/components/chip/variants.svelte';
	import Size from '$examples/components/chip/size.svelte';
	import PrependAppend from '$examples/components/chip/prepend-append.svelte';
	import States from '$examples/components/chip/states.svelte';
	import LabelStyle from '$examples/components/chip/label-style.svelte';
</script>

# Chip component

The `kit:chip` component displays small interactive labels, perfect for representing status, categories, filters or actions. Compact, stylable and highly flexible, it can be clicked, disabled, loaded, closed or enriched with snippets.
It supports different variants, states, densities and sizes, to suit all UI contexts. It can be used alone, in groups, or as the basis for a tag or filter system.

<LazyRepl title="chip.svelte" presentation lang="svelte" content={() => import('$examples/components/chip/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:chip` renders as a `<div>` by default. It becomes interactive automatically when `onclick` is attached, `href` is set, or `is="button"`. Unlike `kit:btn`, it has no `rounded` prop the pill shape is fixed.

## Examples of chip

### Variants

Shows visual variants (**filled**, **text**, **outline**, **link**) to adapt the overall appearance of the list to graphic needs.

- **filled** (default): solid background.
- **outline**: visible border.
- **text** : transparent background.
- **link**: styled as a hyperlink, ideal for navigation or less prominent actions.

- **variant**: `'filled' | 'outline' | 'text' | 'link` = `'filled'`

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('$examples/components/chip/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### size

With `size`, adjust the chip's height and font size. From compact tags to larger status indicators, this prop allows you to create chips that fit perfectly into different contexts.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('$examples/components/chip/size.svelte?raw')}>
<Size/>
</LazyRepl>

### prepend and append snippets

Use `prepend` for an icon before the label, and `append` for an action typically a remove button.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('$examples/components/chip/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### States

`disabled` dims and blocks interaction. `readonly` blocks interaction without the dim. `active` applies the pressed background useful for toggled filter chips.

- **active**: `boolean` = `false`
- **disabled**: `boolean` = `false`
- **readonly**: `boolean` = `false`

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('$examples/components/chip/states.svelte?raw')}>
<States/>
</LazyRepl>

### labelStyle

`labelStyle` applies uppercase, bold, and slight letter-spacing suited for category or status badges.

- **labelStyle**: `labelStyle` = `false`

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('$examples/components/chip/label-style.svelte?raw')}>
<LabelStyle/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Chip } from 'lapikit/components';"} />

## API Reference

**`kit:chip`**

| props      | type                                        | description                                                | default     |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- | ----------- |
| is         | `'div' \| 'a' \| 'button' \| 'input'`       | HTML element. Overridden by `href` or event handlers.      | `'div'`     |
| variant    | `'filled' \| 'outline' \| 'text' \| 'link'` | Visual style.                                              | `'filled'`  |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Height and font size.                                      | `'md'`      |
| density    | `'compact' \| 'default' \| 'comfortable'`   | Padding and height multiplier.                             | `'default'` |
| href       | `string`                                    | Renders as `<a>`. Cleared when `disabled` or `readonly`.   |             |
| active     | `boolean`                                   | Applies the pressed background.                            | `false`     |
| disabled   | `boolean`                                   | Dims and blocks all interaction.                           | `false`     |
| readonly   | `boolean`                                   | Blocks interaction without disabled styling.               | `false`     |
| labelStyle | `boolean`                                   | Uppercase, bold, letter-spacing for badges and categories. | `false`     |
| loading    | `boolean`                                   | Shows a spinner, hides content.                            |             |
| noRipple   | `boolean`                                   | Disables the ripple animation on click.                    |             |
| prepend    | `Snippet`                                   | Content before the label.                                  |             |
| append     | `Snippet`                                   | Content after the label.                                   |             |
| load       | `Snippet`                                   | Custom spinner content shown while loading.                |             |
| children   | `Snippet`                                   | Chip label.                                                |             |

`kit:chip` are often used in a [Toolbar](/docs/components/toolbar) or as a complement in a [Card](/docs/components/card) to structure information and [List](/docs/components/list).
