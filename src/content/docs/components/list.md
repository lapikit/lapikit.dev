---
title: "List"
description: "Structure your data with a stylized list. Ideal for menus, hierarchical content or clickable elements."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/list/preview.svelte';
	import Variants from '../../../content/examples/components/list/variants.svelte';
	import PrependAppend from '../../../content/examples/components/list/prepend-append.svelte';
	import Nav from '../../../content/examples/components/list/nav.svelte';
</script>

# List component

The `kit:list` and `kit:list-item` components render structured vertical lists. Items are interactive automatically when `onclick` is attached or `href` is set.

<LazyRepl title="list.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/list/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:list` is a layout container that sets size tokens consumed by its `kit:list-item` children. `kit:list-item` detects its tag automatically: it renders as `<a>` when `href` is set, `<button>` when an `onclick` is attached, or `<div>` otherwise.

## Examples of list

### Variants

Shows visual variants (**filled**, **text**, **outline**) to adapt the overall appearance of the list to graphic needs.

- **filled** (default): solid background.
- **outline**: visible border.
- **text** : transparent background.

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

<LazyRepl title="list.svelte" lang="svelte" content={() => import('../../../content/examples/components/list/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### prepend and append

`kit:list-item` supports `prepend` and `append` snippets for icons, avatars, badges, or any inline content.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="list.svelte" lang="svelte" content={() => import('../../../content/examples/components/list/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### nav

Add `nav` to `kit:list` (and `is="nav"`) for a navigation list. This increases padding and sets `role="navigation"` on the container.

- **nav**: `boolean` = `false`

<LazyRepl title="list.svelte" lang="svelte" content={() => import('../../../content/examples/components/list/nav.svelte?raw')}>

<Nav/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { List, ListItem } from 'lapikit/labs/components';"} />

## API Reference

**`kit:list`**

| props      | type                                        | description                                        | default     |
| ---------- | ------------------------------------------- | -------------------------------------------------- | ----------- |
| is         | `'div' \| 'nav' \| 'ul'`                    | HTML element to render.                            | `'div'`     |
| variant    | `'filled' \| 'outline' \| 'text'`           | Visual style.                                      | `'filled'`  |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Item height, padding, and font size tokens.        | `'md'`      |
| density    | `'compact' \| 'default' \| 'comfortable'`   | Vertical density offset applied to item height.    | `'default'` |
| rounded    | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Border radius.                                     | `'md'`      |
| nav        | `boolean`                                   | Navigation mode more padding, `role="navigation"`. | `false`     |
| color      | `string`                                    | Foreground color override (`--kit-list-fg`).       |             |
| background | `string`                                    | Background color override (`--kit-list-bg`).       |             |
| children   | `Snippet`                                   | List items.                                        |             |

**`kit:list-item`**

| props      | type                                        | description                                       | default |
| ---------- | ------------------------------------------- | ------------------------------------------------- | ------- |
| is         | `'div' \| 'a' \| 'button' \| 'li'`          | HTML element. Overridden by `href` or `onclick`.  | `'div'` |
| href       | `string`                                    | Renders as `<a>`. Cleared when `disabled`.        |         |
| active     | `boolean`                                   | Applies the active background.                    | `false` |
| disabled   | `boolean`                                   | Dims and blocks interaction.                      | `false` |
| rounded    | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Per-item border radius override.                  | `'sm'`  |
| noRipple   | `boolean`                                   | Disables the ripple animation.                    | `false` |
| color      | `string`                                    | Foreground color override (`--kit-list-item-fg`). |         |
| background | `string`                                    | Background color override (`--kit-list-item-bg`). |         |
| prepend    | `Snippet`                                   | Content before the label.                         |         |
| append     | `Snippet`                                   | Content after the label.                          |         |
| children   | `Snippet`                                   | Item label.                                       |         |

A well-structured `kit:list` can easily be enriched with [Separators](/docs/components/separator) or elements in a [Card](/docs/components/card).
