---
title: "Toolbar"
description: "Group actions in a compact, coherent space. Ideal for headers, lists or content filters."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/toolbar/preview.svelte';
	import Variants from '../../../content/examples/components/toolbar/variants.svelte';
	import Density from '../../../content/examples/components/toolbar/density.svelte';
	import Orientation from '../../../content/examples/components/toolbar/orientation.svelte';
</script>

# Toolbar component

The `kit:toolbar` component creates a flexible, customizable toolbar, ideal for organizing actions, titles, filters or other navigation content. It is designed to adapt to different contexts thanks to its layout, style and density options.

<LazyRepl title="toolbar.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/toolbar/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:toolbar` renders as a `<div>` by default but can be changed to `<header>` or `<nav>`. It sets `role="toolbar"` automatically. Place [`kit:btn`](/docs/components/button), [`kit:separator`](/docs/components/separator), or any other element as children.

## Examples of toolbar

### Variants

Demonstrates the use of visual variants: **filled**, **outline**, **text** or **dash** to adapt the style of the bar to different UI contexts.

- **filled** (default): solid background.
- **outline**: visible border.
- **text** : transparent background.
- **dash** : dashed border.

- **variant**: `'filled' | 'outline' | 'text' | 'dash'` = `'filled'`

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### density

Shows how to adjust density (`compact`, `comfortable`, `default`) to manage vertical spacing within the bar. Useful for optimizing the interface according to available space.

- **compact**: reduced margins and padding, useful for lists or tables.
- **comfortable**: a visual compromise.
- **default**: standard spacing.

- **density**: `'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/density.svelte?raw')}>
<Density/>
</LazyRepl>

### orientation

The toolbar can be displayed horizontally (default) or vertically. This example illustrates the use of the orientation="vertical" option to stack elements from top to bottom.

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/orientation.svelte?raw')}>
<Orientation/>
</LazyRepl>

### location

Set `location` to `'top'` or `'bottom'` to pin the toolbar to the viewport edge (`position: fixed`). This is intended for app-level toolbars like a top navigation bar or a bottom action bar.

- **location**: `'top' | 'bottom' | undefined` = `undefined`

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Toolbar } from 'lapikit/labs/components';"} />

## API Reference

**`kit:toolbar`**

| props        | type                                        | description                                     | default        |
| ------------ | ------------------------------------------- | ----------------------------------------------- | -------------- |
| is           | `'div' \| 'header' \| 'nav'`                | HTML element to render.                         | `'div'`        |
| variant      | `'filled' \| 'outline' \| 'text' \| 'dash'` | Visual style.                                   | `'filled'`     |
| density      | `'compact' \| 'default' \| 'comfortable'`   | Padding and size density.                       | `'default'`    |
| orientation  | `'horizontal' \| 'vertical'`                | Layout direction.                               | `'horizontal'` |
| location     | `'top' \| 'bottom'`                         | Pins to viewport edge (`position: fixed`).      |                |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Border radius.                                  | `'xl'` (1rem)  |
| classContent | `string \| string[]`                        | Class(es) applied to the inner wrapper.         |                |
| color        | `string`                                    | Foreground color override (`--kit-toolbar-fg`). |                |
| background   | `string`                                    | Background color override (`--kit-toolbar-bg`). |                |
| children     | `Snippet`                                   | Toolbar content.                                |                |

`kit:toolbar` is the right place to group [Buttons](/docs/components/button), [Chips](/docs/components/chip) and [Icons](/docs/components/icon) in a coherent space.
