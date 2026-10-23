---
title: 'List component'
category: 'Components'
head:
  title: 'List'
  description: 'Structure your data with a stylized list. Ideal for menus, hierarchical content or clickable elements.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/list/preview.svelte';
	import Variants from '$examples/components/list/variants.svelte';
	import PrependAppend from '$examples/components/list/prepend-append.svelte';
	import Nav from '$examples/components/list/nav.svelte';

	import previewCode from '$examples/components/list/preview.svelte?raw';
	import variantsCode from '$examples/components/list/variants.svelte?raw';
	import prependAppendCode from '$examples/components/list/prepend-append.svelte?raw';
	import navCode from '$examples/components/list/nav.svelte?raw';
</script>

The `kit:list` and `kit:list-item` components render structured vertical lists. Items are interactive automatically when `onclick` is attached or `href` is set.

<LazyRepl title="list.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:list` is a layout container that sets size tokens consumed by its `kit:list-item` children. `kit:list-item` detects its tag automatically: it renders as `<a>` when `href` is set, `<button>` when an `onclick` is attached, or `<div>` otherwise.

## Examples of list

### Variants

The variant and the `color` of the list apply to all its items. A `kit:list-item` can override the color with its own `color`.

- **filled** (default): surface background (`--kit-color-surface-2`), or the `color` with a contrasted text.
- **tonal**: light tint of the color, text in the color.
- **outline**: transparent background with a border on each item.
- **surface**: very light tint of the color with a soft border.
- **text**: transparent background, text in the color.
- **plain**: like `text`, but hover and pressed only change the text color, never the background.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text' | 'plain'` = `'filled'`
- **color**: `string | false` = `undefined`

<LazyRepl title="list.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### prepend and append

`kit:list-item` supports `prepend` and `append` snippets for icons, avatars, badges, or any inline content.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="list.svelte" lang="svelte" content={prependAppendCode}>
<PrependAppend/>
</LazyRepl>

### nav

Add `nav` to `kit:list` (and `is="nav"`) for a navigation list. This increases padding and sets `role="navigation"` on the container.

- **nav**: `boolean` = `false`

<LazyRepl title="list.svelte" lang="svelte" content={navCode}>

<Nav/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { List, ListItem } from 'lapikit/components';"} />

## API Reference

**`kit:list`**

| props         | type                                                                 | description                                             | default     |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                        | Bindable reference to the rendered DOM element.         | `null`      |
| is            | `'div' \| 'nav' \| 'ul'`                                             | HTML element to render.                                 | `'div'`     |
| class         | `string \| array \| object`                                          | Classes of the list, with the rules of Svelte (clsx).   |             |
| style         | `string`                                                             | Inline style of the list.                               |             |
| s-class       | `string \| array \| object`                                          | Classes of the list, merged with `class`.               |             |
| s-style       | `object`                                                             | Inline style as an object of property / value pairs.    |             |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text' \| 'plain'` | Visual style of the items.                              | `'filled'`  |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                               | Item height, padding, gap and font size (in `rem`).     | `'md'`      |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'`   | Item height and padding, from `-4px` to `+4px`.         | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                | Border radius on list items children.                   | `'md'`      |
| nav           | `boolean`                                                            | Navigation mode more padding, `role="navigation"`.      | `false`     |
| color         | `string \| false`                                                    | Color of all the items, its use depends on the variant. |             |
| children      | `Snippet`                                                            | List items.                                             |             |

**`kit:list-item`**

| props         | type                                    | description                                                                                              | default     |
| ------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                           | Bindable reference to the rendered DOM element.                                                          | `null`      |
| is            | `'div' \| 'a' \| 'button' \| 'li'`      | HTML element. Overridden by `href` or `onclick`.                                                         | `'div'`     |
| class         | `string \| array \| object`             | Classes of the item, with the rules of Svelte (clsx).                                                    |             |
| style         | `string`                                | Inline style of the item.                                                                                |             |
| s-class       | `string \| array \| object`             | Classes of the item, merged with `class`.                                                                |             |
| s-style       | `object`                                | Inline style as an object of property / value pairs.                                                     |             |
| href          | `string`                                | Renders as `<a>`. Cleared when `disabled`.                                                               |             |
| active        | `boolean`                               | Applies the active color.                                                                                | `false`     |
| disabled      | `boolean`                               | Dims and blocks interaction.                                                                             | `false`     |
| noRipple      | `boolean`                               | Disables the ripple animation.                                                                           | `false`     |
| interactive   | `boolean \| undefined`                  | `undefined` detects (`<a>`, `<button>`, `onclick`), `true` forces, `false` disables the visual feedback. | `undefined` |
| color         | `string \| false \| { base?, active? }` | Color of the item, overrides the color of the list.                                                      |             |
| prepend       | `Snippet`                               | Content before the label.                                                                                |             |
| append        | `Snippet`                               | Content after the label.                                                                                 |             |
| children      | `Snippet`                               | Item label.                                                                                              |             |

A well-structured `kit:list` can easily be enriched with [Separators](/docs/components/separator) or elements in a [Card](/docs/components/card).
