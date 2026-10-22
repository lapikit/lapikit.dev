---
title: 'Toolbar component'
category: 'Components'
head:
  title: 'Toolbar'
  description: 'Group actions in a compact, coherent space. Ideal for headers, lists or content filters.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/toolbar/preview.svelte';
	import Variants from '$examples/components/toolbar/variants.svelte';
	import Density from '$examples/components/toolbar/density.svelte';
	import Orientation from '$examples/components/toolbar/orientation.svelte';

	import previewCode from '$examples/components/toolbar/preview.svelte?raw';
	import variantsCode from '$examples/components/toolbar/variants.svelte?raw';
	import densityCode from '$examples/components/toolbar/density.svelte?raw';
	import orientationCode from '$examples/components/toolbar/orientation.svelte?raw';
</script>

The `kit:toolbar` component creates a flexible, customizable toolbar, ideal for organizing actions, titles, filters or other navigation content. It is designed to adapt to different contexts thanks to its layout, style and density options.

<LazyRepl title="toolbar.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:toolbar` renders as a `<div>` by default but can be changed to `<header>` or `<nav>`. It sets `role="toolbar"` automatically. Place [`kit:btn`](/docs/components/button), [`kit:separator`](/docs/components/separator), or any other element as children.

## Examples of toolbar

### Variants

Visual variants adapt the style of the bar to different UI contexts.

- **filled** (default): surface background (`--kit-color-surface-1`), or the `color` with a contrasted text.
- **tonal**: light tint of the color, text in the color.
- **outline**: transparent background with a border.
- **surface**: very light tint of the color with a soft border.
- **text**: transparent background, text in the color.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text'` = `'filled'`
- **color**: `string | false | { base?, active? }` = `undefined`

<LazyRepl title="toolbar.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### density

`density` adjusts the height and the padding of the bar, from `-4px` (`dense`) to `+4px` (`spacious`). Useful for optimizing the interface according to available space.

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="toolbar.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### orientation

The toolbar can be displayed horizontally (default) or vertically. This example illustrates the use of the orientation="vertical" option to stack elements from top to bottom.

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

<LazyRepl title="toolbar.svelte" lang="svelte" content={orientationCode}>
<Orientation/>
</LazyRepl>

### location

Set `location` to `'top'` or `'bottom'` to pin the toolbar to the viewport edge (`position: fixed`). This is intended for app-level toolbars like a top navigation bar or a bottom action bar.

- **location**: `'top' | 'bottom' | undefined` = `undefined`

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Toolbar } from 'lapikit/components';"} />

## API Reference

**`kit:toolbar`**

| props         | type                                                               | description                                              | default        |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------------- | -------------- |
| ref $bindable | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.          | `null`         |
| is            | `'div' \| 'header' \| 'nav'`                                       | HTML element to render.                                  | `'div'`        |
| class         | `string \| array \| object`                                        | Classes of the toolbar, with the rules of Svelte (clsx). |                |
| style         | `string`                                                           | Inline style of the toolbar.                             |                |
| s-class       | `string \| array \| object`                                        | Classes of the toolbar, merged with `class`.             |                |
| s-style       | `object`                                                           | Inline style as an object of property / value pairs.     |                |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text'`          | Visual style.                                            | `'filled'`     |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                             | Height, padding, gap and font size (in `rem`).           | `'md'`         |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Height and padding, from `-4px` to `+4px`.               | `'default'`    |
| orientation   | `'horizontal' \| 'vertical'`                                       | Layout direction, also set as `aria-orientation`.        | `'horizontal'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                           | `'md'`         |
| classContent  | `string \| array \| object`                                        | Classes of the inner wrapper (clsx).                     |                |
| color         | `string \| false \| { base?, active? }`                            | Toolbar color, its use depends on the variant.           |                |
| children      | `Snippet`                                                          | Toolbar content.                                         |                |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                       |                |

`kit:toolbar` is the right place to group [Buttons](/docs/components/button), [Chips](/docs/components/chip) and [Icons](/docs/components/icon) in a coherent space.
